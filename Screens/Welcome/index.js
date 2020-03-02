import React from 'react'
import { Animated } from 'react-native'
import {connect} from 'react-redux'
import * as actions from '../../actions'
import Copyright from '../Components/Copyright'
import MyBackground from '../Components/MyBackground'
import Welcome from './Welcome'
import OpenWallet from './OpenWallet'

class WelcomeNav extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            leftAnim: new Animated.Value(0),
            page: 0,
        }
    }
    componentDidMount() { 
        global.storage.load({
            key: 'wallet',
        }).then(ret => {
            console.log('welcomeNav:ret:',ret)
            if (ret.encrypt) {
                this.props.setEncrypt(ret.encrypt)
            }else {
                this.props.setEncrypt('')
            }
        }).catch(err => {
            this.props.setEncrypt('')
            switch (err.name) {
                case 'NotFoundError':
                    break
                case 'ExpiredError':
                    break
            }
        })
        this._didFocusSubscription = this.props.navigation.addListener('didFocus',
            () => {
                const page = this.props.navigation.getParam('page', 0)
                if (page > 0 && this.state.page === 0) {
                    this.turnPage(1)
                }
            }
        )
    }

    componentDidUpdate() {
    }
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return
        }
        this._didFocusSubscription.remove()
    }
    turnPage = (index) => {
        Animated.timing(this.state.leftAnim, {
            toValue: global.screenWidth * (this.state.page + index) * -1,
            duration: 200
        }).start(() => {
            this.setState({ page: this.state.page + index })
        })
    }
    render() {
        return (
            <MyBackground>
                <Animated.View style={{
                    marginLeft: this.state.leftAnim,
                    flexDirection: 'row',
                }}>
                    <Welcome
                        turnPage={this.turnPage}
                        navigation={this.props.navigation}
                    />
                    <OpenWallet
                        turnPage={this.turnPage}
                        navigation={this.props.navigation}
                        handleSubmit={this.handleSubmit}
                    />
                </Animated.View>
                <Copyright />
            </MyBackground>
        )
    }
}
const mapStateToProps = state => (state)

const mapDispatchToProps = dispatch => ({
    setEncrypt: (value) => dispatch(actions.setEncrypt(value)),
})
export default connect(mapStateToProps,mapDispatchToProps)(WelcomeNav)