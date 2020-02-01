import React from 'react'
import { ImageBackground, Animated } from 'react-native'
import Copyright from '../components/Copyright'
import Welcome from '../screen/Welcome'
import OpenWallet from '../screen/OpenWallet'
import { aesDecrypt, sha1 } from '../utils/Aes'
import { validateMnemonic } from '../utils/Tools'

export default class Open extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            password: '',
            checked: false,
            leftAnim: new Animated.Value(0),
            page:0
        }
    }
    componentDidMount() {
    }

    handleSubmit = (password,checked) => {
        console.log('password',password)
        global.storage.load({
            key: 'encrypt',
        }).then(ret => {
            var mnemonic = aesDecrypt(ret.encrypt, sha1(password))
            var bool = validateMnemonic(mnemonic)
            console.log(bool)
        }).catch(err => {
            console.warn(err.message)
            switch (err.name) {
                case 'NotFoundError':
                    break
                case 'ExpiredError':
                    break
            }
        })
    }
    turnPage = (index) => {
        Animated.timing(this.state.leftAnim, {
            toValue: global.screenWidth * (this.state.page + index) * -1,
            duration: 200
        }).start(()=>{
            this.setState({ page:this.state.page + index })
        })
    }
    render() {
        return (
            <ImageBackground 
            source={require('../assets/welcome3x.png')} 
            style={{ width: '100%', height: '100%' }}>
                <Animated.View style={{
                    marginLeft:this.state.leftAnim,
                    flexDirection: 'row',
                }}>
                    <Welcome
                        turnPage={this.turnPage}
                    ></Welcome>
                    <OpenWallet
                        turnPage={this.turnPage}
                        navigation={this.props.navigation}
                        handleSubmit={this.handleSubmit}
                    >
                    </OpenWallet>
                </Animated.View>
                <Copyright />
            </ImageBackground>
        )
    }
}