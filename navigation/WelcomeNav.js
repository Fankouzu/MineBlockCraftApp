import React from 'react'
import { Animated } from 'react-native'
import Copyright from '../components/Copyright'
import MyBackground from '../components/MyBackground'
import Welcome from '../screen/Welcome'
import OpenWallet from '../screen/OpenWallet'

export default class Open extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            password: '',
            checked: false,
            leftAnim: new Animated.Value(0),
            page: 0,
            encrypt: ''
        }
    }
    componentDidMount() {
        global.storage.load({
            key: 'wallet',
        }).then(ret => {
            global.wallet = ret
            this.setState({ encrypt: ret.encrypt })
        }).catch(err => {
            global.wallet = {
                encrypt:null,
                accounts: [{address:'0x0',balance:0}],
                currentAccount:0,
                networkId:0
            }
            this.setState({ encrypt: null })
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
                    this.setState({password:'',encrypt: global.wallet.encrypt })
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
                        encrypt={this.state.encrypt}
                    ></Welcome>
                    <OpenWallet
                        turnPage={this.turnPage}
                        navigation={this.props.navigation}
                        handleSubmit={this.handleSubmit}
                        encrypt={this.state.encrypt}
                    >
                    </OpenWallet>
                </Animated.View>
                <Copyright />
            </MyBackground>
        )
    }
}