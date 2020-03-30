import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native';
import { QRScannerView } from 'react-native-qrcode-scanner-view'
import isEthereumAddress from 'is-ethereum-address'
import Icon from 'react-native-vector-icons/SimpleLineIcons'

export default function QRCodeScan (props) {

    const { navigate } = props.navigation
    const back = props.navigation.getParam('back')
    const renderTitleBar = () => {
        return (
            <TouchableOpacity onPress={() => navigate(back)} style={{flex:1,alignItems:'center',height:150,justifyContent:'center'}}>
            <Icon name='close' size={50} color='#ccc'  />
           </TouchableOpacity>
        )
    }

    const barcodeReceived = (event) => {
        if(event.type==='QR_CODE'){
            let toAddress=event.data.replace(/ethereum:/g,'')
            if (isEthereumAddress(toAddress)) {
                navigate(back,{toAddress:toAddress,test:1})
            }
        }
    }

        return (
            <View style={{ flex: 1 }}>
                <QRScannerView
                    onScanResult={(event) =>barcodeReceived(event)}
                    renderHeaderView={() => renderTitleBar()}
                    scanBarAnimateReverse={true}
                    cornerStyle={{
                        height: 25,
                        width: 25,
                        borderWidth: 2,
                        borderColor: '#390'
                    }}
                    rectStyle={{
                        height: 200,
                        width: 200
                    }}
                />
            </View>
        )
    }