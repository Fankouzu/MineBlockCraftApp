import React from 'react'
import {
    StyleSheet,
    View,
    Animated,
    Text
} from 'react-native'
import MyCard from '../components/MyCard'
import MyButton from '../components/MyButton'
import MyBackButton from '../components/MyBackButton'
import MyBackground from '../components/MyBackground'
import Title from '../components/Title'
import SendInput from '../components/SendInput'
import GasView from '../components/GasView'
import {ethprice} from '../utils/Tools'

const styles = StyleSheet.create({
    
})
export default class Send extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            shakeLeft: new Animated.Value(global.screenWidth * 0.05),
            borderColor: '#999',
            toAddress: this.props.navigation.getParam('toAddress', ''),
            amount: 0,
            balance: this.props.navigation.getParam('balance', 0),
            addressError: '',
            myGasfee:0,
            ethprice:0
        }
    }
    componentDidMount() {
        this._didFocusSubscription = this.props.navigation.addListener('didFocus',
            () => {
                const balance = this.props.navigation.getParam('balance', this.state.balance)
                const toAddress = this.props.navigation.getParam('toAddress', this.state.toAddress)
                this.setState({ balance: balance,toAddress:toAddress })
            }
        )
        ethprice().then((res)=>{
            this.setState({ethprice:res.result.ethusd})
        })
    }
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return
        }
        this._didFocusSubscription.remove()
    }
    shake = () => {
        var duration = 100
        Animated.sequence([
            Animated.timing(this.state.shakeLeft, {
                toValue: global.screenWidth * 0.08,
                duration: duration
            }),
            Animated.timing(this.state.shakeLeft, {
                toValue: global.screenWidth * 0.03,
                duration: duration
            }),
            Animated.timing(this.state.shakeLeft, {
                toValue: global.screenWidth * 0.07,
                duration: duration
            }),
            Animated.timing(this.state.shakeLeft, {
                toValue: global.screenWidth * 0.05,
                duration: duration
            })
        ]).start(() => {
            setTimeout(() => {
                this.setState({
                    buttonDisable: false
                })
            }, 3000)
        })
    }

    handleSubmit = () => {
    }
    render() {
        const { navigate } = this.props.navigation
        return (
            <MyBackground>
                <View style={{ flexDirection: 'column' }}>
                    <MyBackButton
                        onPress={() => { navigate('WalletFrame') }}
                    />
                    <Animated.View style={{
                        marginLeft: this.state.shakeLeft,
                    }}>
                        <MyCard
                            screenWidth={global.screenWidth * 0.9}
                            margin={0}
                            top={0}
                            padding={10}
                        >
                            <Title titleText='发送交易' />
                            <SendInput 
                                toAddress={this.state.toAddress}
                                addressError={this.state.addressError}
                                amount={this.state.amount}
                                balance={this.state.balance}
                                ethprice={this.state.ethprice}
                                navigate={navigate}
                            />
                            <GasView 
                                ethprice={this.state.ethprice}
                            />
                            <MyButton
                                screenWidth={global.screenWidth * 0.9 - 20}
                                text='完成'
                                height={50}
                                backgroundColor='#6f0'
                                backgroundDarker='#390'
                                textColor='#000'
                                borderColor='#390'
                                borderWidth={1}
                                disabled={this.state.buttonDisable}
                                onPress={() => { this.handleSubmit() }}
                            />
                        </MyCard>
                    </Animated.View>
                </View>
            </MyBackground>
        )
    }
}