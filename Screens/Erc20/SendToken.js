import React from 'react'
import {
    View,
    Animated,
} from 'react-native'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import MyBackground from '../Components/MyBackground'
import SendTx from './Components/SendTx'
import SendConfirm from './Components/SendConfirm'
import Sending from './Components/Sending'
import Receipt from './Components/Receipt'
import Topbar from '../Components/Topbar'
import { openContract } from '../../utils/Tools'
import abi from '../../Contract/Erc20.abi.js'
import { networks } from '../../utils/networks'
import { ethers } from 'ethers'
import { I18n } from '../../i18n'

class SendToken extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            leftAnim: new Animated.Value(0),
            step: 0,
            rollTo: 0,
            begin: 0,
            sendTx:I18n.t('Waiting'),
            receipt:I18n.t('Waiting'),
        }
    }
    componentDidMount = async () => {

        const { accounts, currentAccount } = this.props.WalletReducer
        const fromAddress = accounts[currentAccount].address
        this.props.setTokenFromAddress(fromAddress)
        this._didFocusSubscription = this.props.navigation.addListener('didFocus',
            () => {
                const toAddress = this.props.navigation.getParam('toAddress', this.props.SendReducer.toAddress)
                this.props.setTokenToAddress(toAddress)
            }
        )
        this.props.setTokenFromAddress(fromAddress)
    }
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return
        }
        this._didFocusSubscription.remove()
        this.props.clearTokenSend()
    }

    handleTurnPage = (index) => {
        Animated.timing(this.state.leftAnim, {
            toValue: global.screenWidth * (this.state.step + index) * -1,
            duration: 200
        }).start(() => {
            this.setState({ step: this.state.step + index })
            if(this.state.step === 2){
                this.handleSendTransaction()
            }
        })
    }

    handleRollUp = (rollTo) => {
        this.setState({ rollTo: rollTo })
    }
    handleSendTransaction = () => {
        const { networkId, currentAccount, mnemonic } = this.props.WalletReducer
        const { tokenTx, amount, toAddress } = this.props.TokenReducer

        const contract = openContract(networks[networkId].name, mnemonic, currentAccount, tokenTx.result[0].contractAddress, abi)
        if (amount > 0) {
            contract.transfer(toAddress, ethers.utils.parseEther(amount)).then((tx) => {
                this.props.setTokenTransferTx(tx)
                this.setState({ sendTx: I18n.t('Success'), receipt: I18n.t('Confirmation') })
                tx.wait().then((receipt) => {
                    this.props.setTokenReceipt(receipt)
                    this.setState({ receipt: I18n.t('Success') })
                    this.handleTurnPage(1)
                })
            }).catch((err) => {
                console.log('Token transfer error:', err)
            })
        }
    }
    render() {
        const { navigate } = this.props.navigation
        const { tokenTx } = this.props.TokenReducer
        return (
            <MyBackground>
                <Topbar
                    onPress={() => { navigate('Token', { contractAddress: tokenTx.result[0].contractAddress }) }}
                    titleTxt={this.props.TokenReducer.tokenTx.result[0].tokenName}
                />
                <View style={{ flexDirection: 'column', marginTop: 45, paddingTop: 20 }}>
                    <Animated.View style={{
                        marginLeft: this.state.leftAnim,
                        flexDirection: 'row',
                    }}>
                        <SendTx
                            navigate={navigate}
                            handleTurnPage={this.handleTurnPage}
                            handleRollUp={this.handleRollUp}
                            shake={this.shake}
                        />
                        <SendConfirm
                            handleTurnPage={this.handleTurnPage}
                        />
                        <Sending
                            handleTurnPage={this.handleTurnPage}
                            sendTx={this.state.sendTx}
                            receipt={this.state.receipt}
                        />
                        <Receipt
                            navigation={this.props.navigation}
                        />
                    </Animated.View>
                </View>
            </MyBackground>
        )
    }
}
const mapStateToProps = state => (state)

const mapDispatchToProps = dispatch => ({
    setTokenFromAddress: (value) => dispatch(actions.setTokenFromAddress(value)),
    setTokenToAddress: (value) => dispatch(actions.setTokenToAddress(value)),
    setTokenTransferTx: (value) => dispatch(actions.setTokenTransferTx(value)),
    setTokenReceipt: (value) => dispatch(actions.setTokenReceipt(value)),
    clearTokenSend: () => dispatch(actions.clearTokenSend()),
})
export default connect(mapStateToProps, mapDispatchToProps)(SendToken)