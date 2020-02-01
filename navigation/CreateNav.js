import React from 'react'
import { ImageBackground, Animated } from 'react-native'
import Copyright from '../components/Copyright'
import Mnemonic from '../screen/Mnemonic'
import RandomMnemonic from '../screen/RandomMnemonic'
import Password from '../screen/Password'
import bip39 from 'react-native-bip39'
import { aesEncrypt, sha1 } from '../utils/Aes'
var chinese_simplified = require('../assets/chinese_simplified.json')

export default class Open extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            password: '',
            checked: false,
            leftAnim: new Animated.Value(0),
            mnemonic_zh: '',
            mnemonic_en: '',
            useMnemonic: '',
            lang: 'zh',
            isModalVisible: false,
            page: 0
        }
    }
    componentDidMount() {
        bip39.generateMnemonic(128, null, bip39.wordlists.EN).then((res) => {
            this.setState({ mnemonic_en: res })
        })
        bip39.generateMnemonic(128, null, chinese_simplified).then((res) => {
            this.setState({
                mnemonic_zh: res,
                useMnemonic: res
            })
            this.changeLang(0)
        })
    }
    changeLang = (index) => {
        if (index === 0) {
            this.setState({
                useMnemonic: this.state.mnemonic_zh,
                lang: 'zh'
            })
        } else {
            this.setState({
                useMnemonic: this.state.mnemonic_en,
                lang: 'en'
            })
        }
    }
    turnPage = (index) => {
        Animated.timing(this.state.leftAnim, {
            toValue: global.screenWidth * (this.state.page + index) * -1,
            duration: 200
        }).start(() => {
            this.setState({ page: this.state.page + index })
        })
    }
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return
        }
    }
    Wallet = (password) => {
        const encrypt = aesEncrypt(this.state.useMnemonic, sha1(password))
        global.storage.save({
            key: 'encrypt',
            data: { encrypt },
            expires: 1000 * 60 * 60 * 24 * 7,
        })
        this.setState({ isModalVisible: true })
    }
    render() {
        console.log(this.state.useMnemonic)
        return (
            <ImageBackground 
            source={require('../assets/welcome3x.png')} 
            style={{ width: '100%', height: '100%' }}>
                <Animated.View style={{
                    marginLeft: this.state.leftAnim,
                    flexDirection: 'row',
                }}>
                    <Mnemonic
                        navigation={this.props.navigation}
                        turnPage={this.turnPage}
                        mnemonic_zh={this.state.mnemonic_zh}
                        mnemonic_en={this.state.mnemonic_en}
                        changeLang={this.changeLang}
                    ></Mnemonic>
                    <RandomMnemonic
                        turnPage={this.turnPage}
                        lang={this.state.lang}
                        useMnemonic={this.state.useMnemonic}
                    ></RandomMnemonic>
                    <Password
                        navigation={this.props.navigation}
                        turnPage={this.turnPage}
                        Wallet={this.Wallet}
                        isModalVisible={this.state.isModalVisible}
                    ></Password>
                </Animated.View>
                <Copyright />
            </ImageBackground>
        )
    }
}