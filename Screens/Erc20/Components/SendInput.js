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
import * as actions from '../../../actions'
import isEthereumAddress from 'is-ethereum-address'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { I18n } from '../../../i18n'

function SendInput(props) {
    
    const {tokenTx,toAddress,amount} = props.TokenReducer

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
            setAmountErrorTxt(I18n.t('TokenAmountError'))
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
                    props.setTokenToAddress(content)
                }
            }
        })
    }

    return (
        <View>
            <View style={styles.addressView}>
                <View style={styles.actBtnView}>
                    <TouchableOpacity
                        onPress={() => props.navigate('QRCodeScan',{back:'SendToken'})}
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
                    onChangeText={(toAddress) => { props.setTokenToAddress(toAddress) }}
                    value={toAddress}
                    onFocus={() => { props.handleRollUp(-55) }}
                    onBlur={() => { props.handleRollUp(0) }}
                    placeholder={I18n.t('AddressPlaceholder')}
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
    <Text style={styles.balance}>{I18n.t('Balance')}:{Math.round(tokenTx.balance * 100000) / 100000} {tokenTx.result[0].tokenSymbol}</Text>
                    </View>
                </View>
                <View style={styles.amountInputView}>
                    <View style={{width:'100%'}}>
                        <TextInput
                            style={[styles.amountInput,amountErrorStyle]}
                            placeholder='0'
                            keyboardType='numeric'
                            onChangeText={(value) => { props.setTokenAmount(value) }}
                            value={amount}
                            onFocus={() => { props.handleRollUp(-135) }}
                            onBlur={() => { props.handleRollUp(0) }}
                        />
                        <Text style={styles.errorTxt}>{amountErrorTxt}</Text>
                    </View>
                </View>
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
})

const mapStateToProps = state => (state)

const mapDispatchToProps = dispatch => ({
    setTokenToAddress: (value) => dispatch(actions.setTokenToAddress(value)),
    setTokenAmount: (value) => dispatch(actions.setTokenAmount(value)),
})
export default connect(mapStateToProps, mapDispatchToProps)(SendInput)