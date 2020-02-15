import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Title from '../components/Title'
import MyButton from '../components/MyButton'

export default function SendConfirm(props) {

    const [toAddress, setToAddress] = React.useState(props.toAddress)
    React.useEffect(() => {
        setToAddress(props.toAddress)
    }, [props.toAddress])

    const [addressError, setAddressError] = React.useState(props.addressError)
    React.useEffect(() => {
        setAddressError(props.addressError)
    }, [props.addressError])

    const [amount, setAmount] = React.useState(props.amount)
    React.useEffect(() => {
        setAmount(props.amount)
    }, [props.amount])

    const [balance, setBalance] = React.useState(props.balance)
    React.useEffect(() => {
        setBalance(props.balance)
    }, [props.balance])

    const [ethprice, setEthprice] = React.useState(props.ethprice)
    React.useEffect(() => {
        setEthprice(props.ethprice)
    }, [props.ethprice])

    const [buttonDisable, setButtonDisable] = React.useState(props.buttonDisable)
    React.useEffect(() => {
        setButtonDisable(props.buttonDisable)
    }, [props.buttonDisable])

    return (
        <View>
            <Title titleText='转账确认' />
            <View>
                <Text>付款地址</Text>
                <Text>{props.fromAddress}</Text>
            </View>
            <View>
                <Text>收款地址</Text>
                <Text>{props.toAddress}</Text>
            </View>
            <View>
                <Text>发送数量</Text>
                <Text>{props.amount}</Text>
            </View>
            <View>
                <Text>矿工费上限</Text>
                <Text>{props.myGasprice}</Text>
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
                    style={{marginRight:5,flex:3}}
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
                    style={{marginleft:5,flex:7}}
                    disabled={buttonDisable}
                    onPress={() => { props.handleback() }}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    bottom: {
        flexDirection:'row',
        marginHorizontal:5,
        flex:10
    }
})