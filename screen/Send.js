import React from 'react'
import {
    StyleSheet,
    View,
    Clipboard,
    Animated,
    Text
} from 'react-native'
import { TextField } from 'react-native-material-textfield'
import SwitchSelector from "react-native-switch-selector"
import isEthereumAddress from 'is-ethereum-address'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import MyCard from '../components/MyCard'
import MyButton from '../components/MyButton'
import MyBackButton from '../components/MyBackButton'
import MyBackground from '../components/MyBackground'

const options = [
    { label: "01:00", value: "1" },
    { label: "01:30", value: "1.5" },
    { label: "02:00", value: "2" }
]
const styles = StyleSheet.create({
    modalView: {
        flex: 0,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        paddingTop: 10
    },
    legendLabel: {
        color: '#666'
    }
})

export default class Send extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            shakeLeft: new Animated.Value(0),
            borderColor: '#999',
            toAddress: '',
            amount: 0,
            balance: 0,
            isModalVisible: false
        }
    }
    componentDidMount() {
        this._didFocusSubscription = this.props.navigation.addListener('didFocus',
            () => {
                const balance = this.props.navigation.getParam('balance', 0)
                this.setState({balance:balance })
            }
        )
    }
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return
        }
        this._didFocusSubscription.remove()
    }
    typeAddress = (toAddress) => {
        this.setState({ toAddress: toAddress })
    }
    typeAmount = (amount) => {
        this.setState({ amount: amount })
    }
    onFocus = () => {
        Clipboard.getString().then((content)=>{
            if (content !== '') {
                if (isEthereumAddress(content)){
                    this.setState({toAddress: content})
                }
            }
        })
    }
    shake = () => {
        var duration = 100
        Animated.sequence([
            Animated.timing(this.state.shakeLeft, {
                toValue: global.screenWidth * 0.03,
                duration: duration
            }),
            Animated.timing(this.state.shakeLeft, {
                toValue: global.screenWidth * -0.05,
                duration: duration
            }),
            Animated.timing(this.state.shakeLeft, {
                toValue: global.screenWidth * 0.02,
                duration: duration
            }),
            Animated.timing(this.state.shakeLeft, {
                toValue: 0,
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
                        text='发送交易'
                    />
                    <Animated.View style={{
                        marginLeft: this.state.shakeLeft,
                    }}>
                        <MyCard
                            screenWidth={global.screenWidth}
                            margin={0}
                            top={0}
                            padding={10}
                            style={{ borderWidth: 0, elevation: 1, paddingTop: 0 }}
                        >
                            <View style={styles.col}>
                                <TextField
                                    label='目标地址'
                                    baseColor='#666'
                                    tintColor='#390'
                                    keyboardType='default'
                                    onChangeText={this.typeAddress}
                                    labelTextStyle={{ height: 24, padding: 4 }}
                                    value={this.state.toAddress}
                                    fontSize={18}
                                    onFocus={this.onFocus}
                                    renderRightAccessory={()=>{return(
                                        <Icon name='qrcode-scan' size={16} color='#666'
                                            style={{marginRight:5}}
                                        />
                                    )}}
                                />
                            </View>

                            <View style={styles.col}>
                                <TextField
                                    label='发送数量'
                                    baseColor='#666'
                                    tintColor='#390'
                                    keyboardType='numeric'
                                    onChangeText={this.typeAmount}
                                    labelTextStyle={{ height: 24, padding: 4 }}
                                    fontSize={18}
                                />
                                <Text style={styles.legendLabel}>余额：{this.state.balance}Ether</Text>
                            </View>
                            <SwitchSelector
                                options={options}
                                initial={0}
                                onPress={value => this.setState({ gender: value })}
                                textColor='#333'
                                selectedColor='#fff'
                                buttonColor='#333'
                                borderColor='#333'
                                borderRadius={15}
                                height={30}
                                selectedTextContainerStyle={{backgroundColor:'#666',borderRadius:15}}
                                style={{borderWidth:0.5,borderRadius:15,marginBottom:20,marginTop:20}}
                            />
                            <MyButton
                                screenWidth={global.screenWidth - 20}
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