import React, {Component} from 'react'
import {Text, StyleSheet, View, Keyboard} from 'react-native'
import { connect } from 'react-redux'
import { ethers } from 'ethers'
import MyButton from '../Components/MyButton'
import Topbar from '../Components/Topbar'
import { ImageBackground } from 'react-native'
import { I18n } from '../../i18n'
import Jazzicon from '@novaviva/react-native-jazzicon'
import Icon from 'react-native-vector-icons/Fontisto'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { getENS } from '../../utils/Tools'


class Ens extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            toAddress: '',
            address: '',
            messages: [],
            ViewHeight: global.screenHeight,
            typeMsg: '',
        }
    }

    componentDidMount = async () => {
        const { accounts, currentAccount,networkId} = this.props.WalletReducer

        // this._keyboardWillShowSubscription = Keyboard.addListener('keyboardDidShow', (e) => this._keyboardWillShow(e))
        // this._keyboardWillHideSubscription = Keyboard.addListener('keyboardDidHide', (e) => this._keyboardWillHide())

        const ens = getENS(networkId)
        console.log('getENS()',ens)
        ens.resolver('foo.eth').addr().then(function(addr) {
            console.log('addr',addr)
         })
    }

    componentWillUnmount = () => {
        // this._keyboardWillShowSubscription.remove()
        // this._keyboardWillHideSubscription.remove()
        this.setState = () => {
            return
        }
        // this._didFocusSubscription.remove()
    }
    render() {
        const { navigate } = this.props.navigation
        return (
            <View style={{ position: 'relative', justifyContent: 'flex-end' }}>
                <Topbar
                    onPress={() => { navigate('MainScreen') }}
                    titleTxt={this.state.title}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    
})

const mapStateToProps = state => (state)

const mapDispatchToProps = () => ({
})
export default connect(mapStateToProps, mapDispatchToProps)(Ens)
