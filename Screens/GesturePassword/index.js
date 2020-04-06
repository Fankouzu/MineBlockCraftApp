import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import OkGesturePassword from 'react-native-ok-gesture-password'
import MyBackground from '../Components/MyBackground'
import LinearGradient from 'react-native-linear-gradient'
import SecurityCode from '../../assets/SecurityCode.svg'
import Title from '../Components/Title'
import { aesEncrypt, sha1 } from '../../utils/Aes'
import { I18n } from '../../i18n'

class GesturePassword extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            message: 'Please input your password.',
            status: 'normal',
            step: 0,
            GestureTitle: I18n.t('GestureTitle1'),
            gPassword: '',
            isWarning: false,
            statusStorage: {},
            verify: true,
            wrongTimes:0,
        }
    }
    componentDidMount() {
        global.storage.load({
            key: 'status',
        }).then(ret => {
            if (ret.address && ret.password && ret.gesture === true) {
                this.setState({
                    GestureTitle: I18n.t('GestureTitle4'),
                    gPassword: ret.password,
                    step: 2,
                    statusStorage: ret,
                })
            } else {
                this.setState({
                    statusStorage: ret,
                    verify: false,
                })
            }
        }).catch(() => {
            this.props.navigation.navigate('LoginNav')
        })

    }
    componentDidUpdate() {
    }
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return
        }
    }
    Skip = () => {
        global.storage.save({
            key: 'status',
            data: {
                ...this.state.statusStorage,
                'gesture': false,
                'setGesture': false,
            },
            //手势逻辑
            //设置了:gesture=true,setGesture=true,
            //没设置:gesture=false,setGesture=true,
            //不设置:gesture=false,setGesture=false,
            expires: this.state.statusStorage.expires - (new Date()).valueOf(),
        })
        this.props.navigation.navigate('MainScreen')
    }
    Finish = (password) => {
        if (this.state.step === 0) {
            this.setState({
                GestureTitle: I18n.t('GestureTitle2'),
                gPassword: password,
                step: 1,
            })
        } else if (this.state.step === 1) {
            if (password === this.state.gPassword) {
                global.storage.load({
                    key: 'status',
                }).then(ret => {
                    if (ret.password) {
                        let gesturePassword = sha1(password + 'sugar').toString()
                        let newPassword = aesEncrypt(ret.password, gesturePassword)
                        global.storage.save({
                            key: 'status',
                            data: {
                                ...ret,
                                'password': newPassword,
                                'gesture': true,
                                'gesturePassword': gesturePassword,
                            },
                            expires: this.state.statusStorage.expires - (new Date()).valueOf(),
                        })
                        this.props.setGesture(gesturePassword)
                        this.props.navigation.navigate('MainScreen')
                    } else {
                        console.warn('Finish', ret)
                    }
                }).catch(err => {
                    console.warn('Finish', err)
                })
                this.setState({
                    GestureTitle: I18n.t('GestureTitle0'),
                    isWarning: false,
                    step: 0,
                })
            } else {
                this.setState({
                    GestureTitle: I18n.t('GestureTitle3'),
                    isWarning: true,
                    step: 0,
                })
                setTimeout(() => {
                    this.setState({
                        GestureTitle: I18n.t('GestureTitle1'),
                        isWarning: false,
                    })
                }, 1000);
            }
        } else if (this.state.step === 2) {
            if (this.state.wrongTimes > 1) {
                this.setState({
                    GestureTitle: I18n.t('GestureTitle0'),
                    isWarning: false,
                    step: 0,
                })
                this.props.navigation.navigate('WelcomeNav',{page:1})
            } else if (this.state.statusStorage.gesturePassword === sha1(password + 'sugar').toString()) {
                this.setState({
                    GestureTitle: I18n.t('GestureTitle0'),
                    isWarning: false,
                })
                this.props.navigation.navigate('MainScreen')
            } else {
                this.setState({
                    GestureTitle: I18n.t('GestureTitle5'),
                    isWarning: true,
                    wrongTimes:this.state.wrongTimes + 1,
                })
                setTimeout(() => {
                    this.setState({
                        GestureTitle: I18n.t('GestureTitle4'),
                        isWarning: false,
                    })
                }, 1000);
            }
        }
    }

    render() {
        return (
            <MyBackground style={{ alignItems: 'center' }}>
                <LinearGradient colors={['#00b33b', 'rgba(255,255,255,0.8)']}
                    style={styles.container}>
                    <View style={styles.headContent}>
                        <View style={styles.top}>
                            <View style={styles.angle}>
                                <SecurityCode width="60" height="60" />
                            </View>
                            <Title titleText={this.state.GestureTitle} style={styles.text} />
                        </View>
                    </View>
                    <OkGesturePassword
                        style={styles.gesturePassword}
                        pointBackgroundColor={'#fffa'}
                        showArrow={false}
                        color={'#fff'}
                        activeColor={'#00b33b'}
                        warningColor={'red'}
                        warningDuration={500}
                        allowCross={true}
                        lineColor={'#999'}
                        lineWidth={1}
                        onMove={(p) => { }}
                        isWarning={this.state.isWarning}
                        onFinish={(password) => {
                            this.Finish(password)
                        }}
                    />
                    {!this.state.verify && (
                        <TouchableOpacity
                            onPress={() => this.Skip()}
                        >
                            <Text style={{ color: '#390', height: 40, textAlignVertical: 'center' }}>{I18n.t('Skip')}</Text>
                        </TouchableOpacity>
                    )}
                </LinearGradient>
            </MyBackground>
        )
    }
}
const styles = StyleSheet.create({
    top: {
        height: 150,
        width: '100%',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    angle: {
        width: '100%',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gesturePassword: {
        backgroundColor: '#fff6',
        borderRadius: 20,
    },
    text: {
        height: 50,
        lineHeight: 50,
    },
    headContent: {
        justifyContent: 'flex-start', flexDirection: 'row',
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
})
const mapStateToProps = state => (state)

const mapDispatchToProps = dispatch => ({
    setGesture: (value) => dispatch(actions.setGesture(value)),
})
export default connect(mapStateToProps, mapDispatchToProps)(GesturePassword)
