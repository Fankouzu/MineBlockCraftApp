import React from 'react'
import {
    ActivityIndicator,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native'
import {connect} from 'react-redux'
import * as actions from '../actions'

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
                    if (ret.address) {
                        this.props.navigation.navigate('WalletNav')
                    }else{
                        this.props.navigation.navigate('LoginNav')
                    }
                }).catch(err => {
                    this.props.navigation.navigate('LoginNav')
                })
            }else {
                this.props.navigation.navigate('LoginNav')
            }
        }).catch(err => {
            this.props.navigation.navigate('LoginNav')
        })

        
    }
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size={60} />
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
export default connect(mapStateToProps,mapDispatchToProps)(AuthLoading)
