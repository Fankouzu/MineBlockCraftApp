import React from 'react'
import { ImageBackground, Animated } from 'react-native'
import ImportMnemonic from '../screen/ImportMnemonic'
import Password from '../screen/Password'
import Copyright from '../components/Copyright'

export default class Open extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            password: '',
            checked: false,
            leftAnim: new Animated.Value(0),
            page:0,
            mnemonic:''
        }
    }
    componentDidMount() {
        this.turnPage(0)
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
                        mnemonic={this.state.mnemonic}
                    />
                </Animated.View>
                <Copyright />
            </ImageBackground>
        )
    }
}