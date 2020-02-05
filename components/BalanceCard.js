import React, { Component } from 'react'
import { Text, StyleSheet, View, ProgressBarAndroid ,ProgressViewIOS} from 'react-native'
import MyCard from '../components/MyCard'
import { networks } from '../utils/networks'
import { getBalance } from '../utils/Tools'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const styles = StyleSheet.create({
    cardTop: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    balanceTitle: {
        color: '#333',
        fontSize: 16,
        fontFamily: 'BigYoungMediumGB2.0',
        lineHeight: 20
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
        lineHeight: 40
    },
    balanceAddress: {
        color: '#333',
        fontSize: 12,
        lineHeight: 20
    }
})
export default class BalanceCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            networkId: 0,
            currentAccount: 0,
            balance: 0,
            accounts: [{
                address: ''
            }],
            showLoading: 'flex'
        }
    }
    componentDidMount() {
        console.disableYellowBox = true
        this.getDate()
    }
    getDate = () => {
        let accounts = this.props.accounts
        let networkId = this.props.networkId
        let currentAccount = this.props.currentAccount
        if (accounts[currentAccount].address !== '') {
            getBalance(accounts[currentAccount].address, networks[networkId].nameEN).then((balance) => {
                accounts[currentAccount].balance = balance
                console.log(accounts, networkId, currentAccount)
                this.setState({
                    accounts: accounts,
                    currentAccount: currentAccount,
                    networkId: networkId,
                    showLoading: 'none'
                })
            })
        }
    }
    componentDidUpdate(nextProps, nextState) {
        if (nextProps.accounts !== this.state.accounts) {
            this.getDate()
            return true
        } else if (this.props.currentAccount !== this.state.currentAccount) {
            this.getDate()
            return true
        } else if (this.props.networkId !== this.state.networkId) {
            this.getDate()
            return true
        }
    }
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return
        }
    }
    render() {
        let balance = this.state.accounts[this.state.currentAccount].balance
        balance = balance > 0 ? Math.round(balance * 10000000) / 10000000 : 0
        return (
            <MyCard
                screenWidth={global.screenWidth * 0.9}
                margin={0}
                top={40}
            >
                <View style={styles.cardTop}>
                    <Text style={styles.balanceTitle}>当前余额(Ether)：</Text>
                    <View style={styles.cardTopRight}>
                        <Icon name="circle" size={10} color={networks[this.state.networkId].color} />
                        <Text style={styles.balanceAccount}>账户{this.state.currentAccount + 1}</Text>
                    </View>
                </View>
                <Text style={styles.balanceNumber}>
                    {balance}
                </Text>
                {global.ios ? (
                    <ProgressViewIOS 
                    trackTintColor="#fff" 
                    progressTintColor="#2196F3"
                    progress={0.5}
                    />
                ) : (
                    <ProgressBarAndroid 
                        animating={true} 
                        styleAttr="Horizontal" 
                        color="#2196F3" 
                        style={{ height: 2 }} 
                    />
                    )}
                
                <Text style={styles.balanceAddress}>{this.state.accounts[this.state.currentAccount].address}</Text>
            </MyCard>
        )
    }
}