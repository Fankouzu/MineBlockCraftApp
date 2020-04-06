import React from 'react'
import * as actions from '../../../actions'
import { connect } from 'react-redux'
import { Text, StyleSheet, View } from 'react-native'
import Jazzicon from '@novaviva/react-native-jazzicon'
import MyCard from '../../Components/MyCard'
import { I18n } from '../../../i18n'
var moment = require('moment')

const styles = StyleSheet.create({
    listItem: {
        borderTopWidth: 0.5,
        borderTopColor: '#ccc',
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    title: {
        color: '#666',
        marginLeft: 5,
        height: 30,
        textAlignVertical: 'center',
    },
    topLineText: {
        fontSize: 8,
        color: '#666',
    },
    Line: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: 5,
        justifyContent: 'space-between',
    },
    jazzIcon: {
        width: 30,
        justifyContent: 'center',
        marginRight: 10,
    },
    TypeView: {

    },
    Type: {
        fontSize: 12,
        lineHeight:30,
        color: '#333',
    },
    EthView: {
        justifyContent: 'center',
    },
    Eth: {
        color: '#333',
        fontSize: 18,
    },
    TxEmpty: {
        textAlign: 'center',
        color: '#999',
        fontSize: 16,
    },
})
function TxList(props) {

    const { accounts, currentAccount } = props.WalletReducer
    const { tokenTx } = props.TokenReducer


    // const [tokenTx, setTokenTx] = React.useState({ error: -2 })

    // React.useEffect(() => {
    //     setTokenTx(props.tokenTx)
    // }, [props.tokenTx])

    return (
        <MyCard
            screenWidth={global.screenWidth}
            margin={0.05}
            top={10}
            style={{ paddingBottom: 10, paddingTop: 0, paddingHorizontal: 0, marginBottom: 50 }}
        >
            <View style={[styles.listItem, { borderTopWidth: 0 }]}>
                <Text style={styles.title}>
                    {I18n.t('TxListTitle')}
                </Text>
            </View>
            {tokenTx.error === -2 ?
                (<View style={styles.listItem}>
                    <Text style={styles.TxEmpty}>
                        {I18n.t('TxLoading')}
                    </Text>
                </View>
                ) : tokenTx.error === -1 ?
                    (<View style={styles.listItem}>
                        <Text style={styles.TxEmpty}>
                            {I18n.t('netError')}
                        </Text>
                    </View>
                    ) : tokenTx.error === 0 ?
                    (<View style={styles.listItem}>
                        <Text style={styles.TxEmpty}>
                            {I18n.t('TxEmpty')}
                        </Text>
                    </View>
                    ) : tokenTx.error === 1 ?
                    (tokenTx.result.map((item, index) => {
                        return (
                            <View style={styles.listItem}>
                                <View style={styles.Line}>
                                    <Text style={styles.topLineText}>#{item.nonce}</Text>
                                    <Text style={styles.topLineText}>{moment(parseInt(item.timeStamp) * 1000).format('YYYY-MM-DD HH:mm')}</Text>
                                </View>
                                <View style={styles.Line}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={styles.jazzIcon}>
                                            <Jazzicon size={30} address={
                                                item.from === '0x0000000000000000000000000000000000000000' ?
                                                item.contractAddress :
                                                    item.from === accounts[currentAccount].address ?
                                                    item.to :
                                                    item.from
                                                } />
                                        </View>
                                        <View style={styles.TypeView}>
                                            <Text style={styles.Type}>
                                                { item.from === '0x0000000000000000000000000000000000000000' ?
                                                    I18n.t('Deploy') :
                                                    item.from === accounts[currentAccount].address ?
                                                    I18n.t('SendTokens') :
                                                    I18n.t('TxRecive')
                                                }
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.EthView}>
                                        <Text style={styles.Eth}>
                                            {item.value / Math.pow(10,item.tokenDecimal)}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        )
                    })) : (<View/>)
                    }
        </MyCard>
    )
}

const mapStateToProps = state => (state)

const mapDispatchToProps = dispatch => ({
    setShowBalanceLoading: (value) => dispatch(actions.setShowBalanceLoading(value)),
})
export default connect(mapStateToProps, mapDispatchToProps)(TxList)

