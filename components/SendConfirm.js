import React from 'react'
import { View,Text } from 'react-native'
import Title from '../components/Title'
import SendInput from '../components/SendInput'
import GasView from '../components/GasView'
import MyButton from '../components/MyButton'

export default function SendTx(props) {

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
            <GasView
                ethprice={ethprice}
                handleSetGasprice={props.handleSetGasprice}
            />
            <MyButton
                screenWidth={global.screenWidth * 0.9 - 30}
                text='下一步'
                height={50}
                backgroundColor='#6f0'
                backgroundDarker='#390'
                textColor='#000'
                borderColor='#390'
                borderWidth={1}
                disabled={buttonDisable}
                onPress={() => { props.handleSubmit() }}
            />
        </View>
    )
}