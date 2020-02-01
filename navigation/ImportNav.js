import React from 'react'
import { ImageBackground, Animated } from 'react-native'
import ImportMnemonic from '../screen/ImportMnemonic'
import Password from '../screen/Password'
import Copyright from '../components/Copyright'
import { aesEncrypt, sha1 } from '../utils/Aes'

export default class Open extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            password: '',
            checked: false,
            leftAnim: new Animated.Value(0),
            page:0,
            isModalVisible:false,
            mnemonic:''
        }
    }
    componentDidMount() {
        this.turnPage(0)
    }

    Wallet = (password) => {
        const encrypt = aesEncrypt(this.state.mnemonic, sha1(password))
        global.storage.save({
            key: 'encrypt',
            data: { encrypt },
            expires: 1000 * 60 * 60 * 24 * 7,
        })
        this.setState({isModalVisible:true})
    }
    turnPage = (index) => {
        Animated.timing(this.state.leftAnim, {
            toValue: global.screenWidth * (this.state.page + index) * -1,
            duration: 200
        }).start(()=>{
            this.setState({ page:this.state.page + index })
        })
    }
    setMnemonic = (mnemonic) => {
        this.setState({mnemonic:mnemonic})
    }
    render() {
        const { navigate } = this.props.navigation
        return (
            <ImageBackground 
            source={require('../assets/welcome3x.png')} 
            style={{ width: '100%', height: '100%' }}>
                <Animated.View style={{
                    marginLeft:this.state.leftAnim,
                    flexDirection: 'row',
                }}>
                    <ImportMnemonic
                        navigation={this.props.navigation}
                        turnPage={this.turnPage}
                        setMnemonic={this.setMnemonic}
                    />
                    <Password
                        navigation={this.props.navigation}
                        turnPage={this.turnPage}
                        Wallet={this.Wallet}
                        isModalVisible={this.state.isModalVisible}
                    />
                </Animated.View>
                <Copyright />
            </ImageBackground>
        )
    }
}