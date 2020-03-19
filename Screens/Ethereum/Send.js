import React from 'react'
import {
    View,
    Animated,
} from 'react-native'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import MyTicket from './Components/MyTicket'
import MyBackButton from '../Components/MyBackButton'
import MyBackground from '../Components/MyBackground'
import SendTx from './Components/SendTx'
import SendConfirm from './Components/SendConfirm'
import Sending from './Components/Sending'
import Receipt from './Components/Receipt'
import { ethprice } from '../../utils/Tools'
import { aesDecrypt, sha1 } from '../../utils/Aes'

class Send extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            shakeLeft: new Animated.Value(global.screenWidth * 0.025),
            step: 0,
            rollTo: 0,
            begin: 0
        }
    }
    componentDidMount = async () => {

        const { accounts, currentAccount, encrypt } = this.props.WalletReducer
        const fromAddress = accounts[currentAccount].address

        this._didFocusSubscription = this.props.navigation.addListener('didFocus',
            () => {
                const toAddress = this.props.navigation.getParam('toAddress', this.props.SendReducer.toAddress)
                this.props.setToAddress(toAddress)
            }
        )
        this.props.setFromAddress(fromAddress)

        global.storage.load({ key: 'status' })
            .then(ret => {
                const { password, setGesture, gesturePassword } = ret
                let orignPassword = setGesture && password && gesturePassword ?
                    aesDecrypt(password, gesturePassword) : password

                let mnemonic = aesDecrypt(encrypt, sha1(orignPassword + 'salt'))
                this.props.setMnemonic(mnemonic)
            }).catch(err => {
                this.props.navigation.navigate('WelcomeNav', { page: 1 })
            })

        ethprice().then((res) => {
            this.props.setEthPrice(res.result.ethusd)
            this.setState({ begin: 1 })
        })
    }
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return
        }
        this._didFocusSubscription.remove()
        this.props.clearSend()
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
        ]).start()
    }

    handleTurnPage = (step) => {
        this.setState({ begin: this.state.begin + 1, step: this.state.step + step })
    }

    handleRollUp = (rollTo) => {
        this.setState({ rollTo: rollTo })
    }
    render() {
        const { navigate } = this.props.navigation
        return (
            <MyBackground>
                <View style={{ flexDirection: 'column' }}>
                    <MyBackButton
                        onPress={() => { navigate('Ethereum') }}
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
                            begin={this.state.begin}
                        >
                            {this.state.step === 0 ? (
                                <SendTx
                                    navigate={navigate}
                                    handleTurnPage={this.handleTurnPage}
                                    handleRollUp={this.handleRollUp}
                                    shake={this.shake}
                                />
                            ) : this.state.step === 1 ? (
                                <SendConfirm
                                    handleTurnPage={this.handleTurnPage}
                                />
                            ) : this.state.step === 2 ? (
                                <Sending
                                    handleTurnPage={this.handleTurnPage}
                                />
                            ) : this.state.step === 3 ? (
                                <Receipt
                                    navigation={this.props.navigation}
                                />
                            ) : (
                                                <View />
                                            )}

                        </MyTicket>
                    </Animated.View>
                </View>
            </MyBackground>
        )
    }
}
const mapStateToProps = state => (state)

const mapDispatchToProps = dispatch => ({
    setFromAddress: (value) => dispatch(actions.setFromAddress(value)),
    setEthPrice: (value) => dispatch(actions.setEthPrice(value)),
    setMnemonic: (value) => dispatch(actions.setMnemonic(value)),
    setToAddress: (value) => dispatch(actions.setToAddress(value)),
    setAmount: (value) => dispatch(actions.setAmount(value)),
    clearSend: () => dispatch(actions.clearSend()),
})
export default connect(mapStateToProps, mapDispatchToProps)(Send)