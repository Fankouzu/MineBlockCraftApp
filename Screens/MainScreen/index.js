import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Drawer from 'react-native-drawer'
import PasswordModal from '../Components/PasswordModal'
import MyBackground from '../Components/MyBackground'
import AccountDrawer from './Components/AccountDrawer'
import TopBar from './Components/TopBar'
import AppView from './Components/AppView'
import NetworkModal from './Components/NetworkModal'
import ProfileModal from './Components/ProfileModal'
import { mnemonicToAddress,initContract } from '../../utils/Tools'
import ContractAddress from '../../Contract/address.js'
import { networks } from '../../utils/networks'
import abi from '../../Contract/MineBlockCraftUser.abi.js'

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
            global.storage.save({
                key: 'wallet',
                data: {
                    'encrypt': this.props.WalletReducer.encrypt,
                    'accounts': this.props.WalletReducer.accounts,
                    'currentAccount': this.props.WalletReducer.currentAccount,
                    'networkId': id
                },
                expires: null,
            })
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

    OpenProfile = async () => {
        const {networkId} = this.props.WalletReducer
        const UserContractAddress = ContractAddress.MineBlockCraftUser[networkId].address
        if(UserContractAddress !== ""){
            this.props.setProfileModalVisiable(true)
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
                        OpenProfile={this.OpenProfile}
                    />
                    <AppView
                        navigation={this.props.navigation}
                    />
                </MyBackground>
                <PasswordModal
                    passwordAction={this.passwordAction}
                    passworModaldAction={this.state.passworModaldAction}
                    openSend={this.openSend}
                    setVisiable={this.props.setPasswordModalVisiable}
                    isVisible={this.props.WalletMain.isPasswordModalVisible}
                />
                <ProfileModal
                    navigation={this.props.navigation}
                    openSend={this.openSend}
                    setVisiable={this.props.setProfileModalVisiable}
                    isVisible={this.props.WalletMain.isProfileModalVisible}
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
    setProfileModalVisiable: (value) => dispatch(actions.setProfileModalVisiable(value)),
    selectAccount: (accounts, currentAccount, isPasswordModalVisible) => dispatch(actions.selectAccount(accounts, currentAccount, isPasswordModalVisible)),
    setNetworkId: (value) => dispatch(actions.setNetworkId(value)),
    setNetworkModalVisiable: (value) => dispatch(actions.setNetworkModalVisiable(value)),
})
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)