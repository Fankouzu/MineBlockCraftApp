import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import { ethers } from 'ethers'
import MyButton from '../Components/MyButton'
import { I18n } from '../../i18n'
import Jazzicon from '@novaviva/react-native-jazzicon'
import Icon from 'react-native-vector-icons/Fontisto'
import { ScrollView, TextInput } from 'react-native-gesture-handler'

function Messages(props) {
    return (props.fromAddress.toLowerCase() !== props.myAddress.toLowerCase() ?
        (<View style={styles.Recive}>
            <View style={styles.jazzIcon}><Jazzicon size={40} address={props.fromAddress} /></View>
            <View style={{ width: global.screenWidth * 0.65, position: 'relative', flexDirection: 'row' }}>
                <Icon name="caret-left" size={14} color={'#fff'} style={styles.arrow} />
                <Text style={styles.message}>
                    {props.message}
                </Text>
            </View>
        </View>
        ) : (<View style={styles.Send}>
            <View style={[styles.Booble, { justifyContent: 'flex-end', width: global.screenWidth * 0.65 }]}>
                <Text style={[styles.message, { backgroundColor: '#6ef65b' }]}>
                    {props.message}
                </Text>
                <Icon name="caret-right" size={14} color={'#6ef65b'} style={styles.arrow} />
            </View>
            <View style={styles.jazzIcon}><Jazzicon size={40} address={props.fromAddress} /></View>
        </View>))
}

