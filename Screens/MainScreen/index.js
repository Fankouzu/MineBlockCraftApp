import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Drawer from 'react-native-drawer'
import MyBackground from '../Components/MyBackground'
import Loading from '../Components/Loading'
import AccountDrawer from './Components/AccountDrawer'
import TopBar from './Components/TopBar'
import AppView from './Components/AppView'
import NetworkModal from './Components/NetworkModal'
import ProfileModal from './Components/ProfileModal'
import MsgList from './Components/MsgList'
import { mnemonicToAddress, openContract } from '../../utils/Tools'
import ContractAddress from '../../Contract/address.js'
import { aesDecrypt, sha1 } from '../../utils/Aes'
import Spinner from 'react-native-loading-spinner-overlay'
import { I18n } from '../../i18n'
import { networks } from '../../utils/networks'
import abi from '../../Contract/MineBlockCraftUser.abi.js'

class MainScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            passworModaldAction: '',
            spinner: false,
            contract: {},
            statusStorage: {},
            currentAccount: '',
            LoadingDisplay: true
        }
        this._bootstrapAsync()
    }

    _bootstrapAsync = async () => {
        global.storage.load({
            key: 'status',
        }).then(ret => {
            this.setState({ statusStorage: ret })
            this.getContract()
        }).catch(err => {
            console.log('_bootstrapAsync', err)
            this.props.navigation.navigate('WelcomeNav', { page: 1 })
        })
    }

    getContract = () => {
        const { address, password, setGesture, gesturePassword } = this.state.statusStorage
        const { encrypt, networkId, currentAccount } = this.props.WalletReducer
        const UserContractAddress = ContractAddress.MineBlockCraftUser[networkId].address

        this.setState({ currentAccount: currentAccount })
        let orignPassword = setGesture && password && gesturePassword ?
            aesDecrypt(password, gesturePassword) : password

        let mnemonic = aesDecrypt(encrypt, sha1(orignPassword + 'salt'))
        this.props.setMnemonic(mnemonic)
        if (UserContractAddress && mnemonic) {
            this.props.setMsgList({ error: -1, result: [] })
            const contract = openContract(networks[networkId].name, mnemonic, currentAccount, UserContractAddress, abi)
            this.props.setContract(contract)
            contract.msgList().then(async (msgList) => {
                if (msgList.length === 0) {
                    this.props.setMsgList({ error: 0, result: [] })
                } else {
                    let result = [];
                    for (var i = 0; i < msgList.length; i++) {
                        var profile = await contract.getProfile(msgList[i])
                        result[i] = { address: msgList[i], profile: profile }
                    }
                    this.props.setMsgList({ error: 1, result: result })
                }
                this.setState({ LoadingDisplay: false })
            })
        }else{
            this.setState({ LoadingDisplay: false })
        }
        if (address && password && setGesture === true) {
            this.props.navigation.navigate('GesturePassword')
        }
    }

    componentDidMount = () => {
        setTimeout(() => {
            this.setState({ LoadingDisplay: false })
        }, 5000)
        this._didFocusSubscription = this.props.navigation.addListener('didFocus',
            () => {
            }
        )
    }

    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return
        }
        this._didFocusSubscription.remove()
    }


    selectAccount = (accounts, currentAccount) => {
        this._drawer.close()
        this.setState({ LoadingDisplay: true })
        setTimeout(() => {
            this.props.selectAccount(accounts, currentAccount, false)
            this.setState({ currentAccount: currentAccount })
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
            this.getContract()
        }, 300)
    }
    selectNetwork = (id) => {
        if (id === this.props.WalletReducer.networkId) {
            this.props.setNetworkModalVisiable(false)
        } else {
            this.props.setNetworkModalVisiable(false)
            this.setState({ LoadingDisplay: true })
            setTimeout(() => {
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
                this.getContract()
            }, 300)
        }
    }
    newAccount = async () => {
        this._drawer.close()
        this.setState({ spinner: true })
        setTimeout(async () => {
            global.storage.load({ key: 'status' })
                .then(ret => {
                    const { accounts, encrypt } = this.props.WalletReducer
                    const { password, setGesture, gesturePassword } = ret
                    let orignPassword = setGesture && password && gesturePassword ?
                        aesDecrypt(password, gesturePassword) : password

                    let mnemonic = aesDecrypt(encrypt, sha1(orignPassword + 'salt'))

                    let address = mnemonicToAddress(mnemonic, accounts.length)
                    accounts[accounts.length] = {
                        address: address
                    }
                    let currentAccount = accounts.length - 1
                    this.selectAccount(accounts, currentAccount)
                    this.setState({ spinner: false })
                }).catch(err => {
                    this.props.navigation.navigate('WelcomeNav', { page: 1 })
                })
        }, 500)
    }

    OpenProfile = async () => {
        const { networkId } = this.props.WalletReducer
        const UserContractAddress = ContractAddress.MineBlockCraftUser[networkId].address
        if (UserContractAddress !== "") {
            this.props.setProfileModalVisiable(true)
        }
    }

    render() {
        const { networkId } = this.props.WalletReducer
        const UserContractAddress = ContractAddress.MineBlockCraftUser[networkId].address
        return (
            <Drawer
                type="displace"
                side="right"
                ref={(ref) => this._drawer = ref}
                initializeOpen={false}
                content={<AccountDrawer
                    selectAccount={this.selectAccount}
                    newAccount={this.newAccount}
                />}
                tapToClose={true}
                openDrawerOffset={0.6}
                onClose={() => { }}
            >
                <MyBackground style={{ alignItems: 'center' }}>
                    <TopBar
                        openControlPanel={() => { this._drawer.open() }}
                        OpenProfile={this.OpenProfile}
                    />
                    <AppView
                        navigation={this.props.navigation}
                    />
                    {UserContractAddress !== '' && (
                        <MsgList
                            navigation={this.props.navigation}
                            contract={this.state.contract}
                            currentAccount={this.state.currentAccount}
                        />
                    )}
                    <Loading display={this.state.LoadingDisplay} />
                </MyBackground>
                <ProfileModal
                    navigation={this.props.navigation}
                    setVisiable={this.props.setProfileModalVisiable}
                    isVisible={this.props.WalletMain.isProfileModalVisible}
                />
                <NetworkModal
                    handleOpenNetSelect={this.handleOpenNetSelect}
                    isModalVisible={this.state.isModalVisible}
                    selectNetwork={this.selectNetwork}
                />
                <Spinner
                    visible={this.state.spinner}
                    textContent={I18n.t('LoadingTxt')}
                    textStyle={{ color: '#fff' }}
                    overlayColor={'rgba(0, 0, 0, 0.5)'}
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
    setMnemonic: (value) => dispatch(actions.setMnemonic(value)),
    setContract: (value) => dispatch(actions.setContract(value)),
    setMsgList: (value) => dispatch(actions.setMsgList(value)),
})
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)