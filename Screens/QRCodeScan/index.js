import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native';
import { QRScannerView } from 'react-native-qrcode-scanner-view'
import isEthereumAddress from 'is-ethereum-address'
import Icon from 'react-native-vector-icons/SimpleLineIcons'

export default class DefaultScreen extends Component {

    renderTitleBar = () => {
        const { navigate } = this.props.navigation
        return (
            <TouchableOpacity onPress={() => navigate('Send')} style={{flex:1,alignItems:'center',height:150,justifyContent:'center'}}>
            <Icon name='close' size={50} color='#ccc'  />
           </TouchableOpacity>
        )
    }

    barcodeReceived = (event) => {
        if(event.type==='QR_CODE'){
            let toAddress=event.data.replace(/ethereum:/g,'')
            if (isEthereumAddress(toAddress)) {
                const { navigate } = this.props.navigation
                navigate('Send',{toAddress:toAddress,test:1})
            }
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <QRScannerView
                    onScanResult={this.barcodeReceived}
                    renderHeaderView={this.renderTitleBar}
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
}