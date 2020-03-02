import React from 'react'
import { Animated } from 'react-native'
import {connect} from 'react-redux'
import * as actions from '../../actions'
import Copyright from '../Components/Copyright'
import MyBackground from '../Components/MyBackground'
import Mnemonic from './Mnemonic'
import RandomMnemonic from './RandomMnemonic'
import Password from '../Password'
import { randMnemonic } from '../../utils/Tools'
import bip39 from 'react-native-bip39'
var chinese_simplified = require('../../assets/chinese_simplified.json')

class CreateNav extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            leftAnim: new Animated.Value(0),
            page: 0
        }
    }
    componentDidMount() {
        bip39.generateMnemonic(128, null, bip39.wordlists.EN).then((res) => {
            this.props.setMnemonicEn(res)
        })
        bip39.generateMnemonic(128, null, chinese_simplified).then((res) => {
            this.props.setDefaultMnemonic(res)
            this.props.setRandomMnemonic(randMnemonic(res))
        })
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
        this.props.setMnemonicEn('')
        this.props.setMnemonicCn('')
        this.props.setDefaultMnemonic('')
        this.props.setRandomMnemonic([])
        this.setState = (state, callback) => {
            return
        }
    }
    render() {
        return (
            <MyBackground>
                <Animated.View style={{
                    marginLeft: this.state.leftAnim,
                    flexDirection: 'row',
                }}>
                    <Mnemonic
                        navigation={this.props.navigation}
                        turnPage={this.turnPage}
                    ></Mnemonic>
                    <RandomMnemonic
                        turnPage={this.turnPage}
                    ></RandomMnemonic>
                    <Password
                        navigation={this.props.navigation}
                        turnPage={this.turnPage}
                    ></Password>
                </Animated.View>
                <Copyright />
            </MyBackground>
        )
    }
}
const mapStateToProps = state => (state)

const mapDispatchToProps = dispatch => ({
    setMnemonicEn: (value) => dispatch(actions.setMnemonicEn(value)),
    setMnemonicCn: (value) => dispatch(actions.setMnemonicCn(value)),
    setDefaultMnemonic: (value) => dispatch(actions.setDefaultMnemonic(value)),
    setRandomMnemonic: (value) => dispatch(actions.setRandomMnemonic(value)),
})
export default connect(mapStateToProps,mapDispatchToProps)(CreateNav)