import React from 'react'
import { View } from 'react-native'
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

    const [amountError, setAmountError] = React.useState(props.amountError)
    React.useEffect(() => {
        setAmountError(props.amountError)
    }, [props.amountError])

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

    const [note, setNote] = React.useState('')
    const handleTypeNote = (note) => {
        props.handleTypeNote(note)
        setNote(note)
        
    }

    return (
        <View>
            <Title titleText='转账交易' />
            <SendInput
                toAddress={toAddress}
                addressError={addressError}
                amountError={amountError}
                amount={amount}
                balance={balance}
                ethprice={ethprice}
                navigate={props.navigate}
                setToAddress={props.setToAddress}
                note={props.note}
                handleSetAmount={props.handleSetAmount}
                handleRollUp={props.handleRollUp}
                handleTypeNote={handleTypeNote}
            />
            <GasView
                myGasprice={props.myGasprice}
                ethprice={ethprice}
                handleSetGasprice={props.handleSetGasprice}
                note={note}
                handleSetGasLimit={props.handleSetGasLimit}
                initGasLimit={props.initGasLimit}
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
                onPress={() => { props.handleNext() }}
            />
        </View>
    )
}