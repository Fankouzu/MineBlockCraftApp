import React from 'react'
import {
    StyleSheet,
    View,
    Keyboard,
    Animated,
} from 'react-native'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import MyCard from '../Components/MyCard'
import MyButton from '../Components/MyButton'
import MyBackButton from '../Components/MyBackButton'
import MyPasswordInput from '../Components/MyPasswordInput'
import Title from '../Components/Title'
import AlertText from '../Components/AlertText'
import { checkPasswordLevel } from '../../utils/Tools'
import Modal from 'react-native-modal'
import { aesEncrypt, sha1 } from '../../utils/Aes'
import { I18n,countryCode } from '../../i18n'

const styles = StyleSheet.create({
    modalView: {
        flex: 0,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        paddingTop: 10,
    },
})

var alertText = [I18n.t('PasswordAlertTxt1'), I18n.t('PasswordAlertTxt2')]
class Password extends React.Component {
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
            isModalVisible: false,
        }
    }
    componentDidMount() {
        this._keyboardWillShowSubscription = Keyboard.addListener('keyboardDidShow', (e) => this._keyboardWillShow(e))
        this._keyboardWillHideSubscription = Keyboard.addListener('keyboardDidHide', (e) => this._keyboardWillHide(e))
    }
    componentWillUnmount = () => {
        this._keyboardWillShowSubscription.remove()
        this._keyboardWillHideSubscription.remove()
        this.setState = (state, callback) => {
            return
        }
    }
    _keyboardWillShow(e) {
        let keyboardHeight = e.endCoordinates.height
        this.setState({
            keyBoardHeight: keyboardHeight,
        })
        this.handleKeybordMargin('up')
    }

    _keyboardWillHide(e) {
        let keyboardHeight = e.endCoordinates.height
        this.setState({
            keyBoardHeight: keyboardHeight,
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
            duration: 200,
        }).start()
    }
    shake = () => {
        var duration = 100
        Animated.sequence([
            Animated.timing(this.state.shakeLeft, {
                toValue: global.screenWidth * 0.02,
                duration: duration,
            }),
            Animated.timing(this.state.shakeLeft, {
                toValue: global.screenWidth * 0.08,
                duration: duration,
            }),
            Animated.timing(this.state.shakeLeft, {
                toValue: global.screenWidth * 0.03,
                duration: duration,
            }),
            Animated.timing(this.state.shakeLeft, {
                toValue: global.screenWidth * 0.05,
                duration: duration,
            }),
        ]).start(() => {
            setTimeout(() => {
                this.setState({
                    borderColor: '#999',
                    alertText: alertText,
                    buttonDisable: false,
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
                alertText: [I18n.t('PasswordAlertTxt3')],
                buttonDisable: true,
            })
        } else {
            if (passwordTest < passwordLevel) {
                this.shake()
                this.setState({
                    borderColor: '#f30',
                    alertText: [I18n.t('PasswordAlertTxt4')],
                    buttonDisable: true,
                })
            } else {
                this.Wallet()
                this.setState({
                    borderColor: '#999',
                    alertText: alertText,
                    buttonDisable: false,
                })
            }
        }
    }
    Wallet = () => {
        const encrypt = aesEncrypt(this.props.LoginReducer.useMnemonic, sha1(this.state.password + 'salt'))
        global.storage.save({
            key: 'wallet',
            data: {
                'encrypt': encrypt,
                'accounts': [{address:'',balance:0}],
                'currentAccount': 0,
                'networkId': 0,
             },
            expires: null,
        })
        this.props.setEncrypt(encrypt)
        this.setState({ isModalVisible: true })

    }
    render() {
        const { navigate } = this.props.navigation
        return (
            <View style={{ flexDirection: 'column' }}>
                <MyBackButton
                    onPress={() => this.props.turnPage(-1)}
                />
                <Animated.View style={{
                    marginLeft: this.state.shakeLeft,
                    marginTop: this.state.top,
                }}>
                    <MyCard
                        screenWidth={global.screenWidth * 0.9}
                        margin={0}
                        top={0}
                        padding={10}
                    >
                        <Title titleText={I18n.t('InputPassword')} fontSize={countryCode === 'CN' ? 30 : 26}/>
                        <MyPasswordInput
                            handleTypePassword={(password) => this.handleTypePassword(password)}
                            handleKeybordMargin={() => { }}
                            borderColor={this.state.borderColor}
                            borderColorActive="#390"
                            placeholder={I18n.t('InputPassword')}
                        />
                        <MyPasswordInput
                            handleTypePassword={(password) => this.handleTypePasswordConfirm(password)}
                            handleKeybordMargin={() => { }}
                            borderColor={this.state.borderColor}
                            borderColorActive="#390"
                            placeholder={I18n.t('ConfirmPassword')}
                        />
                        <AlertText
                            alertText={this.state.alertText}
                            textAlign="left"
                        />
                        <MyButton
                            screenWidth={global.screenWidth * 0.9 - 20}
                            text={I18n.t('PasswordSubmit')}
                            height={50}
                            backgroundColor="#6f0"
                            backgroundDarker="#390"
                            textColor="#000"
                            borderColor="#390"
                            borderWidth={1}
                            disabled={this.state.buttonDisable}
                            onPress={() => { this.handleSubmit() }}
                        />
                    </MyCard>
                </Animated.View>
                <Modal isVisible={this.state.isModalVisible}>
                    <View style={styles.modalView}>
                        <Title titleText={I18n.t('PasswordSuccess')} subText={I18n.t('Login')} />
                        <MyButton
                            screenWidth={global.screenWidth * 0.9 - 20}
                            text="OK"
                            height={50}
                            backgroundColor="#6f0"
                            backgroundDarker="#390"
                            textColor="#000"
                            borderColor="#390"
                            borderWidth={1}
                            onPress={() => navigate('WelcomeNav', { page: 1 })}
                        />
                    </View>
                </Modal>
            </View>
        )
    }
}
const mapStateToProps = state => (state)

const mapDispatchToProps = dispatch => ({
    setEncrypt: (value) => dispatch(actions.setEncrypt(value)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Password)
