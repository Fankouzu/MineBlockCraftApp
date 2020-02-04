import React from 'react'
import { StyleSheet, ImageBackground, Image, View } from 'react-native'
import MyButton from '../components/MyButton'
import Copyright from '../components/Copyright'
import AwesomeButton from 'react-native-really-awesome-button'
import Jazzicon from '@novaviva/react-native-jazzicon'

const styles = StyleSheet.create({
    topView: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 15,
    },
})
export default class Open extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            accounts: {
                address: '0x0',
                balance: 0
            }
        }
    }
    componentDidMount() {
        global.storage.load({
            key: 'wallet',
        }).then(ret => {
            let encrypt = ret.encrypt
            global.storage.load({
                key: 'accounts',
            }).then(ret => {
                let accounts = ret.accounts
                console.log(accounts, encrypt)
                this.setState({ accounts: accounts[0] })
            }).catch(err => {
                this.props.navigation.navigate('LoginNav')
            })
        }).catch(err => {
            this.props.navigation.navigate('LoginNav')
        })
    }

    componentDidUpdate() {
    }
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return
        }
    }
    render() {
        console.log(this.state.accounts.address)
        return (
            <ImageBackground
                source={require('../assets/welcome3x.png')}
                style={{ width: '100%', height: '100%' }}>
                <View style={styles.topView}>
                    <View style={{ height: 30, width: global.screenWidth * 0.15,paddingLeft: 15 }}>
                        <AwesomeButton
                            size='small'
                            backgroundActive='#666'
                            backgroundColor='#fff'
                            backgroundDarker='#666'
                            backgroundShadow='transparent'
                            backgroundPlaceholder='#666'
                            borderColor='#666'
                            borderWidth={1}
                            activeOpacity={0.5}
                            borderRadius={16}
                            raiseLevel={2}
                            height={32}
                            width={30}
                            onPress={() => { }}
                        >
                            <Image
                                style={{ width: 30, height: 30 }}
                                source={require('../assets/eth_logo.png')}
                            />
                        </AwesomeButton>
                    </View>
                    <View style={{ height: 30, width: global.screenWidth * 0.7, paddingLeft: 15, alignItems: 'center' }}>
                        <MyButton
                            screenWidth={150}
                            height={32}
                            raiseLevel={2}
                            borderRadius={16}
                            text='🌐Mainnet主网'
                            backgroundColor='#fc0'
                            backgroundDarker='#960'
                            backgroundActive='#ff0'
                            textColor='#000'
                            borderColor='#960'
                            borderWidth={1}
                            textSize={12}
                            onPress={() => { }}
                        />
                    </View>
                    <View style={{ height: 30, width: global.screenWidth * 0.15, paddingRight: 15,alignItems: 'flex-end', }}>
                        <View style={{borderWidth:1,borderColor:'#666',borderRadius:16,width:32,height:32,padding:1,backgroundColor:'#fff'}}>
                        <Jazzicon size={28} address={this.state.accounts.address} />
                        </View>
                    </View>
                </View>
                <Copyright />
            </ImageBackground>
        )
    }
}