import React from 'react'
import {
    Text,
    TextInput,
    View,
    Clipboard,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import * as actions from '../actions'
import isEthereumAddress from 'is-ethereum-address'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { I18n } from '../i18n/'

function SendInput(props) {
    
    const {toAddress,balance,amount,ethPrice,note} = props.SendReducer

    const [addressErrorTxt, setAddressErrorTxt] = React.useState(props.addressError)
    const [amountErrorTxt, setAmountErrorTxt] = React.useState(props.amountError)
    const [addressErrorStyle, setAddressErrorStyle] = React.useState({})
    const [amountErrorStyle, setAmountErrorStyle] = React.useState({})
    React.useEffect(() => {
        if (props.addressError) {
            setAddressErrorTxt(I18n.t('EthAddressError'))
            setAddressErrorStyle({ borderWidth: 1, borderColor: '#f30' })
        } else {
            setAddressErrorTxt('')
            setAddressErrorStyle({ borderWidth: 0, borderColor: '#fff' })
        }
    }, [props.addressError])

    React.useEffect(() => {
        if (props.amountError) {
            setAmountErrorTxt(I18n.t('AmountError'))
            setAmountErrorStyle({ borderWidth: 1, borderColor: '#f30' })
        } else {
            setAmountErrorTxt('')
            setAmountErrorStyle({ borderWidth: 0, borderColor: '#fff' })
        }
    }, [props.amountError])

    const paste = () => {
        Clipboard.getString().then((content) => {
            if (content !== '') {
                if (isEthereumAddress(content)) {
                    props.setToAddress(content)
                }
            }
        })
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
                        <Text style={styles.actTxt}>{I18n.t('ScanQR')}</Text>
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
                        <Text style={styles.actTxt}>{I18n.t('PasteAddrss')}</Text>
                    </TouchableOpacity>
                </View>
                <TextInput
                    style={[styles.addressInput, addressErrorStyle]}
                    onChangeText={(toAddress) => { props.setToAddress(toAddress) }}
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
                        <Text style={styles.actTxt}>{I18n.t('SendAmount')}</Text>
                    </View>
                    <View style={styles.actBtn}>
                        <Text style={styles.balance}>{I18n.t('Balance')}:{Math.round(balance * 100000) / 100000}</Text>
                    </View>
                </View>
                <View style={styles.amountInputView}>
                    <View style={{width:'60%'}}>
                        <TextInput
                            style={[styles.amountInput,amountErrorStyle]}
                            placeholder='0'
                            keyboardType='numeric'
                            onChangeText={(value) => { props.setAmount(value) }}
                            value={amount}
                            onFocus={() => { props.handleRollUp(-135) }}
                            onBlur={() => { props.handleRollUp(0) }}
                        />
                        <Text style={styles.errorTxt}>{amountErrorTxt}</Text>
                    </View>
                    <Text style={styles.ethPriceView} numberOfLines={1}>
                        ≈ $ {Math.round(amount * ethPrice * 1000) / 1000}
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
                        <Text style={styles.actTxt}>{I18n.t('InputData')}</Text>
                    </View>
                </View>
                <TextInput
                    style={styles.noteInput}
                    multiline={true}
                    returnKeyType='next'
                    placeholder={I18n.t('NoteOnChain')}
                    onChangeText={(value) => { props.setNote(value) }}
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

const mapStateToProps = state => (state)

const mapDispatchToProps = dispatch => ({
    setNote: (value) => dispatch(actions.setNote(value)),
    setToAddress: (value) => dispatch(actions.setToAddress(value)),
    setAmount: (value) => dispatch(actions.setAmount(value)),
})
export default connect(mapStateToProps, mapDispatchToProps)(SendInput)