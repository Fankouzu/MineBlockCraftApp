import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import Title from '../../Components/Title'
import MyButton from '../../Components/MyButton'
import SendInput from './SendInput'
import GasView from './GasView'
import isEthereumAddress from 'is-ethereum-address'
import { I18n } from '../../../i18n'

function SendTx(props) {

    const { toAddress, balance, amount, myGasPrice } = props.SendReducer

    const [addressError, setAddressError] = React.useState(false)

    const [amountError, setAmountError] = React.useState(false)

    const [buttonDisable, setButtonDisable] = React.useState(false)

    const handleNext = () => {
        setButtonDisable(true)
        let myGas = myGasPrice * 1000000000 * 21000 / 1000000000000000000
        if (toAddress === '' || !isEthereumAddress(toAddress)) {
            setAddressError(true)
            props.shake()
        } else if (isNaN(amount) || parseFloat(amount) + myGas > parseFloat(balance)) {
            setAmountError(true)
            props.shake()
        } else {
            props.handleTurnPage(1)
        }
        setTimeout(() => {
            setAmountError(false)
            setAddressError(false)
            setButtonDisable(false)
        }, 3000)
    }
    return (
        <View>
            <Title titleText={I18n.t('SendTransaction')} />
            <View style={{
                borderWidth: 0.35,
                borderColor: '#000',
                borderRadius: 1,
                borderStyle: 'dashed',
                marginBottom: 10,
                width: '100%',
            }}/>
            <SendInput
                addressError={addressError}
                amountError={amountError}
                navigate={props.navigate}
                handleRollUp={props.handleRollUp}
            />
            <GasView />
            <MyButton
                screenWidth={global.screenWidth * 0.9 - 30}
                text={I18n.t('NextStep')}
                height={50}
                backgroundColor="#6f0"
                backgroundDarker="#390"
                textColor="#000"
                borderColor="#390"
                borderWidth={1}
                disabled={buttonDisable}
                onPress={() => handleNext()}
            />
        </View>
    )
}
const mapStateToProps = state => (state)

const mapDispatchToProps = dispatch => ({
})
export default connect(mapStateToProps, mapDispatchToProps)(SendTx)
