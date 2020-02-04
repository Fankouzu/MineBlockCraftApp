import React from 'react'
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Animated,
    Keyboard
} from 'react-native'
import MyTextInput from '../components/MyTextInput'
import MyCheckBox from '../components/MyCheckBox'
import MyButton from '../components/MyButton'
import MyBackButton from '../components/MyBackButton'
import MyCard from '../components/MyCard'
import Title from '../components/Title'
import AlertText from '../components/AlertText'
import { aesDecrypt, sha1 } from '../utils/Aes'
import { validateMnemonic, mnemonicToAddress } from '../utils/Tools'

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
export default class Open extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            password: '',
            checked: false,
            top: new Animated.Value(50),
            shakeLeft: new Animated.Value(global.screenWidth * 0.05),
            encrypt: this.props.encrypt,
            alertText: [],
            borderColor: '#999',
            buttonDisable: false
        }
    }
    componentDidMount() {

    }
    componentDidUpdate(nextProps, nextState) {
        if (nextProps.encrypt !== this.state.encrypt) {
            this.setState({
                encrypt: nextProps.encrypt
            })
            return true
        } else if (this.props.encrypt !== this.state.encrypt) {
            this.setState({
                encrypt: this.props.encrypt
            })
            return true
        }
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
                alertText: ['⚠️请输入密码'],
                buttonDisable: true
            })
            this.shake()
        } else {
            Keyboard.dismiss()
            global.storage.load({
                key: 'wallet',
            }).then(ret => {
                let password = this.state.password
                let checked = this.state.checked
                let encrypt = ret.encrypt
                let mnemonic = aesDecrypt(encrypt, sha1(password))
                if (validateMnemonic(mnemonic)) {
                    let days = checked === true ? 30 : 1
                    let accounts = [{
                        address: mnemonicToAddress(mnemonic, 0),
                        balance: 0
                    }]
                    console.log(accounts)
                    global.storage.save({
                        key: 'accounts',
                        data: { 'accounts': accounts },
                        expires: 1000 * 3600 * 24 * days,
                    })
                    this.props.navigation.navigate('WalletNav')
                } else {
                    this.setState({
                        borderColor: '#F30',
                        alertText: ['⚠️密码错误'],
                        buttonDisable: true
                    })
                    this.shake()
                }
            }).catch(err => {
                this.setState({
                    borderColor: '#F30',
                    alertText: ['⚠️钱包错误，请重新创建或导入钱包'],
                    buttonDisable: true
                })
                this.shake()
                //console.warn(err.message)
                switch (err.name) {
                    case 'NotFoundError':
                        break
                    case 'ExpiredError':
                        break
                }
            })
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
                        <Title titleText='币神钱包' />
                        <MyTextInput
                            handleTypePassword={this.handleTypePassword}
                            handleKeybordMargin={this.handleKeybordMargin}
                            placeholder='输入密码'
                            borderColor={this.state.borderColor}
                            borderColorActive='#390'
                            buttonDisable={this.state.buttonDisable}
                        />
                        <MyCheckBox
                            handleCheck={this.handleCheck}
                            checkedCheckBoxColor='#390'
                        />
                        <AlertText
                            alertText={this.state.alertText}
                            textAlign='left'
                        />
                        <MyButton
                            screenWidth={global.screenWidth * 0.9 - 30}
                            onPress={(next) => {this.handleSubmit(next)}}
                            text='打开钱包'
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
                                <Text style={styles.bottomLink}>导入钱包</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigate('CreateNav')}>
                                <Text style={styles.bottomLink}>创建钱包</Text>
                            </TouchableOpacity>
                        </View>
                    </MyCard>
                </Animated.View>
            </View>
        )
    }
}