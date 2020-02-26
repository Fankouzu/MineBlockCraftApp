import React, { Component } from 'react'
import {connect} from 'react-redux'
import * as actions from '../actions'
import Drawer from 'react-native-drawer'
import WalletMain from '../screen/WalletMain'
import AccountDrawer from '../screen/AccountDrawer'
import PasswordModal from '../components/PasswordModal'
import { mnemonicToAddress } from '../utils/Tools'

class WalletFrame extends Component {
    constructor(props) {
        super(props)
        this.state = {
            passworModaldAction: '',
        }
    }

    closeControlPanel = () => {
        this._drawer.close()
    }
    openControlPanel = () => {
        this._drawer.open()
    }
    selectAccount = (accounts,currentAccount) => {
        this._drawer.close()
        this.props.selectAccount(accounts,currentAccount,false)
        global.storage.save({
            key: 'wallet',
            data: {
                'encrypt': this.props.WalletReducer.encrypt,
                'accounts': accounts,
                'currentAccount': currentAccount,
                'networkId': this.props.WalletReducer.networkId
            },
            expires: null, 
        })
    }
    showPasswordModal = (passworModaldAction) => {
        this._drawer.close()
        this.props.setPasswordModalVisiable(true)
        this.setState({ passworModaldAction: passworModaldAction })
    }
    openSend = (mnemonic) => {
        this.props.setPasswordModalVisiable(false)
        this.props.navigation.navigate('Send')
    }
    newAccount = () => {
        const { accounts , mnemonic } = this.props.WalletReducer
        let address = mnemonicToAddress(mnemonic, accounts.length)
        accounts[accounts.length] = {
            address: address
        }
        let currentAccount = accounts.length - 1
        this.selectAccount(accounts,currentAccount)
    }
    passwordAction = () => {
        if (this.state.passworModaldAction === 'newAccount') {
            this.newAccount()
        }
        if (this.state.passworModaldAction === 'send') {
            this.openSend()
        }
    }
    render() {
        return (
            <Drawer
                type="displace"
                side="right"
                ref={(ref) => this._drawer = ref}
                initializeOpen={false}
                content={<AccountDrawer
                    selectAccount={this.selectAccount}
                    showPasswordModal={this.showPasswordModal}
                />}
                tapToClose={true}
                openDrawerOffset={0.6}
            >
                <WalletMain
                    openControlPanel={this.openControlPanel}
                    navigation={this.props.navigation}
                    showPasswordModal={this.showPasswordModal}
                />
                <PasswordModal
                    passwordAction={this.passwordAction}
                    passworModaldAction={this.state.passworModaldAction}
                    openSend={this.openSend}
                />
            </Drawer>
        )
    } 
}

const mapStateToProps = state => (state)

const mapDispatchToProps = dispatch => ({
    setAccounts: (value) => dispatch(actions.setAccounts(value)),
    setCurrentAccount: (value) => dispatch(actions.setCurrentAccount(value)),
    setPasswordModalVisiable: (value) => dispatch(actions.setPasswordModalVisiable(value)),
    selectAccount: (accounts, currentAccount, isPasswordModalVisible) => dispatch(actions.selectAccount(accounts, currentAccount, isPasswordModalVisible)),
})
export default connect(mapStateToProps,mapDispatchToProps)(WalletFrame)