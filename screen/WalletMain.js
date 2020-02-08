import React from 'react'
import Copyright from '../components/Copyright'
import TopBar from '../components/TopBar'
import BalanceCard from '../components/BalanceCard'
import NetworkModal from '../components/NetworkModal'
import MyBackground from '../components/MyBackground'

export default class Open extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            encrypt: '',
            networkId:  0,
            currentAccount:0,
            isModalVisible: false,
            accounts: [{address:'0x0',balance:0}],
            showLoading: 'flex'
        }
    }
    componentDidMount() {
        global.storage.load({
            key: 'wallet',
        }).then(ret => {
            global.wallet = ret
            
            if (global.wallet.currentAccount > global.wallet.accounts.length - 1) {
                global.wallet.currentAccount = 0
            }
            this.setState({
                accounts: global.wallet.accounts,
                currentAccount: global.wallet.currentAccount,
                networkId: global.wallet.networkId || 0,
                encrypt: global.wallet.encrypt
            })
            this.props.getAccounts(global.wallet.accounts, global.wallet.currentAccount)
        }).catch(err => {
            this.props.navigation.navigate('LoginNav')
        })
    }
    selectNetwork = (id) => {
        if (id === this.state.networkId) {
            this.setState({ isModalVisible: false })
        } else {
            let encrypt = global.wallet.encrypt
            let accounts = global.wallet.accounts
            let currentAccount = global.wallet.currentAccount
            global.wallet.id = id
            global.storage.save({
                key: 'wallet',
                data: {
                    'encrypt': encrypt,
                    'accounts': accounts,
                    'currentAccount': currentAccount,
                    'networkId': id
                },
                expires: null,
            })
            this.setState({ networkId: id, isModalVisible: false, showLoading: 'flex' })
        }
    }
    selectAccount = (accounts, currentAccount) => {
        let encrypt = global.wallet.encrypt
        let networkId = global.wallet.networkId || 0
        global.wallet.accounts = accounts.length > global.wallet.accounts.length ? accounts : global.wallet.accounts
        global.wallet.currentAccount = currentAccount
        global.storage.save({
            key: 'wallet',
            data: {
                'encrypt': encrypt,
                'accounts': global.wallet.accounts,
                'currentAccount': currentAccount || 0,
                'networkId': networkId
            },
            expires: null,
        })
        this.setState({ accounts: accounts, currentAccount: currentAccount, showLoading: 'flex' })
    }
    handleOpenNetSelect = (isModalVisible) => {
        this.setState({ isModalVisible: isModalVisible })
    }
    handleHideLoading = () => {
        this.setState({ showLoading: 'none' })
    }
    componentDidUpdate() {
    }
    componentDidUpdate(nextProps, nextState) {
        if (this.props.currentAccount !== this.state.currentAccount) {
            this.selectAccount(this.props.accounts, this.props.currentAccount)
            return true
        } else {
            return false
        }
    }
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return
        }
    }
    render() {
        return (
            <MyBackground style={{ alignItems: 'center' }}>
                <TopBar
                    handleOpenNetSelect={this.handleOpenNetSelect}
                    accounts={this.state.accounts}
                    networkId={this.state.networkId}
                    navigation={this.props.navigation}
                    openControlPanel={this.props.openControlPanel}
                    currentAccount={this.state.currentAccount}
                />
                <BalanceCard
                    accounts={this.state.accounts}
                    currentAccount={this.state.currentAccount}
                    networkId={this.state.networkId}
                    showLoading={this.state.showLoading}
                    handleHideLoading={this.handleHideLoading}
                    navigation={this.props.navigation}
                />
                <Copyright />
                <NetworkModal
                    handleOpenNetSelect={this.handleOpenNetSelect}
                    isModalVisible={this.state.isModalVisible}
                    selectNetwork={this.selectNetwork}
                />
            </MyBackground>
        )
    }
}