import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    Animated
} from 'react-native'
import MyCard from '../components/MyCard'
import MyButton from '../components/MyButton'
import MyTextInput from '../components/MyTextInput'
import Title from '../components/Title'
import { checkPasswordLevel } from '../utils/Tools'
import Modal from "react-native-modal"

const styles = StyleSheet.create({
    alert: {
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    alertText: {
        textAlign: 'left',
        fontStyle: 'italic',
        fontSize: 12,
        lineHeight: 20,
        color: '#f30'
    },
    modalView:{
        flex: 0 ,
        backgroundColor:'white',
        borderRadius:10,
        alignItems: 'center',
        paddingTop:10
    }
})

var alertText = ['⚠️密码只保存在你的手机记忆中，不会发送到服务器', '⚠️密码一旦丢失请通过助记词找回钱包']
export default class Open extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            shakeLeft: new Animated.Value(global.screenWidth * 0.05),
            borderColor: '#999',
            password: '',
            passwordConfirm: '',
            alertText: alertText,
            buttonDisable: false,
            isModalVisible: false
        }
    }
    componentDidMount() {
    }
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return
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
                this.props.Wallet(this.state.password)
                this.setState({
                    borderColor: '#999',
                    alertText: alertText,
                    buttonDisable: false
                })
            }
        }

    }
    handleTypePassword = (password) => {
        this.setState({ password: password })
    }
    handleTypePasswordConfirm = (passwordConfirm) => {
        this.setState({ passwordConfirm: passwordConfirm })
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
                    onPress={() => this.props.turnPage(-1)}
                />
                <Animated.View style={{
                    marginLeft: this.state.shakeLeft
                }}>
                    <MyCard
                        screenWidth={global.screenWidth * 0.9}
                        margin={0}
                        top={0}
                        padding={10}
                    >
                        <Title titleText='输入密码' />
                        <MyTextInput
                            handleTypePassword={(password) => this.handleTypePassword(password)}
                            handleKeybordMargin={() => { }}
                            borderColor={this.state.borderColor}
                            borderColorActive='#390'
                            placeholder='输入密码'
                        />
                        <MyTextInput
                            handleTypePassword={(password) => this.handleTypePasswordConfirm(password)}
                            handleKeybordMargin={() => { }}
                            borderColor={this.state.borderColor}
                            borderColorActive='#390'
                            placeholder='确认密码'
                        />
                        <View style={styles.alert}>
                            {this.state.alertText.map((item, index) => {
                                return (
                                    <Text style={styles.alertText} key={index}>
                                        {item}
                                    </Text>
                                )
                            })}
                        </View>
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
                <Modal isVisible={this.props.isModalVisible}>
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
                            onPress={() => navigate('WelcomeNav',{page:1})}
                        />
                    </View>
                </Modal>
            </View>
        )
    }
}