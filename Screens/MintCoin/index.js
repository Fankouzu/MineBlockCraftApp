import React, { Component } from 'react'
import { Text, TextInput, StyleSheet, View, ImageBackground, Animated } from 'react-native'
import { connect } from 'react-redux'
import Modal from 'react-native-modal'
import MyButton from '../Components/MyButton'
import MyCard from '../Components/MyCard'
import Topbar from '../Components/Topbar'
import Title from '../Components/Title'
import { I18n } from '../../i18n'
import Bytecode from './Bytecode'
import Abi from './Abi'
import { Deploy } from '../../utils/Tools'
import { networks } from '../../utils/networks'

class MintCoin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            symbol: '',
            decimals: 18,
            initialSupply: '10000',
            rollTo: 0,
            nameErrorStyle: {},
            symbolErrorStyle: {},
            supplyErrorStyle: {},
            shakeLeft: new Animated.Value(0),
            modalVisible: false,
        }
    }

    componentDidMount = async () => {

    }

    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return
        }
    }
    shake = () => {
        var duration = 100
        Animated.sequence([
            Animated.timing(this.state.shakeLeft, {
                toValue: global.screenWidth * 0.05,
                duration: duration,
            }),
            Animated.timing(this.state.shakeLeft, {
                toValue: global.screenWidth * -0.03,
                duration: duration,
            }),
            Animated.timing(this.state.shakeLeft, {
                toValue: global.screenWidth * 0.025,
                duration: duration,
            }),
            Animated.timing(this.state.shakeLeft, {
                toValue: 0,
                duration: duration,
            }),
        ]).start()
    }
    handleSubmit = async (next) => {
        const { networkId, currentAccount, mnemonic } = this.props.WalletReducer
        const networkName = networks[networkId].name

        const { name, symbol, initialSupply } = this.state

        const errorStyle = { borderBottomColor: '#f30', color: '#f30' }
        if (name === '') {
            this.setState({ nameErrorStyle: errorStyle })
            this.shake()
            next()
        } else if (symbol === '') {
            this.setState({ symbolErrorStyle: errorStyle })
            this.shake()
            next()
        } else if (initialSupply === '') {
            this.setState({ supplyErrorStyle: errorStyle })
            this.shake()
            next()
        } else {
            this.setState({
                nameErrorStyle: {},
                symbolErrorStyle: {},
                supplyErrorStyle: {},
            })
            try {
                let tx = await Deploy(networkName, mnemonic, currentAccount, Abi, Bytecode, {
                    initialSupply: initialSupply,
                    name: name,
                    symbol: symbol,
                    decimals: 18,
                })
                this.setState({modalVisible:true})
                next()
            } catch (e) {
                console.log('Deploy Error:', e)
                next()
            }
        }
    }
    render() {
        const { navigate } = this.props.navigation
        return (
            <ImageBackground
                source={require('../../assets/blockchainBg.png')}
                imageStyle={{ resizeMode: 'repeat', opacity: 0.15 }}
                style={{ height: global.screenHeight, width: global.screenWidth }}>
                <Topbar
                    onPress={() => { navigate('MainScreen') }}
                    titleTxt={I18n.t('Mint')}
                />
                <Animated.View style={{
                    marginLeft: this.state.shakeLeft,
                }}>
                    <MyCard
                        screenWidth={global.screenWidth}
                        margin={0.05}
                        top={90}
                        style={{ padding: 10, marginBottom: 50 }}>
                        <Title titleText={I18n.t('MintErc20')} style={{ fontFamily: 'nomal' }} />
                        <View style={{
                            borderWidth: 0.35,
                            borderColor: '#000',
                            borderRadius: 1,
                            borderStyle: 'dashed',
                            marginBottom: 10,
                            width: '100%',
                        }} />
                        <View style={styles.InputView}>
                            <View style={styles.InputRow}>
                                <Text style={styles.InputTxt}>{I18n.t('TokenName')} : </Text>
                                <TextInput
                                    style={[styles.Input, this.state.nameErrorStyle]}
                                    onChangeText={(name) => { this.setState({ name: name }) }}
                                    value={this.state.name}
                                    placeholder={I18n.t('NamePlaceholder')}
                                />
                            </View>
                            <View style={styles.InputRow}>
                                <Text style={styles.InputTxt}>{I18n.t('TokenSymbol')} : </Text>
                                <TextInput
                                    style={[styles.Input, this.state.symbolErrorStyle]}
                                    onChangeText={(symbol) => { this.setState({ symbol: symbol }) }}
                                    value={this.state.symbol}
                                    placeholder={I18n.t('SymbolPlaceholder')}
                                />
                            </View>
                            <View style={styles.InputRow}>
                                <Text style={styles.InputTxt}>{I18n.t('TokenSupply')} : </Text>
                                <TextInput
                                    style={[styles.Input, this.state.supplyErrorStyle]}
                                    onChangeText={(initialSupply) => { this.setState({ initialSupply: initialSupply }) }}
                                    value={this.state.initialSupply}
                                    placeholder={I18n.t('SupplyPlaceholder')}
                                    keyboardType="numeric"
                                />
                            </View>
                            <MyButton
                                screenWidth={global.screenWidth * 0.9 - 20}
                                onPress={(next) => { this.handleSubmit(next) }}
                                text={I18n.t('PasswordSubmit')}
                                height={50}
                                backgroundColor="#6f0"
                                backgroundDarker="#390"
                                textColor="#000"
                                borderColor="#390"
                                borderWidth={1}
                                textSize={20}
                                progress={true}
                            />
                        </View>
                    </MyCard>
                </Animated.View>
                <Modal isVisible={this.state.modalVisible}>
                    <MyCard
                        screenWidth={global.screenWidth * 0.9}
                        margin={0}
                        top={0}
                    >
                        <Title titleText={I18n.t('DeploySuccess')} />
                        <Text style={styles.DeployTxt}>
                            {I18n.t('DeployTxt')}
                        </Text>
                        <MyButton
                            screenWidth={global.screenWidth * 0.9 - 30}
                            onPress={() => { this.setState({modalVisible:false}), navigate('Erc20')}}
                            text={I18n.t('Ok')}
                            height={50}
                            backgroundColor="#6f0"
                            backgroundDarker="#390"
                            textColor="#000"
                            borderColor="#390"
                            borderWidth={1}
                            textSize={20}
                        />
                    </MyCard>
                </Modal>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    Middle: {
    },
    ScrollView: {
        justifyContent: 'flex-start',
    },
    jazzIcon: {
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    InputView: {
        marginBottom: 0,
    },
    Input: {
        backgroundColor: '#fff',
        fontFamily: 'InputMono Light',
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 14,
        borderBottomWidth: 0.5,
        flex: 7,
    },
    InputRow: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    InputTxt: {
        textAlignVertical: 'center',
        textAlign: 'center',
        flex: 3,
    },
    errorTxt: {
        fontSize: 10,
        height: 14,
        color: '#f30',
        paddingLeft: 5,
        textAlignVertical: 'center',
    },
    DeployTxt:{
        textAlign:'center',
        textAlignVertical:'center',
        height:30,
        marginBottom:20,
        color:'#0099ff',
    },
})

const mapStateToProps = state => (state)

const mapDispatchToProps = dispatch => ({
})
export default connect(mapStateToProps, mapDispatchToProps)(MintCoin)
