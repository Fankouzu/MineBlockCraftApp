import React, { Component } from 'react'
import Drawer from 'react-native-drawer'
import WalletMain from '../screen/WalletMain'
import AccountDrawer from '../screen/AccountDrawer'
import PasswordModal from '../components/PasswordModal'

export default class WalletFrame extends Component {
    constructor(props) {
        super(props)
        this.state = {
            accounts:[],
            currentAccount: 0,
            isModalVisible:false,
            passworModaldAction:'',
            networkId:0
        }
    }
    closeControlPanel = () => {
        this._drawer.close()
    }
    openControlPanel = () => {
        this._drawer.open()
    }
    getAccounts = (accounts,currentAccount,networkId) => {
        this.setState({accounts:accounts,currentAccount:currentAccount,networkId:networkId})
    }
    selectAccounts = (accounts,currentAccount) => {
        this.setState({accounts:accounts,currentAccount:currentAccount,isModalVisible:false})
        this._drawer.close()
    }
    selectNetwork = (networkId) => {
        this.setState({networkId:networkId})
    }
    showPasswordModal = (passworModaldAction) => {
        this._drawer.close()
        this.setState({isModalVisible:true,passworModaldAction:passworModaldAction})
    }
    cancelModal = () => {
        this.setState({isModalVisible:false})
    }
    openSend = (mnemonic) => {
        this.cancelModal()
        this.props.navigation.navigate('Send',{
            mnemonic:mnemonic,
            account:this.state.currentAccount,
            networkId:this.state.networkId
        })
    }
    render() {
        return (
            <Drawer
                type="displace"
                side="right"
                ref={(ref) => this._drawer = ref}
                initializeOpen={false}
                content={<AccountDrawer 
                        accounts={this.state.accounts} 
                        selectAccounts={this.selectAccounts}
                        showPasswordModal={this.showPasswordModal}
                    />}
                tapToClose={true}
                openDrawerOffset={0.6}
            >
                <WalletMain
                    openControlPanel={this.openControlPanel}
                    getAccounts={this.getAccounts}
                    selectAccounts={this.selectAccounts}
                    selectNetwork={this.selectNetwork}
                    navigation={this.props.navigation}
                    currentAccount={this.state.currentAccount}
                    accounts={this.state.accounts}
                    navigation={this.props.navigation}
                    showPasswordModal={this.showPasswordModal}
                />
                <PasswordModal
                    selectAccounts={this.selectAccounts}
                    isModalVisible={this.state.isModalVisible}
                    passworModaldAction={this.state.passworModaldAction}
                    cancelModal={this.cancelModal}
                    openSend={this.openSend}
                />
            </Drawer>
        )
    }
}
