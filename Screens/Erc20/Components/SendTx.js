import React from 'react'
import { View, Animated } from 'react-native'
import { connect } from 'react-redux'
import Title from '../../Components/Title'
import MyButton from '../../Components/MyButton'
import SendInput from './SendInput'
import MyCard from '../../Components/MyCard'
import isEthereumAddress from 'is-ethereum-address'
import { I18n } from '../../../i18n'

class SendTx extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            shakeLeft: new Animated.Value(0),
            addressError: false,
            amountError: false,
            buttonDisable: false,
            toAddress: '',
            amount: 0,
            tokenTx: props.TokenReducer.tokenTx,
        }
    }

    componentDidMount = async () => {
    }
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return
        }
    }


    handleNext = () => {
        this.setState({ buttonDisable: true })
        const {toAddress,amount} = this.props.TokenReducer
        if (toAddress === '' || !isEthereumAddress(toAddress)) {
            this.setState({ addressError: true })
            this.shake()
        } else if (isNaN(amount) || amount <= 0 || parseFloat(amount) > parseFloat(this.state.tokenTx.balance)) {
            this.setState({ amountError: true })
            this.shake()
        } else {
            this.props.handleTurnPage(1)
        }
        setTimeout(() => {
            this.setState({ buttonDisable: false, addressError: false, amountError: false })
        }, 3000)
    }
    shake = () => {
        var duration = 100
        Animated.sequence([
            Animated.timing(this.state.shakeLeft, {
                toValue: global.screenWidth * 0.08,
                duration: duration,
            }),
            Animated.timing(this.state.shakeLeft, {
                toValue: global.screenWidth * -0.03,
                duration: duration,
            }),
            Animated.timing(this.state.shakeLeft, {
                toValue: global.screenWidth * 0.03,
                duration: duration,
            }),
            Animated.timing(this.state.shakeLeft, {
                toValue: 0,
                duration: duration,
            }),
        ]).start(() => {
        })
    }
    render() {
        return (
            <Animated.View style={{
                marginLeft: this.state.shakeLeft,
            }}>
                <MyCard
                    screenWidth={global.screenWidth}
                    margin={0.05}
                    top={10}
                    style={{ padding: 10, marginBottom: 50 }}>
                    <Title titleText={I18n.t('SendToken')} />
                    <View style={{
                        borderWidth: 0.35,
                        borderColor: '#000',
                        borderRadius: 1,
                        borderStyle: 'dashed',
                        marginBottom: 10,
                        width: '100%',
                    }} />
                    <SendInput
                        addressError={this.state.addressError}
                        amountError={this.state.amountError}
                        navigate={this.props.navigate}
                        handleRollUp={this.props.handleRollUp}
                    />
                    <MyButton
                        screenWidth={global.screenWidth * 0.9 - 30}
                        text={I18n.t('NextStep')}
                        height={50}
                        backgroundColor="#6f0"
                        backgroundDarker="#390"
                        textColor="#000"
                        borderColor="#390"
                        borderWidth={1}
                        disabled={this.state.buttonDisable}
                        onPress={() => this.handleNext()}
                    />
                </MyCard>
            </Animated.View>
        )
    }
}
const mapStateToProps = state => (state)

const mapDispatchToProps = dispatch => ({
})
export default connect(mapStateToProps, mapDispatchToProps)(SendTx)
