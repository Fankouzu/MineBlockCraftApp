import React from 'react'
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native'

export default class AuthLoading extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this._bootstrapAsync()
    }
    _bootstrapAsync = async () => {
        global.storage.load({
            key: 'wallet',
        }).then(ret => {
            let encrypt = ret.encrypt
            global.storage.load({
                key: 'accounts',
            }).then(ret => {
                let accounts = ret.accounts
                this.props.navigation.navigate('WalletNav')
            }).catch(err => {
                this.props.navigation.navigate('LoginNav')
            })
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