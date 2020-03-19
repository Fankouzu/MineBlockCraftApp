import React from 'react'
import * as actions from '../../actions'
import { connect } from 'react-redux'
import BalanceCard from './Components/BalanceCard'
import TxList from './Components/TxList'
import MyBackButton from '../Components/MyBackButton'
import MyBackground from '../Components/MyBackground'
import { ScrollView } from 'react-native-gesture-handler'
import {
    RefreshControl,
} from 'react-native'
class Ethereum extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            passworModaldAction: '',
            balanceLoad: 0,
            refreshing: false,
        }
    }
    componentDidMount = () => {
        this._didFocusSubscription = this.props.navigation.addListener('didFocus',
            () => {
                this.setState({ balanceLoad: this.state.balanceLoad + 1 })
            }
        )
    }


    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return
        }
        this._didFocusSubscription.remove()
    }
    _onRefresh = () => {
        this.setState({ refreshing: true,balanceLoad: this.state.balanceLoad + 1 })
    }
    _onRefreshFinish = () => {
        this.setState({ refreshing: false})
    }

    render() {
        const { navigate } = this.props.navigation
        return (
            <MyBackground>
                <ScrollView
                    style={{ flexDirection: 'column' }}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
                >
                    <MyBackButton
                        onPress={() => { navigate('MainScreen') }}
                    />
                    <BalanceCard
                        navigation={this.props.navigation}
                        balanceLoad={this.state.balanceLoad}
                        _onRefreshFinish={this._onRefreshFinish}
                    />
                    <TxList />
                </ScrollView>
            </MyBackground>
        )
    }
}
const mapStateToProps = state => (state)

const mapDispatchToProps = dispatch => ({
    setMnemonic: (value) => dispatch(actions.setMnemonic(value)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Ethereum)