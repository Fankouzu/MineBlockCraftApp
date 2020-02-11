import React from 'react'
import {
    Text,
    View,
    Clipboard,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import isEthereumAddress from 'is-ethereum-address'
import { TextField } from 'react-native-material-textfield'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function SendInput(props) {
    const [toAddress, setToAddress] = React.useState(props.toAddress)
    const fieldRef = React.useRef()
    const addressErrorTxt = '以太坊地址错误！'
    const { ethprice } = props
    React.useEffect(() => {
        setToaddress(props.toAddress)
    }, [props.toAddress])

    const [addressError, setAddressError] = React.useState(props.addressError)
    React.useEffect(() => {
        setAddressError(props.addressError)
    }, [props.addressError])

    const [amount, setAmount] = React.useState(props.amount)
    React.useEffect(() => {
        setAmount(props.amount)
    }, [props.amount])
    const typeAmount = (amount) => {
        setAmount(amount)
    }

    const [balance, setBalance] = React.useState(props.balance)
    React.useEffect(() => {
        setBalance(props.balance)
    }, [props.balance])

    const setToaddress = (toAddress) => {
        setToAddress(toAddress)
        fieldRef.current.setValue(toAddress)
    }
    const onFocus = () => {
        Clipboard.getString().then((content) => {
            if (content !== '') {
                if (isEthereumAddress(content)) {
                    setToAddress(content)
                }
            }
        })
    }
    return (
        <View>
            <TextField
                ref={fieldRef}
                onChangeText={(toAddress) => setToaddress(toAddress)}
                onFocus={onFocus}
                value={toAddress}
                error={addressError}
                label='目标地址:'
                labelFontSize={16}
                labelTextStyle={[styles.labelTextStyle, { top: -28 }]}
                baseColor='#666'
                placeholder='输入目标地址'
                tintColor='#390'
                keyboardType='default'
                inputContainerStyle={styles.inputContainerStyle}
                containerStyle={{ marginBottom: 30, marginTop: 10 }}
                fontSize={16}
                multiline={true}
                animationDuration={100}
                errorColor='#f30'
                titleTextStyle={{ paddingLeft: 5 }}
                renderRightAccessory={() => {
                    return (
                        <TouchableOpacity
                            onPress={() => props.navigate('QRCodeScan')}
                            style={{ top: -40 }}
                        >
                            <Icon
                                name='qrcode-scan'
                                size={18}
                                color='#390'
                                style={{ marginRight: 5 }}
                            />
                        </TouchableOpacity>
                    )
                }}
            />
            <TextField
                value={amount}
                onChangeText={(amount) => typeAmount(amount)}
                label='发送数量:'
                labelFontSize={16}
                labelTextStyle={[styles.labelTextStyle, { top: -40 }]}
                baseColor='#666'
                placeholder='0'
                tintColor='#390'
                keyboardType='numeric'
                inputContainerStyle={[styles.inputContainerStyle,{marginBottom:10}]}
                fontSize={18}
                animationDuration={100}
                renderRightAccessory={() => {
                    return (
                        <View style={{ height: 70 }}>
                            <Text
                                style={[
                                    styles.balancePrice,
                                    {
                                        marginBottom: 35
                                    }]}>
                                余额：{balance} Ether
                            </Text>
                            <Text
                                style={
                                    styles.balancePrice
                                }>
                                ≈ $ {Math.round(amount * ethprice * 100) / 100}
                            </Text>
                        </View>
                    )
                }}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    labelTextStyle: {
        height: 24,
        paddingTop: 5,
    },
    inputContainerStyle: {
        height: 60, 
        paddingLeft: 5
    },
    balancePrice: {
        color: '#666',
        fontSize: 10,
        lineHeight: 15,
        textAlign: 'right',
    }
})