import React from 'react'
import {
    StyleSheet,
    View,
    Animated,
    Text
} from 'react-native'
import MyTicket from '../components/MyTicket'
import MyBackButton from '../components/MyBackButton'
import MyBackground from '../components/MyBackground'
import SendTx from '../components/SendTx'
import SendConfirm from '../components/SendConfirm'
import Sending from '../components/Sending'
import { ethprice,getBalance } from '../utils/Tools'
import { networks } from '../utils/networks'
import isEthereumAddress from 'is-ethereum-address'

const styles = StyleSheet.create({

})
export default class Send extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            shakeLeft: new Animated.Value(global.screenWidth * 0.025),
            borderColor: '#999',
            toAddress: '',
            account: this.props.navigation.getParam('account'),
            fromAddress:'',
            networkId: this.props.navigation.getParam('networkId'),
            mnemonic: this.props.navigation.getParam('mnemonic'),
            amount: '',
            balance: 0,
            addressError: false,
            amountError: false,
            myGasprice: 0,
            initGasLimit:21000,
            gasLimit:21000,
            ethprice: 0,
            step: 0,
            rollTo: 0,
            note: ''
        }
    }
    componentDidMount = async () => {
        this._didFocusSubscription = this.props.navigation.addListener('didFocus',
            () => {
                const toAddress = this.props.navigation.getParam('toAddress', this.state.toAddress)
                this.setState({ toAddress: toAddress })
            }
        )
        ethprice().then((res) => {
            this.setState({ ethprice: res.result.ethusd })
        })
        let accounts = global.wallet.accounts
        let fromAddress = accounts[this.state.account].address
        
        this.setState({fromAddress:fromAddress})
        getBalance(fromAddress, networks[this.state.networkId].nameEN).then((balance) => {
            this.setState({balance:balance})
        })
    }
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return
        }
        this._didFocusSubscription.remove()
    }
    shake = () => {
        var duration = 100
        Animated.sequence([
            Animated.timing(this.state.shakeLeft, {
                toValue: global.screenWidth * 0.08,
                duration: duration
            }),
            Animated.timing(this.state.shakeLeft, {
                toValue: 0,
                duration: duration
            }),
            Animated.timing(this.state.shakeLeft, {
                toValue: global.screenWidth * 0.07,
                duration: duration
            }),
            Animated.timing(this.state.shakeLeft, {
                toValue: global.screenWidth * 0.025,
                duration: duration
            })
        ]).start(() => {
            setTimeout(() => {
                this.setState({
                    addressError: false,
                    amountError: false
                })
            }, 1000)
        })
    }

    handleNext = () => {
        this.setState({ buttonDisable: true })
        let toAddress = this.state.toAddress
        let balance = parseFloat(this.state.balance)
        let amount = parseFloat(this.state.amount)
        let myGas = this.state.myGasprice * 1000000000 * 21000 / 1000000000000000000
        if (toAddress === '' || !isEthereumAddress(toAddress)) {
            this.setState({ addressError: true })
            this.shake()
        } else if (amount + myGas > balance) {
            this.setState({ amountError: true })
            this.shake()
        } else {
            this.setState({
                buttonDisable: false,
                addressError: '',
                amount: this.state.amount === '' ? 0 : this.state.amount,
                step: 1
            })
        }
    }
    handleConfirm = () => {
        this.setState({
            buttonDisable: false,
            addressError: '',
            amount: this.state.amount === '' ? 0 : this.state.amount,
            step: 2
        })
    }
    setToAddress = (address) => {
        this.setState({ toAddress: address })
    }
    handleback = () => {
        this.setState({
            step: this.state.step - 1
        })
    }
    handleSetGasprice = (myGasprice) => {
        this.setState({ myGasprice: myGasprice })
    }
    handleSetGasLimit = (gasLimit) => {
        this.setState({ gasLimit: gasLimit })
    }
    handleSetAmount = (amount) => {
        this.setState({ amount: amount })
    }
    handleRollUp = (rollTo) => {
        this.setState({ rollTo: rollTo })
    }
    handleTypeNote = (note) => {
        this.setState({ note: note })
    }
    render() {
        const { navigate } = this.props.navigation
        return (
            <MyBackground>
                <View style={{ flexDirection: 'column' }}>
                    <MyBackButton
                        onPress={() => { navigate('WalletFrame') }}
                    />
                    <Animated.View style={{
                        marginLeft: this.state.shakeLeft,
                    }}>
                        <MyTicket
                            screenWidth={global.screenWidth * 0.95}
                            margin={0}
                            top={0}
                            padding={10}
                            height={550}
                            step={this.state.step}
                            rollTo={this.state.rollTo}
                        >
                            {this.state.step === 0 ? (
                                <SendTx
                                    toAddress={this.state.toAddress}
                                    addressError={this.state.addressError}
                                    amountError={this.state.amountError}
                                    amount={this.state.amount}
                                    balance={this.state.balance}
                                    ethprice={this.state.ethprice}
                                    navigate={navigate}
                                    handleSetGasprice={this.handleSetGasprice}
                                    handleSetGasLimit={this.handleSetGasLimit}
                                    initGasLimit={this.state.initGasLimit}
                                    disabled={this.state.buttonDisable}
                                    handleNext={this.handleNext}
                                    step={this.state.step}
                                    gasLimit={this.state.gasLimit}
                                    setToAddress={this.setToAddress}
                                    myGasprice={this.state.myGasprice}
                                    handleSetAmount={this.handleSetAmount}
                                    handleRollUp={this.handleRollUp}
                                    handleTypeNote={this.handleTypeNote}
                                    note={this.state.note}
                                />
                            ) : this.state.step === 1 ? (
                                <SendConfirm
                                    ethprice={this.state.ethprice}
                                    fromAddress={this.state.fromAddress}
                                    toAddress={this.state.toAddress}
                                    amount={this.state.amount}
                                    ethprice={this.state.ethprice}
                                    myGasprice={this.state.myGasprice}
                                    note={this.state.note}
                                    handleback={this.handleback}
                                    handleConfirm={this.handleConfirm}
                                    gasLimit={this.state.gasLimit}
                                />
                            ) : this.state.step === 2 ? (
                                <Sending
                                    fromAddress={this.state.fromAddress}
                                    toAddress={this.state.toAddress}
                                    amount={this.state.amount}
                                    myGasprice={this.state.myGasprice}
                                    note={this.state.note}
                                    mnemonic={this.state.mnemonic}
                                    networkId={this.state.networkId}
                                    account={this.state.account}
                                    gasLimit={this.state.gasLimit}
                                />
                            ) : (
                                            <View>
                                                <Text>1111</Text>
                                            </View>
                                        )}

                        </MyTicket>
                    </Animated.View>
                </View>
            </MyBackground>
        )
    }
}