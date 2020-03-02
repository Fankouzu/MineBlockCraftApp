import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {connect} from 'react-redux'
import Title from '../../Components/Title'
import MyButton from '../../Components/MyButton'
import Jazzicon from '@novaviva/react-native-jazzicon'
import { I18n } from '../../../i18n'

function SendConfirm(props) {
    
    const {ethPrice,myGasPrice,gasLimit,amount,fromAddress,toAddress,note} = props.SendReducer

    const [amountPrice, setAmountPrice] = React.useState(0)
    const [myGaspriceUsd, setMyGaspriceUsd] = React.useState(0)
    const [totleAmount, setTotleAmount] = React.useState(0)
    const [totlePrice, setTotlePrice] = React.useState(0)

    React.useEffect(() => {
        setAmountPrice(Math.round(ethPrice*amount * 1000) / 1000)
        setMyGaspriceUsd(Math.round(myGasPrice * ethPrice * 21 / 1000) / 1000)
        var _totleAmount = Math.round((parseFloat(amount) + myGasPrice/1000000000 * gasLimit)*1000000)/1000000
        setTotleAmount(_totleAmount)
        setTotlePrice(Math.round(_totleAmount*ethPrice*100)/100)
    }, [amount,ethPrice,myGasPrice])

    return (
        <View>
            <Title titleText={I18n.t('SendConfirm')} style={styles.Title} />
            <View style={styles.divide}></View>
            <View style={styles.addressView}>
                <Text style={styles.title}>{I18n.t('FromAddress')}:</Text>
                <View style={styles.rightViewH}>
                    <View style={styles.jazzIcon}><Jazzicon size={20} address={fromAddress} /></View>
                    <Text numberOfLines={2} style={styles.address}>{fromAddress}</Text>
                </View>
            </View>
            <View style={styles.addressView}>
                <Text style={styles.title}>{I18n.t('ToAddress')}:</Text>
                <View style={styles.rightViewH}>
                    <View style={styles.jazzIcon}><Jazzicon size={20} address={toAddress} /></View>
                    <Text numberOfLines={2} style={styles.address}>{toAddress}</Text>
                </View>
            </View>
            <View style={styles.textView}>
                <Text style={styles.title}>{I18n.t('SendAmount')}:</Text>
                <View style={styles.rightViewV}>
                    <Text style={styles.amount}>{amount}Ether</Text>
                    <Text style={styles.amount}>≈${amountPrice}</Text>
                </View>
            </View>
            <View style={styles.textView}>
                <Text style={styles.title}>{I18n.t('InputData')}:</Text>
                <View style={styles.rightViewV}>
                    <Text numberOfLines={2} style={styles.note}>{note}</Text>
                </View>
            </View>
            <View style={styles.textView}>
                <Text style={styles.title}>{I18n.t('GasfeeCap')}:</Text>
                <View style={styles.rightViewV}>
                    <Text style={styles.amount}>{myGasPrice}GWei x {gasLimit}</Text>
                    <Text style={styles.amount}>≈${myGaspriceUsd}</Text>
                </View>
            </View>
            <View style={styles.divide}></View>
            <View style={styles.textView}>
                <Text style={styles.title}>{I18n.t('Total')}:</Text>
                <View style={styles.rightViewV}>
                    <Text style={styles.totleAmount}>Ether:{totleAmount}</Text>
                    <Text style={styles.totleAmount}>≈${totlePrice}</Text>
                </View>
            </View>
            <View style={styles.bottom}>
                <MyButton
                    screenWidth='100%'
                    text={I18n.t('Back')}
                    height={50}
                    backgroundColor='#ccc'
                    backgroundDarker='#999'
                    backgroundActive='#ccc'
                    textColor='#333'
                    borderColor='#999'
                    borderWidth={1}
                    style={{ marginRight: 5, flex: 3 }}
                    onPress={() => { props.handleTurnPage(-1) }}
                />
                <MyButton
                    screenWidth='100%'
                    text={I18n.t('NextStep')}
                    height={50}
                    backgroundColor='#6f0'
                    backgroundDarker='#390'
                    textColor='#000'
                    borderColor='#390'
                    borderWidth={1}
                    style={{ marginleft: 5, flex: 7 }}
                    onPress={() => { props.handleTurnPage(1) }}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    divide: {
        borderWidth: 0.3,
        borderColor: '#666',
        borderRadius: 1,
        borderStyle: 'dashed',
        marginBottom: 10,
    },
    addressView: {
        paddingHorizontal: 0,
        marginBottom: 10,
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textView: {
        paddingHorizontal: 0,
        marginBottom: 10,
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    amount: {
        color: '#333',
        fontSize: 12,
        height: 16,
        textAlignVertical: 'center',
        fontFamily: 'InputMono Light',
        textAlign:'right'
    },
    note: {
        color: '#333',
        fontSize: 12,
        height: 36,
        textAlignVertical: 'center',
        textAlign:'right',
    },
    title: {
        fontSize: 14,
        height: 36,
        textAlignVertical: 'center',
        color: '#333'
    },
    rightViewH: {
        flexDirection: 'row',
        borderRadius: 5,
        width: 150,
        paddingHorizontal: 6,
        height: 36
    },
    rightViewV: {
        flexDirection: 'column',
        borderRadius: 5,
        width: 150,
        paddingHorizontal: 6,
        height: 36
    },
    jazzIcon: {
        width: 24,
        justifyContent: 'center'
    },
    address: {
        width: 110,
        fontSize: 10,
        fontFamily: 'InputMono Light',
        lineHeight: 15,
        flexWrap: 'wrap',
        marginVertical: 4,
        marginHorizontal: 6,
        color: '#333'
    },
    totleAmount: {
        color: '#333',
        fontSize: 14,
        height: 18,
        textAlignVertical: 'center',
        fontFamily: 'InputMono Medium',
        textAlign:'right'
    },
    bottom: {
        flexDirection: 'row',
        flex: 10
    }
})
const mapStateToProps = state => (state)

const mapDispatchToProps = dispatch => ({
})
export default connect(mapStateToProps,mapDispatchToProps)(SendConfirm)
