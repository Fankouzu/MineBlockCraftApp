import React from 'react'
import {
    StyleSheet,
    View,
    Keyboard,
    Animated
} from 'react-native'
import MyCard from '../components/MyCard'
import MyButton from '../components/MyButton'
import MyBackButton from '../components/MyBackButton'
import MyTextInput from '../components/MyTextInput'
import Title from '../components/Title'
import AlertText from '../components/AlertText'
import MyBackground from '../components/MyBackground'
import { checkPasswordLevel } from '../utils/Tools'
import Modal from "react-native-modal"
import { aesEncrypt, sha1 } from '../utils/Aes'

const styles = StyleSheet.create({
    modalView: {
        flex: 0,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        paddingTop: 10
    }
})

var alertText = ['⚠️密码只保存在你的手机记忆中，不会发送到服务器', '⚠️密码一旦丢失请通过助记词找回钱包']
export default class Open extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            shakeLeft: new Animated.Value(global.screenWidth * 0.05),
            top: new Animated.Value(0),
            borderColor: '#999',
            password: '',
            passwordConfirm: '',
            alertText: alertText,
            buttonDisable: false,
            isModalVisible: false
        }
    }
    componentDidMount() {
        this._keyboardWillShowSubscription = Keyboard.addListener('keyboardDidShow', (e) => this._keyboardWillShow(e));
        this._keyboardWillHideSubscription = Keyboard.addListener('keyboardDidHide', (e) => this._keyboardWillHide(e));
    }
    componentWillUnmount = () => {
        this._keyboardWillShowSubscription.remove();
        this._keyboardWillHideSubscription.remove();
        this.setState = (state, callback) => {
            return
        }
    }
    _keyboardWillShow(e) {
        let keyboardHeight = e.endCoordinates.height;
        this.setState({
            keyBoardHeight: keyboardHeight
        })
        this.handleKeybordMargin('up')
    }

    _keyboardWillHide(e) {
        let keyboardHeight = e.endCoordinates.height;
        this.setState({
            keyBoardHeight: keyboardHeight
        })
        this.handleKeybordMargin('down')
    }
    handleTypePassword = (password) => {
        this.setState({ password: password })
    }
    handleTypePasswordConfirm = (passwordConfirm) => {
        this.setState({ passwordConfirm: passwordConfirm })
    }
    handleKeybordMargin = (action) => {
        Animated.timing(this.state.top, {
            toValue: action === 'up' ? -50 : 0,
            duration: 200
        }).start()
    }
    shake = () => {
        var duration = 100
        Animated.sequence([
            Animated.timing(this.state.shakeLeft, {
                toValue: global.screenWidth * 0.02,
                duration: duration
            }),
            Animated.timing(this.state.shakeLeft, {
                toValue: global.screenWidth * 0.08,
                duration: duration
            }),
            Animated.timing(this.state.shakeLeft, {
                toValue: global.screenWidth * 0.03,
                duration: duration
            }),
            Animated.timing(this.state.shakeLeft, {
                toValue: global.screenWidth * 0.05,
                duration: duration
            })
        ]).start(() => {
            setTimeout(() => {
                this.setState({
                    borderColor: '#999',
                    alertText: alertText,
                    buttonDisable: false
                })
            }, 3000)
        })
    }

    handleSubmit = () => {
        const passwordLevel = 3
        const passwordTest = checkPasswordLevel(this.state.password, passwordLevel)
        if (this.state.password !== this.state.passwordConfirm) {
            this.shake()
            this.setState({
                borderColor: '#f30',
                alertText: ['⚠️密码输入不相同'],
                buttonDisable: true
            })
        } else {
            if (passwordTest < passwordLevel) {
                this.shake()
                this.setState({
                    borderColor: '#f30',
                    alertText: ['⚠️密码需要最少8位，并且包含数字、大写、小写字母'],
                    buttonDisable: true
                })
            } else {
                this.Wallet()
                this.setState({
                    borderColor: '#999',
                    alertText: alertText,
                    buttonDisable: false
                })
            }
        }

    }
    Wallet = () => {
        const encrypt = aesEncrypt(this.props.mnemonic, sha1(this.state.password))
        global.wallet = {
            'encrypt': encrypt,
            accounts: [{ address: '0x0', balance: 0 }],
            'currentAccount': 0,
            'networkId': 0
        }
        global.storage.save({
            key: 'wallet',
            data: {
                'encrypt': encrypt,
                accounts: [{ address: '0x0', balance: 0 }],
                'currentAccount': 0,
                'networkId': 0
            },
            expires: null,
        })
        this.setState({ isModalVisible: true })
    }
    render() {
        const { navigate } = this.props.navigation
        return (
            <MyBackground>
                <View style={{ flexDirection: 'column' }}>
                    <MyBackButton
                        onPress={() => {navigate('WalletFrame')}}
                    />
                    <Animated.View style={{
                        marginLeft: this.state.shakeLeft,
                        marginTop: this.state.top
                    }}>
                        <MyCard
                            screenWidth={global.screenWidth * 0.9}
                            margin={0}
                            top={0}
                            padding={10}
                        >
                            <Title titleText='发送交易' />
                            <MyTextInput
                                handleTypePassword={(password) => this.handleTypePassword(password)}
                                handleKeybordMargin={() => { }}
                                borderColor={this.state.borderColor}
                                borderColorActive='#390'
                                placeholder='目标地址'
                                keyboardType='ascii-capable'
                                secureTextEntry={false}
                            />
                            <MyTextInput
                                handleTypePassword={(password) => this.handleTypePassword(password)}
                                handleKeybordMargin={() => { }}
                                borderColor={this.state.borderColor}
                                borderColorActive='#390'
                                placeholder='输入数额'
                                keyboardType='numeric'
                                secureTextEntry={false}
                            />
                            <AlertText
                                alertText={this.state.alertText}
                                textAlign='left'
                            />
                            <MyButton
                                screenWidth={global.screenWidth * 0.9 - 20}
                                text='完成'
                                height={50}
                                backgroundColor='#6f0'
                                backgroundDarker='#390'
                                textColor='#000'
                                borderColor='#390'
                                borderWidth={1}
                                disabled={this.state.buttonDisable}
                                onPress={() => { this.handleSubmit() }}
                            />
                        </MyCard>
                    </Animated.View>
                    <Modal isVisible={this.state.isModalVisible}>
                        <View style={styles.modalView}>
                            <Title titleText='成功了' subText='进入钱包' />
                            <MyButton
                                screenWidth={global.screenWidth * 0.9 - 20}
                                text='OK'
                                height={50}
                                backgroundColor='#6f0'
                                backgroundDarker='#390'
                                textColor='#000'
                                borderColor='#390'
                                borderWidth={1}
                                onPress={() => navigate('WelcomeNav', { page: 1 })}
                            />
                        </View>
                    </Modal>
                </View>
            </MyBackground>
        )
    }
}