import React, { Component } from 'react'
import {connect} from 'react-redux'
import * as actions from '../actions'
import { Text, StyleSheet, View, Animated, TouchableOpacity } from 'react-native'
import Modal from "react-native-modal"
import MyCard from './MyCard'
import Title from './Title'
import MyTextInput from './MyTextInput'
import AlertText from './AlertText'
import MyButton from './MyButton'
import { aesDecrypt, sha1 } from '../utils/Aes'
import { validateMnemonic } from '../utils/Tools'


class PasswordModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shakeLeft: new Animated.Value(0),
            password: '',
            alertText: [],
            borderColor: '#999',
            buttonDisable: false,
            top: new Animated.Value(-150)
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
        Animated.timing(this.state.top, {
            toValue: action === 'up' ? 0 : -150,
            duration: 200
        }).start()
    }
    handleTypePassword = (password) => {
        this.setState({ password: password })
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
            let password = this.state.password
            let encrypt = this.props.WalletReducer.encrypt
            let mnemonic = aesDecrypt(encrypt, sha1(password))
            if (validateMnemonic(mnemonic)) {
                this.setState({ password: '' })
                this.props.passwordAction(mnemonic)
            } else {
                this.setState({
                    borderColor: '#F30',
                    alertText: ['⚠️密码错误'],
                    buttonDisable: true
                })
                this.shake()
            }
        }
        next()
    }
    render() {
        return (
            <Modal isVisible={this.props.WalletMain.isPasswordModalVisible}>
                <Animated.View style={{
                    marginLeft: this.state.shakeLeft,
                }}>
                    <MyCard
                        screenWidth={global.screenWidth * 0.9}
                        margin={0}
                        top={0}
                    >
                        <Title titleText='打开钱包' />
                        <MyTextInput
                            handleTypePassword={this.handleTypePassword}
                            handleKeybordMargin={this.handleKeybordMargin}
                            placeholder='输入密码'
                            borderColor={this.state.borderColor}
                            borderColorActive='#390'
                            buttonDisable={this.state.buttonDisable}
                            focus={true}
                        />
                        <AlertText
                            alertText={this.state.alertText}
                            textAlign='left'
                        />
                        <MyButton
                            screenWidth={global.screenWidth * 0.9 - 30}
                            onPress={(next) => { this.handleSubmit(next) }}
                            text='添加账户'
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
                            <TouchableOpacity onPress={() => { this.props.setPasswordModalVisiable(false) }}>
                                <Text style={styles.bottomLink}>取消</Text>
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
    setPasswordModalVisiable: (value) => dispatch(actions.setPasswordModalVisiable(value))
})
export default connect(mapStateToProps,mapDispatchToProps)(PasswordModal)