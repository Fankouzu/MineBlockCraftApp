import React, { Component } from 'react'
import { Image,Text, StyleSheet, View } from 'react-native'
import AwesomeButton from 'react-native-really-awesome-button'
import MyButton from '../components/MyButton'
import Jazzicon from '@novaviva/react-native-jazzicon'

export default class TopBar extends Component {
    constructor(props) {
        super(props)
        this.state = { }
    }
    render() {
        return (
            <View style={styles.topView}>
                <View style={{ height: 30, width: global.screenWidth * 0.15, paddingLeft: 15 }}>
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
                        text='🔗以太坊主网络'
                        backgroundColor='#fc0'
                        backgroundDarker='#960'
                        backgroundActive='#ff0'
                        textColor='#333'
                        borderColor='#960'
                        borderWidth={1}
                        textSize={12}
                        letterSpacing={0}
                        textFont=''
                        onPress={() => { this.props.handleOpenNetSelect(true) }}
                    />
                </View>
                <View style={{ height: 30, width: global.screenWidth * 0.15, paddingRight: 15, alignItems: 'flex-end', }}>
                    <View style={{ borderWidth: 1, borderColor: '#666', borderRadius: 16, width: 32, height: 32, padding: 1, backgroundColor: '#fff' }}>
                        <Jazzicon size={28} address={this.props.accounts.address} />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    topView: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 15,
    },
})
