import React from 'react'
import {
    StatusBar,
    StyleSheet,
    View,
} from 'react-native'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { BarIndicator } from 'react-native-indicators'

class AuthLoading extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this._bootstrapAsync()
    }
    _bootstrapAsync = async () => {
        global.storage.load({
            key: 'wallet',
        }).then(ret => {
            if (ret.encrypt) {
                this.props.setWallet(ret)
                global.storage.load({
                    key: 'status',
                }).then(ret => {
                    if (ret.address && ret.password) {
                        this.props.navigation.navigate('WalletNav')
                    } else {
                        this.props.navigation.navigate('LoginNav')
                    }
                }).catch(err => {
                    this.props.navigation.navigate('LoginNav')
                })
            } else {
                this.props.navigation.navigate('LoginNav')
            }
        }).catch(err => {
            this.props.navigation.navigate('LoginNav')
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <BarIndicator count={5} size={40} color='#390' />
                <StatusBar barStyle="default" />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
const mapStateToProps = state => (state)

const mapDispatchToProps = dispatch => ({
    setWallet: (value) => dispatch(actions.setWallet(value)),
})
export default connect(mapStateToProps, mapDispatchToProps)(AuthLoading)
