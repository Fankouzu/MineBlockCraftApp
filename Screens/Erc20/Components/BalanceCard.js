import React from 'react'
import * as actions from '../../../actions'
import { connect } from 'react-redux'
import { Text, StyleSheet, View } from 'react-native'
import CardBottom from './CardBottom'
import MyCard from '../../Components/MyCard'
import { networks } from '../../../utils/networks'
import Jazzicon from '@novaviva/react-native-jazzicon'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { I18n } from '../../../i18n'

const styles = StyleSheet.create({
    cardTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 15,
        marginRight: 15,
    },
    listItem: {
        height: 35,
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
    },
    listLeft: {
        flexDirection: 'row',
    },
    jazzIcon: {
        width: 20,
        justifyContent: 'center',
        marginRight: 10,
    },
    balance: {
        fontSize: 14,
        textAlignVertical: 'center',
    },
    cardTopRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    balanceAccount: {
        color: '#333',
        fontSize: 14,
        fontFamily: 'BigYoungMediumGB2.0',
        marginLeft: 2,
    },
})
function BalanceCard(props) {

    const { accounts, currentAccount, networkId } = props.WalletReducer
    const { tokenTx } = props.TokenReducer

    // const [tokenTx, setTokenTx] = React.useState({ error: -2 })

    // React.useEffect(() => {
    //     setTokenTx(props.tokenTx)
    // }, [props.tokenTx])

    return (
        tokenTx.error === 1 && (<MyCard
            screenWidth={global.screenWidth}
            margin={0.05}
            top={0}
            style={{ paddingBottom: 0, paddingHorizontal: 0 }}
        >
            <View style={styles.listItem}>
                <View style={styles.listLeft}>
                    <View style={styles.jazzIcon}>
                        <Jazzicon size={20} address={tokenTx.result[0].contractAddress || '0x0'} />
                    </View>
                    <Text style={styles.balance}>{tokenTx.balance} {tokenTx.result[0].tokenSymbol}</Text>
                </View>
                <View style={styles.cardTopRight}>
                    <Icon name="circle" size={10} color={networks[networkId].color} />
                    <Text style={styles.balanceAccount}>{I18n.t('Address')}{currentAccount + 1}</Text>
                </View>
            </View>
            <CardBottom
                navigation={props.navigation}
                balance={tokenTx.balance}
                tokenTx={tokenTx}
                networkName={networks[networkId].name}
                fromAddress={accounts[currentAccount].address}
            />
        </MyCard>)
    )
}

const mapStateToProps = state => (state)

const mapDispatchToProps = dispatch => ({
    setShowBalanceLoading: (value) => dispatch(actions.setShowBalanceLoading(value)),
})
export default connect(mapStateToProps, mapDispatchToProps)(BalanceCard)

