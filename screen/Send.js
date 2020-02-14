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
import { ethprice } from '../utils/Tools'
import isEthereumAddress from 'is-ethereum-address'

const styles = StyleSheet.create({

})
export default class Send extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            shakeLeft: new Animated.Value(global.screenWidth * 0.025),
            borderColor: '#999',
            toAddress: this.props.navigation.getParam('toAddress', ''),
            fromAddress:this.props.navigation.getParam('fromAddress', ''),
            amount: '',
            balance: this.props.navigation.getParam('balance', 0),
            addressError: '',
            myGasprice: 0,
            ethprice: 0,
            step: 0
        }
    }
    componentDidMount() {
        this._didFocusSubscription = this.props.navigation.addListener('didFocus',
            () => {
                const balance = this.props.navigation.getParam('balance', this.state.balance)
                const toAddress = this.props.navigation.getParam('toAddress', this.state.toAddress)
                const fromAddress = this.props.navigation.getParam('fromAddress', this.state.fromAddress)
                this.setState({ balance: balance, toAddress: toAddress, fromAddress: fromAddress })
            }
        )
        ethprice().then((res) => {
            this.setState({ ethprice: res.result.ethusd })
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
                    buttonDisable: false, addressError: ''
                })
            }, 1000)
        })
    }

    handleSubmit = () => {
        // this.setState({ buttonDisable: true })
        // let toAddress = this.state.toAddress
        // const addressErrorTxt = '以太坊地址错误！'
        // if (toAddress === '' || !isEthereumAddress(toAddress)) {
        //     this.shake()
        //     this.setState({ buttonDisable: false, addressError: addressErrorTxt })
        // } else {
            this.setState({
                buttonDisable: false,
                addressError: '',
                amount: this.state.amount === '' ? 0 : this.state.amount,
                step: 1
            })

        // }
    }
    handleSetGasprice = (myGasprice) => {
        this.setState({ myGasprice: myGasprice })
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
                        >
                            {this.state.step === 0 ? (
                                <SendTx
                                    toAddress={this.state.toAddress}
                                    addressError={this.state.addressError}
                                    amount={this.state.amount}
                                    balance={this.state.balance}
                                    ethprice={this.state.ethprice}
                                    navigate={navigate}
                                    handleSetGasprice={this.handleSetGasprice}
                                    disabled={this.state.buttonDisable}
                                    handleSubmit={this.handleSubmit}
                                    step={this.state.s}
                                />
                            ) : this.state.step === 1 ? (
                                <SendConfirm
                                    fromAddress={this.state.fromAddress}
                                    toAddress={this.state.toAddress}
                                    addressError={this.state.addressError}
                                    amount={this.state.amount}
                                    balance={this.state.balance}
                                    ethprice={this.state.ethprice}
                                    navigate={navigate}
                                    handleSetGasprice={this.handleSetGasprice}
                                    disabled={this.state.buttonDisable}
                                    handleSubmit={this.handleSubmit}
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