import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../actions'
import { Text, StyleSheet, View, Animated, TouchableOpacity, ActivityIndicator } from 'react-native'
import Modal from 'react-native-modal'
import MyCard from '../../Components/MyCard'
import Title from '../../Components/Title'
import MyButton from '../../Components/MyButton'
import AlertText from '../../Components/AlertText'
import { aesDecrypt, sha1 } from '../../../utils/Aes'
import { validateMnemonic, openContract } from '../../../utils/Tools'
import ContractAddress from '../../../Contract/address.js'
import { networks } from '../../../utils/networks'
import abi from '../../../Contract/MineBlockCraftUser.abi.js'
import { I18n } from '../../../i18n'
import { TextField } from 'react-native-material-textfield'

class ProfileModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            alertText: [],
            alertColor: '#F30',
            borderColor: '#999',
            buttonDisable: false,
            top: new Animated.Value(-150),
            title: '',
            nickName: '',
            signature: '',
            Profile: [],
        }
        this.props.setVisiable(false)
    }
    async componentDidMount() {
        await this.Init()
    }
    Init = async () => {
        this.setState({
            nickName: '',
            signature: '',
        })
        const { networkId, accounts, currentAccount } = this.props.WalletReducer
        const UserContractAddress = ContractAddress.MineBlockCraftUser[networkId].address

        if (UserContractAddress !== '') {
            // const contract = initContract(networks[networkId].name, UserContractAddress, abi)

            let AddressToId = await this.props.WalletMain.contract.AddressToId(accounts[currentAccount].address)
            AddressToId = parseInt(AddressToId, 16)
            let contractOwner = await this.props.WalletMain.contract.owner()

            if (AddressToId === 0 && contractOwner !== accounts[currentAccount].address) {
                this.setState({
                    title: I18n.t('RegUser'),
                })
            } else {
                let Profile = await this.props.WalletMain.contract.Profiles(AddressToId)
                this.setState({
                    title: I18n.t('EditProfile'),
                    nickName: Profile[0],
                    signature: Profile[1],
                    Profile: Profile,
                })
            }
        }
    }

    async componentDidUpdate(nextProps, _nextState) {
        if (nextProps.isVisible !== this.props.isVisible && this.props.isVisible) {
            await this.Init()
        }
    }

    handleSubmit = async (next) => {

        if (this.state.nickName !== '' && this.state.nickName !== this.state.Profile[0] && this.state.signature !== this.state.Profile[1]) {
            const { networkId,mnemonic,currentAccount } = this.props.WalletReducer
            const UserContractAddress = ContractAddress.MineBlockCraftUser[networkId].address

            const contract = openContract(networks[networkId].name, mnemonic, currentAccount, UserContractAddress, abi)
            contract.newProfile(this.state.nickName, this.state.signature).then((tx) => {
                console.log(tx)
                this.setState({
                    alertText: [I18n.t('Success')],
                    alertColor: '#390',
                })
                setTimeout(() => {
                    this.Cancel()
                }, 2000)
                next()
            }).catch((error) => {
                console.log(error)
                next()
                this.setState({
                    alertText: ['余额不足,账户中没有足够的Eth'],
                })
                setTimeout(() => {
                    this.Cancel()
                }, 5000)
            })
        } else {
            this.Cancel()
        }
    }
    Cancel = () => {
        this.setState({
            title: '',
            nickName: '',
            signature: '',
            alertText: [],
        })
        this.props.setVisiable(false)
    }
    render() {
        return (
            <Modal isVisible={this.props.isVisible}>
                <Animated.View >
                    <MyCard
                        screenWidth={global.screenWidth * 0.9}
                        margin={0}
                        top={0}
                    >
                        {this.state.title === '' ?
                            (<View>
                                <Title titleText={I18n.t('TxLoading')} />
                                <ActivityIndicator size={60} />
                            </View>
                            ) : (<View>
                                <Title titleText={this.state.title} />
                                <TextField
                                    label={I18n.t('InputNickName')}
                                    onChangeText={(nickName) => { this.setState({ nickName: nickName }) }}
                                    tintColor={'#390'}
                                    fontSize={18}
                                    containerStyle={{ marginTop: -30 }}
                                    labelTextStyle={{ paddingTop: 2.5, top: 5 }}
                                    renderLeftAccessory={() => { return (<Text>😎 </Text>) }}
                                    labelOffset={{ y0: -4, y1: -10 }}
                                    value={this.state.nickName}
                                />
                                <TextField
                                    label={I18n.t('InputSignature')}
                                    onChangeText={(signature) => { this.setState({ signature: signature }) }}
                                    tintColor={'#390'}
                                    fontSize={18}
                                    containerStyle={{ marginTop: -20 }}
                                    labelTextStyle={{ paddingTop: 2.5, top: 5 }}
                                    renderLeftAccessory={() => { return (<Text>📝 </Text>) }}
                                    labelOffset={{ y0: -4, y1: -10 }}
                                    value={this.state.signature}
                                />
                                <AlertText
                                    alertText={this.state.alertText}
                                    textAlign="left"
                                    alertColor={this.state.alertColor}
                                />
                                <MyButton
                                    screenWidth={global.screenWidth * 0.9 - 30}
                                    onPress={(next) => { this.handleSubmit(next) }}
                                    text={I18n.t('PasswordSubmit')}
                                    height={50}
                                    backgroundColor="#6f0"
                                    backgroundDarker="#390"
                                    textColor="#000"
                                    borderColor="#390"
                                    borderWidth={1}
                                    textSize={20}
                                    progress={true}
                                />
                                <View style={styles.bottom}>
                                    <TouchableOpacity onPress={() => { this.Cancel() }}>
                                        <Text style={styles.bottomLink}>{I18n.t('Cancel')}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            )
                        }
                    </MyCard>
                </Animated.View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    modalView: {
        flex: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 10,
        alignItems: 'center',
        paddingTop: 10,
    },
    modalTitle: {
        fontSize: 25,
        color: '#fff',
        marginBottom: 10,
        lineHeight: 40,
        letterSpacing: 2,
        fontFamily: 'BigYoungMediumGB2.0',
    },
    bottom: {
        alignItems: 'center',
        padding: 5,
    },
    bottomLink: {
        color: '#390',
    },
})

const mapStateToProps = state => (state)

const mapDispatchToProps = dispatch => ({
    setMnemonic: (value) => dispatch(actions.setMnemonic(value)),
})
export default connect(mapStateToProps, mapDispatchToProps)(ProfileModal)
