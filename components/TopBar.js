import React from 'react'
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native'
import AwesomeButton from 'react-native-really-awesome-button'
import MyButton from '../components/MyButton'
import { networks } from '../utils/networks'
import Jazzicon from '@novaviva/react-native-jazzicon'

export default function TopBar(props) {
    const [networkId, setNetworkId] = React.useState(props.networkId)
    React.useEffect(() => {
        setNetworkId(props.networkId)
    }, [props.networkId])

    const [accounts, setAccounts] = React.useState(props.accounts)
    React.useEffect(() => {
        setAccounts(props.accounts)
    }, [props.accounts])

    const [currentAccount, setCurrentAccount] = React.useState(props.currentAccount)
    React.useEffect(() => {
        setCurrentAccount(props.currentAccount)
    }, [props.currentAccount])

    const [currentAddress, setCurrentAddress] = React.useState('0x0')
    React.useEffect(() => {
        if (accounts.length > 0) {
            setCurrentAddress(accounts[currentAccount].address)
        }
    }, [accounts, currentAccount])

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
                    borderWidth={0.5}
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
                    text={'🔗' + networks[networkId].nameCN}
                    backgroundColor='#fc0'
                    backgroundDarker='#960'
                    backgroundActive='#ff0'
                    textColor='#333'
                    borderColor='#960'
                    borderWidth={1}
                    textSize={12}
                    letterSpacing={0}
                    onPress={() => { props.handleOpenNetSelect(true) }}
                />
            </View>
            <TouchableOpacity onPress={props.openControlPanel}>
                <View
                    style={{
                        height: 30,
                        width: global.screenWidth * 0.15,
                        paddingRight: 15,
                        alignItems: 'flex-end'
                    }}
                >
                    <View style={styles.JazziconView}>
                        <Jazzicon size={28} address={currentAddress} />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    topView: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 15,
        height: 50,
        flex: 0
    },
    JazziconView: {
        borderWidth: 0.5,
        borderColor: '#333',
        borderRadius: 16,
        width: 32,
        height: 32,
        padding: 1.5,
        backgroundColor: '#fff'
    }
})
