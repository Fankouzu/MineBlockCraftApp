import React from 'react'
import {connect} from 'react-redux'
import * as actions from '../actions'
import Copyright from '../components/Copyright'
import TopBar from '../components/TopBar'
import BalanceCard from '../components/BalanceCard'
import NetworkModal from '../components/NetworkModal'
import MyBackground from '../components/MyBackground'

class WalletMain extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidMount = () => {
        // this._didFocusSubscription = this.props.navigation.addListener('didFocus',
        //     () => {
        //         this.init()
        //     }
        // )
        this.init()
    }
    init = () => {
        console.log('walletMain:init:',this.props.WalletReducer)
    }
    selectNetwork = (id) => {
        if (id === this.props.WalletReducer.networkId) {
            this.props.setNetworkModalVisiable(false)
        } else {
            this.props.setNetworkId(id)
            this.props.setNetworkModalVisiable(false)
            this.props.setShowBalanceLoading('flex')
        }
    }
    selectAccount = (accounts, currentAccount) => {
        this.props.setAccounts(accounts)
        this.props.setCurrentAccount(currentAccount)
        this.props.setShowBalanceLoading('flex')
    }
    componentDidUpdate() {
    }
    componentDidUpdate(nextProps, nextState) {
    }
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return
        }
        //this._didFocusSubscription.remove()
    }
    render() {
        return (
            <MyBackground style={{ alignItems: 'center' }}>
                <TopBar
                    navigation={this.props.navigation}
                    openControlPanel={this.props.openControlPanel}
                />
                <BalanceCard
                    navigation={this.props.navigation}
                    showPasswordModal={this.props.showPasswordModal}
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
const mapStateToProps = state => (state)

const mapDispatchToProps = dispatch => ({
    setAccounts: (value) => dispatch(actions.setAccounts(value)),
    setCurrentAccount: (value) => dispatch(actions.setCurrentAccount(value)),
    setNetworkId: (value) => dispatch(actions.setNetworkId(value)),
    setNetworkModalVisiable: (value) => dispatch(actions.setNetworkModalVisiable(value)),
    setShowBalanceLoading: (value) => dispatch(actions.setShowBalanceLoading(value)),
})
export default connect(mapStateToProps,mapDispatchToProps)(WalletMain)