import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import CardBottom from '../components/CardBottom'
import * as Progress from 'react-native-progress'
import MyCard from '../components/MyCard'
import { networks } from '../utils/networks'
import { getBalance } from '../utils/Tools'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const styles = StyleSheet.create({
    cardTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft:15,
        marginRight:15
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
        marginLeft:15,
        marginRight:15
    },
    balanceAddress: {
        color: '#333',
        fontSize: 12,
        lineHeight: 30,
        fontWeight: 'bold',
        marginLeft:15,
        marginRight:15
    }
})
export default function BalanceCard(props) {

    const [networkId, setNetworkId] = React.useState(props.networkId)
    React.useEffect(() => {
        setNetworkId(props.networkId)
    }, [props.networkId])

    const [currentAccount, setCurrentAccount] = React.useState(props.currentAccount)
    React.useEffect(() => {
        setCurrentAccount(props.currentAccount)
    }, [props.currentAccount])

    const [accounts, setAccounts] = React.useState(props.accounts)
    React.useEffect(() => {
        setAccounts(props.accounts)
    }, [props.accounts])

    const [showLoading, setShowLoading] = React.useState(props.showLoading)
    React.useEffect(() => {
        setShowLoading(props.showLoading)
    }, [props.showLoading])

    const [balance, setBalance] = React.useState(0)

    console.disableYellowBox = true

    const [currentAddress, setCurrentAddress] = React.useState('0x0')
    React.useEffect(() => {
        if (accounts.length > 0) {
            setCurrentAddress(accounts[currentAccount].address)
        }
    }, [accounts, currentAccount])

    React.useEffect(() => {
        if (currentAddress !== '0x0') {
            getBalance(currentAddress, networks[networkId].nameEN).then((balance) => {
                setBalance(balance > 0 ? Math.round(balance * 10000000) / 10000000 : 0)
                setAccounts(accounts)
                props.handleHideLoading()
            })
        }
    }, [currentAddress, networkId])

    return (
        <MyCard
            screenWidth={global.screenWidth * 0.9}
            margin={0}
            top={40}
            style={{paddingBottom:0,paddingLeft:0,paddingRight:0}}
        >
            <View style={styles.cardTop}>
                <Text style={styles.balanceTitle}>当前余额(Ether)：</Text>
                <View style={styles.cardTopRight}>
                    <Icon name="circle" size={10} color={networks[networkId].color} />
                    <Text style={styles.balanceAccount}>账户{currentAccount + 1}</Text>
                </View>
            </View>
            <Text style={styles.balanceNumber}>
                {balance}
            </Text>
            <Progress.Bar
                indeterminate
                unfilledColor='#ddd'
                color='#2196F3'
                width={global.screenWidth * 0.9 -2}
                height={1}
                borderRadius={0}
                borderWidth={0}
                style={{ display: showLoading }}
            />
            <Text style={styles.balanceAddress}>{currentAddress}</Text>
            <CardBottom
                navigation={props.navigation}
            />
        </MyCard>
    )
}