import React from 'react'
import {
    StyleSheet,
    View,
    Animated,
    Text,
    Keyboard,
    Clipboard
} from 'react-native'
import MyTextArea from '../components/MyTextArea'
import MyButton from '../components/MyButton'
import MyCard from '../components/MyCard'
import Title from '../components/Title'
import { validateMnemonic } from '../utils/Tools'

const styles = StyleSheet.create({
    alert: {
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    alertText: {
        textAlign: 'center',
        fontStyle: 'italic',
        fontSize: 12,
        lineHeight: 20,
        color: '#f30'
    },
})
const alertText = '⚠️请按正确的顺序填写或粘贴助记词⚠️'
export default class Open extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mnemonic: '',
            top: new Animated.Value(0),
            shakeLeft: new Animated.Value(global.screenWidth * 0.05),
            alertText: alertText,
            borderColor: '#999',
            buttonDisable: false,
            keyBoardHeight: 0,
        }
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
            keyBoardHeight:keyboardHeight
        })
        this.handleKeybordMargin('up')
    }

    _keyboardWillHide(e) {
        let keyboardHeight = e.endCoordinates.height;
        this.setState({
            keyBoardHeight:keyboardHeight
        })
        this.handleKeybordMargin('down')
    }
    handleType = (mnemonic) => {
        this.setState({ mnemonic: mnemonic })
    }
    handleKeybordMargin = (action) => {
        Animated.timing(this.state.top, {
            toValue: action === 'up' ? -50 : 0,
            duration: 200
        }).start()
    }
    next = () => {
        let mnemonic = this.state.mnemonic
        if (mnemonic === '') {
            this.setState({
                borderColor: '#f30',
                alertText: '⚠️请填写助记词⚠️',
                buttonDisable: true
            })
            this.shake()
        } else if (!validateMnemonic(mnemonic)) {
            this.setState({
                borderColor: '#f30',
                alertText: '⚠️助记词不正确⚠️',
                buttonDisable: true
            })
            this.shake()
        } else {
            Keyboard.dismiss()
            this.props.setMnemonic(mnemonic)
            this.props.turnPage(1)
        }
    }
    onFocus = () => {
        Clipboard.getString().then((content)=>{
            if (content !== '') {
                if (validateMnemonic(content)){
                    this.setState({mnemonic: content})
                }
            }
        })
    }
    render() {
        const { navigate } = this.props.navigation
        return (
            <View style={{ flexDirection: 'column' }}>
                <MyButton
                    text='<'
                    screenWidth={25}
                    height={26}
                    backgroundColor='#fff'
                    backgroundDarker='#666'
                    textColor='#000'
                    borderColor='#666'
                    borderWidth={1}
                    raiseLevel={2}
                    borderRadius={25}
                    style={{ margin: global.screenWidth * 0.05 }}
                    textSize={10}
                    onPress={() => navigate('WelcomeNav')}
                />
                <Animated.View style={{
                    marginLeft: this.state.shakeLeft,
                    marginRight: global.screenWidth * 0.05,
                    width: global.screenWidth * 0.9,
                    marginTop: this.state.top
                }}>
                    <MyCard
                        screenWidth={global.screenWidth * 0.9}
                        margin={0}
                        top={0}
                    >
                        <Title titleText='导入助记词' />
                        <MyTextArea
                            handleType={this.handleType}
                            handleKeybordMargin={this.handleKeybordMargin}
                            borderColor={this.state.borderColor}
                            onFocus={this.onFocus}
                            value={this.state.mnemonic}
                            borderColorActive='#390'
                        />
                        <View style={styles.alert}>
                            <Text style={styles.alertText}>{this.state.alertText}</Text>
                        </View>
                        <MyButton
                            screenWidth={global.screenWidth * 0.9 - 30}
                            onPress={() => this.next()}
                            text='下一步'
                            height={50}
                            backgroundColor='#6f0'
                            backgroundDarker='#390'
                            textColor='#000'
                            borderColor='#390'
                            borderWidth={1}
                            textSize={20}
                            disabled={this.state.buttonDisable}
                        />
                    </MyCard>
                </Animated.View>
            </View>
        )
    }
}