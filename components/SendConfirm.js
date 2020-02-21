import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Title from '../components/Title'
import MyButton from '../components/MyButton'
import Jazzicon from '@novaviva/react-native-jazzicon'

export default function SendConfirm(props) {
    const [ethprice, setEthprice] = React.useState(props.ethprice)
    React.useEffect(() => {
        setEthprice(props.ethprice)
    }, [props.ethprice])
    const [myGasprice, setMyGasprice] = React.useState(props.myGasprice)
    React.useEffect(() => {
        setMyGasprice(props.myGasprice)
    }, [props.myGasprice])
    const gasLimit = props.gasLimit

    const [amount, setAmount] = React.useState(props.amount)
    const [amountPrice, setAmountPrice] = React.useState(0)
    const [myGaspriceUsd, setMyGaspriceUsd] = React.useState(0)
    const [totleAmount, setTotleAmount] = React.useState(0)
    const [totlePrice, setTotlePrice] = React.useState(0)
    React.useEffect(() => {
        setAmount(props.amount)
        setAmountPrice(Math.round(ethprice*props.amount * 1000) / 1000)
        setMyGaspriceUsd(Math.round(props.myGasprice * ethprice * 21 / 1000) / 1000)
        var _totleAmount = Math.round((parseFloat(props.amount) + props.myGasprice/1000000000 * gasLimit)*1000000)/1000000
        setTotleAmount(_totleAmount)
        setTotlePrice(Math.round(_totleAmount*ethprice*100)/100)
    }, [props.amount,ethprice,myGasprice])

    const [buttonDisable, setButtonDisable] = React.useState(props.buttonDisable)
    React.useEffect(() => {
        setButtonDisable(props.buttonDisable)
    }, [props.buttonDisable])

    return (
        <View>
            <Title titleText='转账确认' style={styles.Title} />
            <View style={styles.divide}></View>
            <View style={styles.addressView}>
                <Text style={styles.title}>付款地址:</Text>
                <View style={styles.rightViewH}>
                    <View style={styles.jazzIcon}><Jazzicon size={20} address={props.fromAddress} /></View>
                    <Text numberOfLines={2} style={styles.address}>{props.fromAddress}</Text>
                </View>
            </View>
            <View style={styles.addressView}>
                <Text style={styles.title}>收款地址:</Text>
                <View style={styles.rightViewH}>
                    <View style={styles.jazzIcon}><Jazzicon size={20} address={props.toAddress} /></View>
                    <Text numberOfLines={2} style={styles.address}>{props.toAddress}</Text>
                </View>
            </View>
            <View style={styles.textView}>
                <Text style={styles.title}>发送数量:</Text>
                <View style={styles.rightViewV}>
                    <Text style={styles.amount}>{amount}Ether</Text>
                    <Text style={styles.amount}>≈${amountPrice}</Text>
                </View>
            </View>
            <View style={styles.textView}>
                <Text style={styles.title}>链上备注:</Text>
                <View style={styles.rightViewV}>
                    <Text numberOfLines={2} style={styles.note}>{props.note}</Text>
                </View>
            </View>
            <View style={styles.textView}>
                <Text style={styles.title}>矿工费上限:</Text>
                <View style={styles.rightViewV}>
                    <Text style={styles.amount}>{myGasprice}GWei x {gasLimit}</Text>
                    <Text style={styles.amount}>≈${myGaspriceUsd}</Text>
                </View>
            </View>
            <View style={styles.divide}></View>
            <View style={styles.textView}>
                <Text style={styles.title}>合计:</Text>
                <View style={styles.rightViewV}>
                    <Text style={styles.totleAmount}>Ether:{totleAmount}</Text>
                    <Text style={styles.totleAmount}>≈${totlePrice}</Text>
                </View>
            </View>
            <View style={styles.bottom}>
                <MyButton
                    screenWidth='100%'
                    text='返回'
                    height={50}
                    backgroundColor='#ccc'
                    backgroundDarker='#999'
                    backgroundActive='#ccc'
                    textColor='#333'
                    borderColor='#999'
                    borderWidth={1}
                    disabled={buttonDisable}
                    style={{ marginRight: 5, flex: 3 }}
                    onPress={() => { props.handleback() }}
                />
                <MyButton
                    screenWidth='100%'
                    text='下一步'
                    height={50}
                    backgroundColor='#6f0'
                    backgroundDarker='#390'
                    textColor='#000'
                    borderColor='#390'
                    borderWidth={1}
                    style={{ marginleft: 5, flex: 7 }}
                    disabled={buttonDisable}
                    onPress={() => { props.handleConfirm() }}
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