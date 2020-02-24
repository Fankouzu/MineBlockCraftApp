import React from 'react'
import * as actions from '../actions'
import {connect} from 'react-redux'
import { Text, StyleSheet, View, Clipboard } from 'react-native'
import CardBottom from '../components/CardBottom'
import * as Progress from 'react-native-progress'
import MyCard from '../components/MyCard'
import { networks } from '../utils/networks'
import { getBalance } from '../utils/Tools'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ripple from 'react-native-material-ripple'

const styles = StyleSheet.create({
    cardTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 15,
        marginRight: 15
    },
    balanceTitle: {
        color: '#333',
        fontSize: 16,
        fontFamily: 'BigYoungMediumGB2.0',
        lineHeight: 30
    },
    cardTopRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    balanceAccount: {
        color: '#333',
        fontSize: 14,
        fontFamily: 'BigYoungMediumGB2.0',
        lineHeight: 20,
        marginLeft: 2
    },
    balanceNumber: {
        color: '#333',
        fontSize: 30,
        lineHeight: 40,
        marginLeft: 15,
        marginRight: 15
    },
    balanceAddress: {
        color: '#333',
        fontSize: 12,
        lineHeight: 30,
        fontWeight: 'bold',
        marginLeft: 15,
        marginRight: 15
    }
})
function BalanceCard(props) {

    console.disableYellowBox = true

    const [balance, setBalance] = React.useState(0)

    React.useEffect(() => {
        balanceLoading()
    }, [props.WalletReducer.accounts,props.WalletReducer.currentAccount, props.WalletReducer.networkId])

    const balanceLoading = () => {
        if (props.WalletReducer.accounts[props.WalletReducer.currentAccount].address !== '0x0') {
            getBalance(props.WalletReducer.accounts[props.WalletReducer.currentAccount].address, networks[props.WalletReducer.networkId].nameEN).then((balance) => {
                setBalance(balance > 0 ? Math.round(balance * 10000000) / 10000000 : 0)
                props.setShowBalanceLoading('none')
                //setShowLoading('none')
            })
        }
    }

    return (
        <MyCard
            screenWidth={global.screenWidth * 0.9}
            margin={0}
            top={40}
            style={{ paddingBottom: 0, paddingLeft: 0, paddingRight: 0 }}
        >
            <View style={styles.cardTop}>
                <Text style={styles.balanceTitle}>当前余额(Ether)：</Text>
                <View style={styles.cardTopRight}>
                    <Icon name="circle" size={10} color={networks[props.WalletReducer.networkId].color} />
                    <Text style={styles.balanceAccount}>账户{props.WalletReducer.currentAccount + 1}</Text>
                </View>
            </View>
            <Text style={styles.balanceNumber}>
                {balance}
            </Text>
            <Progress.Bar
                indeterminate
                unfilledColor='#ddd'
                color='#2196F3'
                width={global.screenWidth * 0.9 - 2}
                height={1}
                borderRadius={0}
                borderWidth={0}
                style={{ display: props.WalletMain.isShowBalanceLoading }}
            />
            <Ripple
                rippleColor='#ccc'
                rippleOpacity={0.6}
                onPress={() => {
                    Clipboard.setString(props.WalletReducer.accounts[props.WalletReducer.currentAccount].address)
                }}
            >
                <Text style={styles.balanceAddress}>{props.WalletReducer.accounts[props.WalletReducer.currentAccount].address}</Text>
            </Ripple>
            <CardBottom
                navigation={props.navigation}
                balance={balance}
                networkName={networks[props.WalletReducer.networkId].nameEN}
                fromAddress={props.WalletReducer.accounts[props.WalletReducer.currentAccount].address}
                showPasswordModal={props.showPasswordModal}
            />
        </MyCard>
    )
}

const mapStateToProps = state => (state)

const mapDispatchToProps = dispatch => ({
    setShowBalanceLoading: (value) => dispatch(actions.setShowBalanceLoading(value)),
})
export default connect(mapStateToProps,mapDispatchToProps)(BalanceCard)

