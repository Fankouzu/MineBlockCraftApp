import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Drawer from 'react-native-drawer'
import AccountDrawer from './Components/AccountDrawer'
import PasswordModal from '../Components/PasswordModal'
import MyBackground from '../Components/MyBackground'
import Copyright from '../Components/Copyright'
import TopBar from './Components/TopBar'
import AppView from './Components/AppView'
import NetworkModal from './Components/NetworkModal'
import { mnemonicToAddress } from '../../utils/Tools'

class MainScreen extends Component {
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
    selectAccount = (accounts, currentAccount) => {
        this._drawer.close()
        this.props.selectAccount(accounts, currentAccount, false)
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
    selectNetwork = (id) => {
        if (id === this.props.WalletReducer.networkId) {
            this.props.setNetworkModalVisiable(false)
        } else {
            this.props.setNetworkId(id)
            this.props.setNetworkModalVisiable(false)
        }
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
        const { accounts, mnemonic } = this.props.WalletReducer
        let address = mnemonicToAddress(mnemonic, accounts.length)
        accounts[accounts.length] = {
            address: address
        }
        let currentAccount = accounts.length - 1
        this.selectAccount(accounts, currentAccount)
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
                <MyBackground style={{ alignItems: 'center' }}>
                    <TopBar
                        navigation={this.props.navigation}
                        openControlPanel={this.openControlPanel}
                    />
                    <AppView
                        navigation={this.props.navigation}
                    />
                    <Copyright />
                </MyBackground>
                <PasswordModal
                    passwordAction={this.passwordAction}
                    passworModaldAction={this.state.passworModaldAction}
                    openSend={this.openSend}
                    setVisiable={this.props.setPasswordModalVisiable}
                    isVisible={this.props.WalletMain.isPasswordModalVisible}
                />
                <NetworkModal
                    handleOpenNetSelect={this.handleOpenNetSelect}
                    isModalVisible={this.state.isModalVisible}
                    selectNetwork={this.selectNetwork}
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
    setNetworkId: (value) => dispatch(actions.setNetworkId(value)),
    setNetworkModalVisiable: (value) => dispatch(actions.setNetworkModalVisiable(value)),
})
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)