class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            toAddress: '',
            address: '',
            messages: [],
            ViewHeight: global.screenHeight,
            typeMsg:''
        }
    }

    componentDidMount = async () => {
        const toAddress = this.props.navigation.getParam('toUser')
        let profile = await this.props.WalletMain.contract.getProfile(toAddress)
        let messages = await this.props.WalletMain.contract.getMessages(toAddress)
        const { accounts, currentAccount } = this.props.WalletReducer

        this.setState({
            title: profile[0] === '' ? toAddress : profile[0],
            messages: messages,
            toAddress: toAddress,
            address: accounts[currentAccount].address
        })

        // this._didFocusSubscription = this.props.navigation.addListener('didFocus',
        //     () => {
        //     }
        // )
        this._keyboardWillShowSubscription = Keyboard.addListener('keyboardDidShow', (e) => this._keyboardWillShow(e))
        this._keyboardWillHideSubscription = Keyboard.addListener('keyboardDidHide', (e) => this._keyboardWillHide(e))
        setTimeout(() => {
            this.ScrollView.scrollToEnd({ animated: true })
        }, 300)
    }

    componentWillUnmount = () => {
        this._keyboardWillShowSubscription.remove()
        this._keyboardWillHideSubscription.remove()
        this.setState = (state, callback) => {
            return
        }
        // this._didFocusSubscription.remove()
    }
    _keyboardWillShow(e) {
        let keyboardHeight = e.endCoordinates.height
        this.setState({
            ViewHeight: this.state.ViewHeight - keyboardHeight
        })
    }

    _keyboardWillHide(e) {
        this.setState({
            ViewHeight: global.screenHeight
        })
    }
    onBlur = () => {
        this.ScrollView.scrollToEnd()
    }
    onFocus = () => {
        setTimeout(() => {
            this.ScrollView.scrollToEnd()
        }, 200)
    }
    onSubmit = () => {
        const {address,toAddress,typeMsg,messages} = this.state
        var timestamp = parseInt((new Date()).valueOf()/1000,16)
        if(address !== '' && typeMsg !== ''){
            this.setState({typeMsg:''})
            Keyboard.dismiss()
            messages.push([{_hex:timestamp},typeMsg,address,toAddress])
            this.setState({messages:messages})
            var messageId = messages.length -1
            this.props.WalletMain.contract.sendMsg(toAddress, typeMsg, {
                "gasLimit": 300000,
                "gasPrice": ethers.utils.parseUnits('1.0', 'gwei')
            }).then((tx)=>{
                console.log('tx', tx)
            }).catch(err => {
                console.log('sendMsgErr', err)
                //this.props.navigation.navigate('WelcomeNav', { page: 1 })
            })
        }
    }
    render() {
        const { navigate } = this.props.navigation
        return (
            <View style={{ position: 'relative', justifyContent: 'flex-end' }}>
                <View style={styles.TopBar}>
                    <TouchableOpacity
                        onPress={() => { navigate('MainScreen') }}
                        style={styles.left}>
                        <Icon name="angle-left" size={14} color={'#666'} />
                    </TouchableOpacity>
                    <View style={styles.title}>
                        <Text numberOfLines={1} style={styles.titleTxt}>{this.state.title}</Text>
                    </View>
                </View>
                <View style={styles.Middle}>
                    <View style={{ height: this.state.ViewHeight - 22, paddingTop: 90 }}>
                        <ScrollView
                            contentContainerStyle={styles.ScrollView}
                            ref={(ref) => this.ScrollView = ref}
                        >
                            {this.state.messages.map((item, index) => {
                                return (<Messages
                                    myAddress={this.state.address}
                                    fromAddress={item[2]}
                                    toAddress={item[3]}
                                    message={item[1]}
                                    loading={item[4]}
                                />)
                            })}
                        </ScrollView>
                    </View>
                    <View style={styles.Bottom}>
                        <TextInput
                            style={styles.Input}
                            onChangeText={(typeMsg) => { this.setState({typeMsg:typeMsg}) }}
                            onFocus={() => { this.onFocus() }}
                            onBlur={() => { this.onBlur() }}
                            value={this.state.typeMsg}
                            placeholder={''}
                        />
                        <MyButton
                            screenWidth={50}
                            text={I18n.t('Send')}
                            height={35}
                            backgroundColor='#6f0'
                            backgroundDarker='#390'
                            textColor='#000'
                            borderColor='#390'
                            raiseLevel={2}
                            textSize={14}
                            textFont={''}
                            borderRadius={20}
                            borderWidth={1}
                            onPress={() => { this.onSubmit() }}
                            style={styles.SendBtn}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    TopBar: {
        height: 45,
        flexDirection: 'row',
        backgroundColor: '#efefef',
        width: '100%',
        borderBottomWidth: 0.5,
        borderBottomColor: '#ddd',
        position: 'absolute',
        top: 0,
        zIndex: 1
    },
    left: {
        height: 45,
        width: 40,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1
    },
    title: {
        height: 45,
        width: '100%',
    },
    titleTxt: {
        height: 45,
        textAlign: 'center',
        textAlignVertical: 'center',
        paddingHorizontal: 40,
        overflow: 'hidden'
    },
    Middle: {
        backgroundColor: '#ededed',
    },
    Bottom: {
        height: 45,
        flexDirection: 'row',
        backgroundColor: '#fefefe',
        width: '100%',
        borderTopWidth: 0.5,
        borderTopColor: '#ddd',
        paddingHorizontal: 10,
    },
    Input: {
        flex: 1,
        height: 35,
        borderRadius: 20,
        marginVertical: 5,
        backgroundColor: '#dadada',
        lineHeight: 30,
        paddingVertical: 4,
        paddingHorizontal: 10,
        marginRight: 10
    },
    SendBtn: {
        marginVertical: 5
    },
    ScrollView: {
        justifyContent: 'flex-start',
    },
    jazzIcon: {
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    address: {
        width: 110,
        fontSize: 10,
        lineHeight: 12,
        height: 12,
        fontFamily: 'InputMono Light',
        color: '#666',
        marginBottom: 4,
        marginHorizontal: 10
    },
    Recive: {
        paddingHorizontal: 10,
        width: '100%',
        flexDirection: 'row',
        marginVertical: 10,
    },
    Send: {
        paddingHorizontal: 10,
        width: '100%',
        flexDirection: 'row',
        marginVertical: 10,
        justifyContent: 'flex-end'
    },
    Booble: {
        position: 'relative',
        flexDirection: 'row'
    },
    arrow: {
        flex: 1,
        position: 'absolute',
        height: 16,
        width: 14,
        top: 5,
        zIndex: 1,
        justifyContent: 'center'
    },
    message: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 10
    },
})

const mapStateToProps = state => (state)

const mapDispatchToProps = dispatch => ({
})
export default connect(mapStateToProps, mapDispatchToProps)(Chat)