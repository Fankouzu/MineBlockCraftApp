import React from 'react'
import {
    View,
    Animated,
    Keyboard,
    Clipboard,
} from 'react-native'
import {connect} from 'react-redux'
import * as actions from '../../actions'
import MyTextArea from './Components/MyTextArea'
import MyButton from '../Components/MyButton'
import MyBackButton from '../Components/MyBackButton'
import MyCard from '../Components/MyCard'
import Title from '../Components/Title'
import AlertText from '../Components/AlertText'
import { validateMnemonic } from '../../utils/Tools'
import { I18n,countryCode } from '../../i18n'

const alertText = [I18n.t('ImportMnemonicAlertTxt1')]
class ImportMnemonic extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
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
            keyBoardHeight:keyboardHeight,
        })
        this.handleKeybordMargin('up')
    }

    _keyboardWillHide(e) {
        let keyboardHeight = e.endCoordinates.height;
        this.setState({
            keyBoardHeight:keyboardHeight,
        })
        this.handleKeybordMargin('down')
    }
    handleType = (mnemonic) => {
        this.props.setImportMnemonic(mnemonic)
    }
    handleKeybordMargin = (action) => {
        Animated.timing(this.state.top, {
            toValue: action === 'up' ? -50 : 0,
            duration: 200,
        }).start()
    }
    next = () => {
        let mnemonic = this.props.LoginReducer.useMnemonic
        if (mnemonic === '') {
            this.setState({
                borderColor: '#f30',
                alertText: [I18n.t('ImportMnemonicAlertTxt2')],
                buttonDisable: true,
            })
            this.shake()
        } else if (!validateMnemonic(mnemonic)) {
            this.setState({
                borderColor: '#f30',
                alertText: [I18n.t('ImportMnemonicAlertTxt3')],
                buttonDisable: true,
            })
            this.shake()
        } else {
            Keyboard.dismiss()
            this.props.setImportMnemonic(mnemonic)
            this.props.turnPage(1)
        }
    }
    onFocus = () => {
        Clipboard.getString().then((content)=>{
            if (content !== '') {
                if (validateMnemonic(content)){
                    this.props.setImportMnemonic(content)
                }
            }
        })
    }
    render() {
        const { navigate } = this.props.navigation
        return (
            <View style={{ flexDirection: 'column' }}>
                <MyBackButton
                    onPress={() => navigate('WelcomeNav')}
                />
                <Animated.View style={{
                    marginLeft: this.state.shakeLeft,
                    marginRight: global.screenWidth * 0.05,
                    width: global.screenWidth * 0.9,
                    marginTop: this.state.top,
                }}>
                    <MyCard
                        screenWidth={global.screenWidth * 0.9}
                        margin={0}
                        top={0}
                    >
                        <Title titleText={I18n.t('ImportMnemonic')} fontSize={countryCode === 'CN' ? 30 : 26}/>
                        <MyTextArea
                            handleType={this.handleType}
                            handleKeybordMargin={this.handleKeybordMargin}
                            borderColor={this.state.borderColor}
                            onFocus={this.onFocus}
                            value={this.props.LoginReducer.useMnemonic}
                            borderColorActive="#390"
                        />
                        <AlertText
                            alertText={this.state.alertText}
                        />
                        <MyButton
                            screenWidth={global.screenWidth * 0.9 - 30}
                            onPress={() => this.next()}
                            text={I18n.t('NextStep')}
                            height={50}
                            backgroundColor="#6f0"
                            backgroundDarker="#390"
                            textColor="#000"
                            borderColor="#390"
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
const mapStateToProps = state => (state)

const mapDispatchToProps = dispatch => ({
    setImportMnemonic: (value) => dispatch(actions.setImportMnemonic(value)),
})
export default connect(mapStateToProps, mapDispatchToProps)(ImportMnemonic)
