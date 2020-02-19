import React from 'react'
import {
    Text,
    TextInput,
    View,
    Clipboard,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import isEthereumAddress from 'is-ethereum-address'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function SendInput(props) {
    const [toAddress, setToAddress] = React.useState(props.toAddress)
    const { ethprice } = props
    React.useEffect(() => {
        setToaddress(props.toAddress)
    }, [props.toAddress])

    const [addressErrorTxt, setAddressErrorTxt] = React.useState(props.addressError)
    const [amountErrorTxt, setAmountErrorTxt] = React.useState(props.amountError)
    const [addressErrorStyle, setAddressErrorStyle] = React.useState({})
    const [amountErrorStyle, setAmountErrorStyle] = React.useState({})
    React.useEffect(() => {
        if (props.addressError) {
            setAddressErrorTxt('*以太坊地址错误！')
            setAddressErrorStyle({ borderWidth: 1, borderColor: '#f30' })
        } else {
            setAddressErrorTxt('')
            setAddressErrorStyle({ borderWidth: 0, borderColor: '#fff' })
        }
    }, [props.addressError])

    React.useEffect(() => {
        if (props.amountError) {
            setAmountErrorTxt('*发送数量大于余额！')
            setAmountErrorStyle({ borderWidth: 1, borderColor: '#f30' })
        } else {
            setAmountErrorTxt('')
            setAmountErrorStyle({ borderWidth: 0, borderColor: '#fff' })
        }
    }, [props.amountError])

    const [amount, setAmount] = React.useState(props.amount)
    React.useEffect(() => {
        setAmount(props.amount)
    }, [props.amount])
    const typeAmount = (amount) => {
        props.handleSetAmount(amount)
        setAmount(amount)
    }

    const [balance, setBalance] = React.useState(props.balance)
    React.useEffect(() => {
        setBalance(props.balance)
    }, [props.balance])

    const setToaddress = (toAddress) => {
        setToAddress(toAddress)
        props.setToAddress(toAddress)
    }
    const paste = () => {
        Clipboard.getString().then((content) => {
            if (content !== '') {
                if (isEthereumAddress(content)) {
                    setToaddress(content)
                }
            }
        })
    }

    const [note, setNote] = React.useState(props.note)
    React.useEffect(() => {
        setNote(props.note)
    }, [props.note])
    const typeNote = (value) => {
        setNote(value)
        props.handleTypeNote(value)
    }

    return (
        <View>
            <View style={styles.addressView}>
                <View style={styles.actBtnView}>
                    <TouchableOpacity
                        onPress={() => props.navigate('QRCodeScan')}
                        style={styles.actBtn}
                    >
                        <Icon
                            name='qrcode-scan'
                            size={18}
                            color='#060'
                            style={{ marginRight: 5 }}
                        />
                        <Text style={styles.actTxt}>扫描地址</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => paste()}
                        style={styles.actBtn}
                    >
                        <Icon
                            name='content-paste'
                            size={18}
                            color='#060'
                            style={{ marginRight: 5 }}
                        />
                        <Text style={styles.actTxt}>粘贴地址</Text>
                    </TouchableOpacity>
                </View>
                <TextInput
                    style={[styles.addressInput, addressErrorStyle]}
                    onChangeText={(toAddress) => { setToaddress(toAddress) }}
                    value={toAddress}
                    onFocus={() => { props.handleRollUp(-55) }}
                    onBlur={() => { props.handleRollUp(0) }}
                />
                <Text style={styles.errorTxt}>{addressErrorTxt}</Text>
            </View>
            <View style={styles.amountView}>
                <View style={styles.actBtnView}>
                    <View style={styles.actBtn}>
                        <Icon
                            name='coins'
                            size={18}
                            color='#060'
                            style={{ marginRight: 5 }}
                        />
                        <Text style={styles.actTxt}>发送数量</Text>
                    </View>
                    <View style={styles.actBtn}>
                        <Text style={styles.balance}>余额:{balance}</Text>
                    </View>
                </View>
                <View style={styles.amountInputView}>
                    <View style={{width:'60%'}}>
                        <TextInput
                            style={[styles.amountInput,amountErrorStyle]}
                            placeholder='0'
                            keyboardType='numeric'
                            onChangeText={(value) => { typeAmount(value) }}
                            value={amount}
                            onFocus={() => { props.handleRollUp(-135) }}
                            onBlur={() => { props.handleRollUp(0) }}
                        />
                        <Text style={styles.errorTxt}>{amountErrorTxt}</Text>
                    </View>
                    <Text style={styles.ethPriceView} numberOfLines={1}>
                        ≈ $ {Math.round(amount * ethprice * 1000) / 1000}
                    </Text>
                </View>
            </View>
            <View style={styles.amountView}>
                <View style={styles.actBtnView}>
                    <View style={styles.actBtn}>
                        <Icon
                            name='notebook'
                            size={18}
                            color='#060'
                            style={{ marginRight: 5 }}
                        />
                        <Text style={styles.actTxt}>链上备注</Text>
                    </View>
                </View>
                <TextInput
                    style={styles.noteInput}
                    multiline={true}
                    returnKeyType='next'
                    placeholder='备注在链上永久记录[选填]'
                    onChangeText={(value) => { typeNote(value) }}
                    onFocus={() => { props.handleRollUp(-210) }}
                    onBlur={() => { props.handleRollUp(0) }}
                    value={note}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    actBtnView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    actBtn: {
        flexDirection: 'row',
    },
    actTxt: {
        color: '#333',
        fontSize: 14,
    },
    balance: {
        color: '#333',
        fontSize: 10,
        textAlignVertical: 'bottom',
        height: 20,
        paddingRight: 2
    },
    addressView: {
        marginBottom: 0,
    },
    addressInput: {
        backgroundColor: '#eee',
        fontFamily: 'InputMono Light',
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 10,
        borderRadius: 5,
    },
    errorTxt: {
        fontSize: 10,
        height: 14,
        color: '#f30',
        paddingLeft: 5,
        textAlignVertical: 'center',
    },
    amountView: {
        marginBottom: 0
    },
    amountInputView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    amountInput: {
        backgroundColor: '#eee',
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 18,
        borderRadius: 5,
        width: '100%'
    },
    noteInput: {
        backgroundColor: '#eee',
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 12,
        lineHeight: 16.5,
        borderRadius: 5,
        width: '100%',
    },
    ethPriceView: {
        backgroundColor: '#eee',
        paddingHorizontal: 10,
        height: 38,
        fontSize: 12,
        borderRadius: 5,
        width: '30%',
        textAlignVertical: 'center',
        textAlign: 'right'
    },
    labelTextStyle: {
        height: 24,
        paddingTop: 5,
    },
    inputContainerStyle: {
        height: 60,
        paddingLeft: 5,
    },
    balancePrice: {
        color: '#666',
        fontSize: 10,
        lineHeight: 15,
        textAlign: 'right',
    },
    option: {
        flexDirection: 'row',
    },
    titleText: {
        fontSize: 14,
        color: '#333',
        textAlign: 'right',
        textAlignVertical: 'center',
        marginRight: 5
    },
})