import React from 'react'
import { View, TouchableOpacity } from 'react-native';
import isEthereumAddress from 'is-ethereum-address'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import QRCodeScanner from 'react-native-qrcode-scanner';


export default function QRCodeScan(props) {

    const { navigate } = props.navigation
    const back = props.navigation.getParam('back')
    const renderTopContent = () => {
        return (
            <TouchableOpacity onPress={() => navigate(back)} style={{ flex: 1, alignItems: 'center', height: 150, justifyContent: 'center' }}>
                <Icon name="close" size={50} color="#ccc" />
            </TouchableOpacity>
        )
    }

    const renderBottomContent = () => {
        return (
            <View/>
        )
    }
    const barcodeReceived = (event) => {
        if (event.type === 'QR_CODE') {
            let toAddress = event.data.replace(/ethereum:/g, '')
            if (isEthereumAddress(toAddress)) {
                navigate(back, { toAddress: toAddress, test: 1 })
            }
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <QRCodeScanner
                fadeIn={false}
                onRead={(event) => barcodeReceived(event)}
                topContent={renderTopContent()}
                containerStyle={{backgroundColor:'#fff',flex:1}}
                topViewStyle={{zIndex:1,height:150,position:'absolute'}}
                cameraStyle={{height:global.screenHeight}}
                bottomContent={renderBottomContent()}
                bottomViewStyle={{position:'absolute',zIndex:1,borderColor:'#0f0',width:200,height:200,borderWidth:1,top:'50%',left:'50%',marginLeft:-100,marginTop:-100}}
            />
        </View>
    )
}
