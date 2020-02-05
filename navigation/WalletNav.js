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
            encrypt:'',
            networkId:0,
            currentAccount:0,
            isModalVisible: false,
            accounts: [{
                address: '',
            }]
        }
    }
    componentDidMount() {
        global.storage.load({
            key: 'wallet',
        }).then(ret => {
            let encrypt = ret.encrypt
            global.storage.load({
                key: 'accounts',
            }).then(ret => {
                let accounts = ret.accounts
                let networkId = ret.networkId || 0
                let currentAccount = ret.currentAccount || 0
                this.setState({ 
                    accounts: accounts,
                    currentAccount: currentAccount,
                    networkId:networkId,
                    encrypt:encrypt
                })
            }).catch(err => {
                this.props.navigation.navigate('LoginNav')
            })
        }).catch(err => {
            this.props.navigation.navigate('LoginNav')
        })
    }
    selectNetwork = (id) => {
        global.storage.save({
            key: 'accounts',
            data: {'accounts':this.state.accounts, 'currentAccount':this.state.currentAccount, 'networkId': id }
        })
        this.setState({ networkId: id,isModalVisible: false })
    }
    handleOpenNetSelect = (isModalVisible) => {
        this.setState({ isModalVisible: isModalVisible })
    }
    componentDidUpdate() {
    }
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return
        }
    }
    render() {
        return (
            <MyBackground style={{alignItems: 'center'}}>
                <TopBar
                    handleOpenNetSelect={this.handleOpenNetSelect}
                    accounts={this.state.accounts}
                    networkId={this.state.networkId}
                />
                <BalanceCard
                    accounts={this.state.accounts}
                    currentAccount={this.state.currentAccount}
                    networkId={this.state.networkId}
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