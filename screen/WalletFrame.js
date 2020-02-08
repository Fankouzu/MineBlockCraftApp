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
            isModalVisible:false
        }
    }
    closeControlPanel = () => {
        this._drawer.close()
    }
    openControlPanel = () => {
        this._drawer.open()
    }
    getAccounts = (accounts,currentAccount) => {
        this.setState({accounts:accounts,currentAccount:currentAccount})
    }
    selectAccounts = (accounts,currentAccount) => {
        this.setState({accounts:accounts,currentAccount:currentAccount,isModalVisible:false})
        this._drawer.close()
    }
    addAccounts = () => {
        this._drawer.close()
        this.setState({isModalVisible:true})
    }
    cancelModal = () => {
        this.setState({isModalVisible:false})
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
                        addAccounts={this.addAccounts}
                    />}
                tapToClose={true}
                openDrawerOffset={0.6}
            >
                <WalletMain
                    openControlPanel={this.openControlPanel}
                    getAccounts={this.getAccounts}
                    selectAccounts={this.selectAccounts}
                    navigation={this.props.navigation}
                    currentAccount={this.state.currentAccount}
                    accounts={this.state.accounts}
                    navigation={this.props.navigation}
                />
                <PasswordModal
                    selectAccounts={this.selectAccounts}
                    isModalVisible={this.state.isModalVisible}
                    cancelModal={this.cancelModal}
                />
            </Drawer>
        )
    }
}
