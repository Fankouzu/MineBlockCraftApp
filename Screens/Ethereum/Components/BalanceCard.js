import React from 'react'
import * as actions from '../../../actions'
import { connect } from 'react-redux'
import { Text, StyleSheet, View, Clipboard } from 'react-native'
import CardBottom from './CardBottom'
import * as Progress from 'react-native-progress'
import MyCard from '../../Components/MyCard'
import { networks } from '../../../utils/networks'
import { getBalance } from '../../../utils/Tools'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ripple from 'react-native-material-ripple'
import { I18n } from '../../../i18n'

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

    const { accounts, currentAccount, networkId } = props.WalletReducer

    const [balance, setBalance] = React.useState(0)

    React.useEffect(() => {
        if (props.balanceLoad > 0) {
            props.setShowBalanceLoading('flex')
            balanceLoading()
        }
    }, [props.balanceLoad])

    const balanceLoading = () => {
        if (accounts[currentAccount].address !== '0x0') {
            getBalance(accounts[currentAccount].address, networks[networkId].name).then((balance) => {
                setBalance(balance > 0 ? Math.round(balance * 10000000) / 10000000 : 0)
                props.setBalance(balance)
                props.setShowBalanceLoading('none')
                props._onRefreshFinish()
            })
        }
    }

    return (
        <MyCard
            screenWidth={global.screenWidth}
            margin={0.05}
            top={0}
            style={{ paddingBottom: 0, paddingHorizontal: 0 }}
        >
            <View style={styles.cardTop}>
                <Text style={styles.balanceTitle}>{I18n.t('CurrentBalance')}(Ether)：</Text>
                <View style={styles.cardTopRight}>
                    <Icon name="circle" size={10} color={networks[networkId].color} />
                    <Text style={styles.balanceAccount}>{I18n.t('Address')}{currentAccount + 1}</Text>
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
                    Clipboard.setString(accounts[currentAccount].address)
                }}
            >
                <Text style={styles.balanceAddress}>{accounts[currentAccount].address}</Text>
            </Ripple>
            <CardBottom
                navigation={props.navigation}
                balance={balance}
                networkName={networks[networkId].name}
                fromAddress={accounts[currentAccount].address}
            />
        </MyCard>
    )
}

const mapStateToProps = state => (state)

const mapDispatchToProps = dispatch => ({
    setShowBalanceLoading: (value) => dispatch(actions.setShowBalanceLoading(value)),
    setBalance: (value) => dispatch(actions.setBalance(value)),
})
export default connect(mapStateToProps, mapDispatchToProps)(BalanceCard)

