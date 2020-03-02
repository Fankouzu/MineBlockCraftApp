import React from 'react'
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Animated,
    Keyboard
} from 'react-native'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import MyTextInput from '../Components/MyTextInput'
import MyCheckBox from './Components/MyCheckBox'
import MyButton from '../Components/MyButton'
import MyBackButton from '../Components/MyBackButton'
import MyCard from '../Components/MyCard'
import Title from '../Components/Title'
import AlertText from '../Components/AlertText'
import { aesDecrypt, sha1 } from '../../utils/Aes'
import { validateMnemonic, mnemonicToAddress } from '../../utils/Tools'
import { I18n } from '../../i18n'

const styles = StyleSheet.create({
    bottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
    },
    bottomLink: {
        color: '#390'
    }
})
class OpenWallet extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            password: '',
            checked: false,
            top: new Animated.Value(50),
            shakeLeft: new Animated.Value(global.screenWidth * 0.05),
            alertText: [],
            borderColor: '#999',
            buttonDisable: false
        }
    }
    componentDidMount() {

    }
    componentDidUpdate(nextProps, nextState) {
    }
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return
        }
    }
    handleTypePassword = (password) => {
        this.setState({ password: password })
    }
    handleCheck = (checked) => {
        this.setState({ checked: checked })
    }
    handleKeybordMargin = (action) => {
        Animated.timing(this.state.top, {
            toValue: action === 'up' ? 50 : 50,
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
                    alertText: [],
                    buttonDisable: false
                })
            }, 3000)
        })
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
            Keyboard.dismiss()
            let password = this.state.password
            let checked = this.state.checked
            let encrypt = this.props.WalletReducer.encrypt
            if (encrypt) {
                let mnemonic = aesDecrypt(encrypt, sha1(password))
                if (mnemonic && validateMnemonic(mnemonic)) {
                    let days = checked === true ? 30 : 1
                    let address = mnemonicToAddress(mnemonic, 0)
                    let accounts = [{
                        address: address,
                        balance: 0
                    }]
                    if (this.props.WalletReducer.accounts && this.props.WalletReducer.accounts.length === 0) {
                        this.props.setAccounts(accounts)
                    } else if (this.props.WalletReducer.accounts[0].address === '') {
                        this.props.setAccounts(accounts)
                    }
                    global.storage.load({
                        key: 'wallet',
                    }).then(ret => {
                        if (!ret.accounts || ret.accounts[0].address === '') {
                            global.storage.save({
                                key: 'wallet',
                                data: {
                                    ...ret,
                                    'accounts': accounts,
                                    'currentAccount': 0,
                                    'networkId': 0
                                },
                                expires: null,
                            })
                        }
                        global.storage.save({
                            key: 'status',
                            data: {
                                'address': address,
                            },
                            expires: 1000 * 3600 * 24 * days,
                        })
                        this.props.navigation.navigate('WalletNav')
                    })
                } else {
                    this.setState({
                        borderColor: '#F30',
                        alertText: [I18n.t('OpenWalletAlertTxt2')],
                        buttonDisable: true
                    })
                    this.shake()
                }
            } else {
                this.setState({
                    borderColor: '#F30',
                    alertText: [I18n.t('OpenWalletAlertTxt3')],
                    buttonDisable: true
                })
                this.shake()
            }
        }
        next()
    }
    render() {
        const { navigate } = this.props.navigation
        return (
            <View style={{ flexDirection: 'column', width: global.screenWidth }}>
                <MyBackButton
                    onPress={() => this.props.turnPage(-1)}
                />
                <Animated.View style={{
                    marginLeft: this.state.shakeLeft
                }}>
                    <MyCard
                        screenWidth={global.screenWidth * 0.9}
                        margin={0}
                    >
                        <Title titleText={I18n.t('AppName')} />
                        <MyTextInput
                            handleTypePassword={this.handleTypePassword}
                            handleKeybordMargin={this.handleKeybordMargin}
                            placeholder={I18n.t('InputPassword')}
                            borderColor={this.state.borderColor}
                            borderColorActive='#390'
                            buttonDisable={this.state.buttonDisable}
                        />
                        <MyCheckBox
                            handleCheck={this.handleCheck}
                            checkedCheckBoxColor='#390'
                            text={I18n.t('Remember')}
                        />
                        <AlertText
                            alertText={this.state.alertText}
                            textAlign='left'
                        />
                        <MyButton
                            screenWidth={global.screenWidth * 0.9 - 30}
                            onPress={(next) => { this.handleSubmit(next) }}
                            text={I18n.t('Login')}
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
                            <TouchableOpacity onPress={() => navigate('ImportNav')}>
                                <Text style={styles.bottomLink}>{I18n.t('OpenWalletImport')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigate('CreateNav')}>
                                <Text style={styles.bottomLink}>{I18n.t('OpenWalletCreate')}</Text>
                            </TouchableOpacity>
                        </View>
                    </MyCard>
                </Animated.View>
            </View>
        )
    }
}
const mapStateToProps = state => (state)

const mapDispatchToProps = dispatch => ({
    setAccounts: (value) => dispatch(actions.setAccounts(value)),
})
export default connect(mapStateToProps, mapDispatchToProps)(OpenWallet)