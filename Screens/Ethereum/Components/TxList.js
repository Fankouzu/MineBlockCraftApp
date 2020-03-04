import React from 'react'
import * as actions from '../../../actions'
import { connect } from 'react-redux'
import { Text, StyleSheet, View, Clipboard } from 'react-native'
import Jazzicon from '@novaviva/react-native-jazzicon'
import MyCard from '../../Components/MyCard'
import { networks } from '../../../utils/networks'
import { getTxList } from '../../../utils/Tools'
import { I18n } from '../../../i18n'
var moment = require('moment')

const styles = StyleSheet.create({
    listItem: {
        borderTopWidth: 0.5,
        borderTopColor: '#ccc',
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    title: {
        color: '#666',
        marginLeft: 5,
        height: 30,
        textAlignVertical: 'center'
    },
    topLineText: {
        fontSize: 8,
        color: '#666',
    },
    Line: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: 5,
        justifyContent: 'space-between'
    },
    jazzIcon: {
        width: 30,
        justifyContent: 'center',
        marginRight: 10
    },
    TypeView: {

    },
    Type: {
        fontSize: 12,
        color: '#333',
        marginBottom: 5
    },
    Success: {
        fontSize: 8,
        color: '#00c9a7',
        width: 60,
        height: 16,
        backgroundColor: 'rgba(0,201,167,.1)',
        textAlign: 'center',
        textAlignVertical: 'center',
        borderRadius: 3,
        letterSpacing: 2
    },
    Fail: {
        fontSize: 8,
        color: '#de4437',
        width: 60,
        height: 16,
        backgroundColor: 'rgba(222,68,55,.1)',
        textAlign: 'center',
        textAlignVertical: 'center',
        borderRadius: 3,
        letterSpacing: 2
    },
    EthView: {
        justifyContent: 'center'
    },
    Eth: {
        color: '#333',
        fontSize: 18,
    },
    TxEmpty: {
        textAlign: 'center',
        color: '#999',
        fontSize: 16
    }
})
function TxList(props) {

    const { accounts, currentAccount, networkId } = props.WalletReducer

    const [txList, setTxList] = React.useState({ error: -2})

    React.useEffect(() => {
        getTxList(networks[networkId].name, accounts[currentAccount].address).then((txList) => {
            setTxList(txList)
        })
    }, [])

    return (
        <MyCard
            screenWidth={global.screenWidth}
            margin={0.05}
            top={10}
            style={{ paddingBottom: 10, paddingTop: 0, paddingHorizontal: 0, marginBottom: 50, }}
        >
            <View style={[styles.listItem, { borderTopWidth: 0 }]}>
                <Text style={styles.title}>
                    {I18n.t('TxListTitle')}
                </Text>
            </View>
            {txList.error === -2 ?
                (<View style={styles.listItem}>
                    <Text style={styles.TxEmpty}>
                        {I18n.t('TxLoading')}
                    </Text>
                </View>
                ) : txList.error === -1 ?
                    (<View style={styles.listItem}>
                        <Text style={styles.TxEmpty}>
                            {I18n.t('netError')}
                        </Text>
                    </View>
                    ) : txList.error === 0 ?
                    (<View style={styles.listItem}>
                        <Text style={styles.TxEmpty}>
                            {I18n.t('TxEmpty')}
                        </Text>
                    </View>
                    ) : txList.error === 1 ?
                    (txList.result.map((item, index) => {
                        return (
                            <View style={styles.listItem}>
                                <View style={styles.Line}>
                                    <Text style={styles.topLineText}>#{item.nonce}</Text>
                                    <Text style={styles.topLineText}>{moment(parseInt(item.timeStamp) * 1000).format('YYYY-MM-DD HH:mm')}</Text>
                                </View>
                                <View style={styles.Line}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={styles.jazzIcon}>
                                            <Jazzicon size={30} address={item.icon} />
                                        </View>
                                        <View style={styles.TypeView}>
                                            <Text style={styles.Type}>
                                                {I18n.t(item.Type)}
                                            </Text>

                                            {item.txreceipt_status === '1' ?
                                                (
                                                    <Text style={styles.Success}>{I18n.t('TxSuccess')}</Text>
                                                ) : (
                                                    <Text style={styles.Fail}>{I18n.t('TxFail')}</Text>
                                                )}
                                        </View>
                                    </View>
                                    <View style={styles.EthView}>
                                        <Text style={styles.Eth}>
                                            {item.value}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        )
                    })) :(<View/>)
                    }
        </MyCard>
    )
}

const mapStateToProps = state => (state)

const mapDispatchToProps = dispatch => ({
    setShowBalanceLoading: (value) => dispatch(actions.setShowBalanceLoading(value)),
})
export default connect(mapStateToProps, mapDispatchToProps)(TxList)

