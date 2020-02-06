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
            networkId: 0,
            currentAccount: 0,
            isModalVisible: false,
            accounts: [{
                address: '',
            }],
            showLoading: 'flex'
        }
    }
    componentDidMount() {
        global.storage.load({
            key: 'wallet',
        }).then(ret => {
            let encrypt = ret.encrypt
            let accounts = ret.accounts
            let networkId = ret.networkId || 0
            let currentAccount = ret.currentAccount || 0
            if (currentAccount > accounts.length - 1) {
                currentAccount = 0
            }
            this.setState({
                accounts: accounts,
                currentAccount: currentAccount,
                networkId: networkId,
                encrypt: encrypt
            })
            this.props.getAccounts(accounts, currentAccount)
        }).catch(err => {
            this.props.navigation.navigate('LoginNav')
        })
    }
    selectNetwork = (id) => {
        if (id === this.state.networkId) {
            this.setState({ isModalVisible: false })
        } else {
            global.storage.load({
                key: 'wallet',
            }).then(ret => {
                let encrypt = ret.encrypt
                let accounts = ret.accounts
                let currentAccount = ret.currentAccount
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
            }).catch(err => {
                this.props.navigation.navigate('LoginNav')
            })
        }
    }
    selectAccount = (accounts, currentAccount) => {
        global.storage.load({
            key: 'wallet',
        }).then(ret => {
            let encrypt = ret.encrypt
            let networkId = ret.networkId
            global.storage.save({
                key: 'wallet',
                data: {
                    'encrypt': encrypt,
                    'accounts': accounts.length > ret.accounts.length ? accounts : ret.accounts,
                    'currentAccount': currentAccount || 0,
                    'networkId': networkId
                },
                expires: null,
            })
            this.setState({ accounts: accounts, currentAccount: currentAccount, showLoading: 'flex' })
        }).catch(err => {
            this.props.navigation.navigate('LoginNav')
        })
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