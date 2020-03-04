import React, { Component } from 'react'
import {connect} from 'react-redux'
import * as actions from '../../../actions'
import { Text, StyleSheet, View, Animated, TouchableOpacity } from 'react-native'
import Modal from "react-native-modal"
import MyCard from '../../Components/MyCard'
import Title from '../../Components/Title'
import MyTextInput from '../../Components/MyTextInput'
import MyPasswordInput from '../../Components/MyPasswordInput'
import AlertText from '../../Components/AlertText'
import MyButton from '../../Components/MyButton'
import { aesDecrypt, sha1 } from '../../../utils/Aes'
import { validateMnemonic,initContract } from '../../../utils/Tools'
import ContractAddress from '../../../Contract/address.js'
import { networks } from '../../../utils/networks'
import abi from '../../../Contract/MineBlockCraftUser.abi.js'
import { I18n } from '../../../i18n'


class ProfileModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shakeLeft: new Animated.Value(0),
            password: '',
            alertText: [],
            borderColor: '#999',
            buttonDisable: false,
            top: new Animated.Value(-150),
            title:'',
            nickName:'',
            signature:''
        }
    }
    async componentDidMount () {
        const {networkId,accounts,currentAccount} = this.props.WalletReducer
        const UserContractAddress = ContractAddress.MineBlockCraftUser[networkId].address
        if(UserContractAddress !== ""){
            const contract = initContract(networks[networkId].name,UserContractAddress,abi)
            
            let AddressToId = await contract.AddressToId(accounts[currentAccount].address)
            AddressToId = parseInt(AddressToId,16)
            let contractOwner = await contract.owner()

            if(AddressToId === 0 && contractOwner === accounts[currentAccount].address){
                this.setState({title:I18n.t('RegUser')})
            }else{
                let Profile = await contract.Profiles(AddressToId)
                this.setState({
                    title:I18n.t('EditProfile'),
                    nickName:Profile[0],
                    signature:Profile[1],
                })
            }
        }    
    }
    shake = () => {
        var duration = 100
        Animated.sequence([
            Animated.timing(this.state.shakeLeft, {
                toValue: global.screenWidth * -0.05,
                duration: duration
            }),
            Animated.timing(this.state.shakeLeft, {
                toValue: global.screenWidth * -0.03,
                duration: duration
            }),
            Animated.timing(this.state.shakeLeft, {
                toValue: global.screenWidth * 0.03,
                duration: duration
            }),
            Animated.timing(this.state.shakeLeft, {
                toValue: 0,
                duration: duration
            })
        ]).start(() => {
            setTimeout(() => {
                this.setState({
                    borderColor: '#999',
                    alertText: [],
                    buttonDisable: false
                })
            }, 3000)
        })
    }
    handleKeybordMargin = (action) => {
        // Animated.timing(this.state.top, {
        //     toValue: action === 'up' ? 0 : -150,
        //     duration: 200
        // }).start()
    }
    handleTypePassword = (password) => {
        this.setState({ password: password })
    }
    handleSubmit = (next) => {
        if (this.state.password === '') {
            this.setState({
                borderColor: '#F30',
                alertText: [I18n.t('OpenWalletAlertTxt1')],
                buttonDisable: true
            })
            this.shake()
        } else {
            let password = this.state.password
            let encrypt = this.props.WalletReducer.encrypt
            let mnemonic = aesDecrypt(encrypt, sha1(password))
            if (validateMnemonic(mnemonic)) {
                this.setState({ password: '' })
                this.props.setMnemonic(mnemonic)
                this.props.passwordAction()
            } else {
                this.setState({
                    borderColor: '#F30',
                    alertText: [I18n.t('OpenWalletAlertTxt2')],
                    buttonDisable: true
                })
                this.shake()
            }
        }
        next()
    }
    render() {
        return (
            <Modal isVisible={this.props.isVisible}>
                <Animated.View style={{
                    marginLeft: this.state.shakeLeft,
                }}>
                    <MyCard
                        screenWidth={global.screenWidth * 0.9}
                        margin={0}
                        top={0}
                    >
                        <Title titleText={this.state.title} />
                        <MyTextInput
                            handleType={(nickName)=>{this.setState({ password: nickName })}}
                            handleKeybordMargin={this.handleKeybordMargin}
                            placeholder={I18n.t('InputNickName')}
                            borderColor={this.state.borderColor}
                            borderColorActive='#390'
                            buttonDisable={this.state.buttonDisable}
                            value={this.state.nickName}
                            focus={false}
                        />
                        <MyTextInput
                            handleType={(signature)=>{this.setState({ signature: signature })}}
                            handleKeybordMargin={this.handleKeybordMargin}
                            placeholder={I18n.t('InputSignature')}
                            borderColor={this.state.borderColor}
                            borderColorActive='#390'
                            buttonDisable={this.state.buttonDisable}
                            value={this.state.signature}
                            focus={false}
                        />
                        <MyPasswordInput
                            handleTypePassword={(password)=>{this.setState({ password: password })}}
                            handleKeybordMargin={this.handleKeybordMargin}
                            placeholder={I18n.t('InputPassword')}
                            borderColor={this.state.borderColor}
                            borderColorActive='#390'
                            buttonDisable={this.state.buttonDisable}
                            focus={false}
                        />
                        <AlertText
                            alertText={this.state.alertText}
                            textAlign='left'
                        />
                        <MyButton
                            screenWidth={global.screenWidth * 0.9 - 30}
                            onPress={(next) => { this.handleSubmit(next) }}
                            text={I18n.t('PasswordSubmit')}
                            height={50}
                            backgroundColor='#6f0'
                            backgroundDarker='#390'
                            textColor='#000'
                            borderColor='#390'
                            borderWidth={1}
                            textSize={20}
                            progress={true}
                        />
                        <View style={styles.bottom}>
                            <TouchableOpacity onPress={() => { this.props.setVisiable(false) }}>
                                <Text style={styles.bottomLink}>{I18n.t('Cancle')}</Text>
                            </TouchableOpacity>
                        </View>
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
        paddingTop: 10
    },
    modalTitle: {
        fontSize: 25,
        color: '#fff',
        marginBottom: 10,
        lineHeight: 40,
        letterSpacing: 2,
        fontFamily: 'BigYoungMediumGB2.0'
    },
    bottom: {
        alignItems: 'center',
        padding: 5,
    },
    bottomLink: {
        color: '#390'
    }
})

const mapStateToProps = state => (state)

const mapDispatchToProps = dispatch => ({
    setMnemonic: (value) => dispatch(actions.setMnemonic(value))
})
export default connect(mapStateToProps,mapDispatchToProps)(ProfileModal)