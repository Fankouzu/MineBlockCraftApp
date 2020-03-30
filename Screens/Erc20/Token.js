import React from 'react'
import * as actions from '../../actions'
import { connect } from 'react-redux'
import BalanceCard from './Components/BalanceCard'
import Topbar from '../Components/Topbar'
import MyBackground from '../Components/MyBackground'
import TxList from './Components/TxList'
import { ScrollView } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native'
import { getTokenTx } from '../../utils/Tools'
import { networks } from '../../utils/networks'

class Token extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tokenTx: { error: -2 },
            title: ''
        }
    }

    componentDidMount = () => {
        this.props.setTokenTx({ error: -2 })
        this.setState({ tokenTx: { error: -2 } })
        this._didFocusSubscription = this.props.navigation.addListener('didFocus',
            () => {
                const contractAddress = this.props.navigation.getParam('contractAddress')
                this.getTokenTx(contractAddress)
            }
        )
    }
    getTokenTx = (contractAddress) => {
        const { accounts, currentAccount, networkId } = this.props.WalletReducer
        getTokenTx(networks[networkId].name, accounts[currentAccount].address, contractAddress).then((tokenTx) => {
            this.props.setTokenTx(tokenTx)
            this.setState({ title: tokenTx.result[0].tokenName })
        })
    }
    componentWillUnmount = () => {
        this._didFocusSubscription.remove()
        this.setState = (state, callback) => {
            return
        }
    }
    render() {
        const { navigate } = this.props.navigation
        return (
            <MyBackground>
                <Topbar
                    onPress={() => { navigate('Erc20') }}
                    titleTxt={this.state.title}
                />
                <ScrollView style={styles.Middle}>
                    <BalanceCard
                        navigation={this.props.navigation}
                    />
                    <TxList />
                </ScrollView>
            </MyBackground>
        )
    }
}

const styles = StyleSheet.create({
    Middle: {
        marginTop: 45,
        paddingTop: 20
    },
})

const mapStateToProps = state => (state)

const mapDispatchToProps = dispatch => ({
    setTokenTx: (value) => dispatch(actions.setTokenTx(value)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Token)