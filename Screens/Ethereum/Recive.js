import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Clipboard,
    PermissionsAndroid
} from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import QRCode from 'react-native-qrcode-svg'
import Jazzicon from '@novaviva/react-native-jazzicon'
import Ripple from 'react-native-material-ripple'
import Toast from 'react-native-easy-toast'
import ViewShot from "react-native-view-shot"
import CameraRoll from "@react-native-community/cameraroll"
import { I18n } from '../../i18n'
import { networks } from '../../utils/networks'
import MyBackButton from '../Components/MyBackButton'
import MyBackground from '../Components/MyBackground'
import MyCard from '../Components/MyCard'
import Title from '../Components/Title'
import MyButton from '../Components/MyButton'

const styles = StyleSheet.create({
    addressNum: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
        marginBottom: 20
    },
    divide: {
        borderWidth: 0.3,
        borderColor: '#666',
        borderRadius: 1,
        borderStyle: 'dashed',
        marginBottom: 20,
    },
    QRView: {
        position: 'relative',
        width: 150,
        height: 150,
        marginBottom: 20
    },
    jazzIcon: {
        position: 'absolute',
        top: 75,
        left: 75,
        backgroundColor: '#fff',
        padding: 4,
        borderRadius: 5,
        marginLeft: -16,
        marginTop: -16
    },
    balanceAddress: {
        color: '#333',
        fontSize: 10,
        lineHeight: 30,
        fontWeight: 'bold',
        marginLeft: 15,
        marginRight: 15
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 10,
        marginBottom: 10
    },
    faucet: {
        alignItems: 'center',
        marginBottom: 10
    }
})
class Recive extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount = () => {

    }
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return
        }
    }
    Capture = async () => {
        let that = this
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.refs.viewShot.capture().then(uri => {
                    let promise = CameraRoll.save(uri, 'photo')
                    promise.then(function (result) {
                        that.toast.show(I18n.t('Success'))
                    }).catch(function (error) {
                        that.toast.show(I18n.t('PermissionsAndroid'))
                    });
                })
            } else {
                that.toast.show(I18n.t('PermissionsAndroid'))
            }
        } catch (err) {
            that.toast.show(I18n.t('PermissionsAndroid'))
        }
    }
    Faucet = (address,next) => {
        let options = {
            method: 'POST',
            headers: {
                'accept': '*/*',
                'accept-encoding': 'gzip, deflate, br',
                'accept-language': 'zh-CN,zh;q=0.9,zh-TW;q=0.8,en;q=0.7',
                'content-length': 42,
                'content-type': 'application/rawdata',
                'origin': 'https://faucet.metamask.io',
                'referer': 'https://faucet.metamask.io/',
                'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36',
            },
            body: address
        }
        fetch('https://faucet.metamask.io/', options)
            .then((result) => {
                if(result.ok){
                    this.toast.show(I18n.t('Success'))
                }else{
                    console.log(result)
                    this.toast.show(I18n.t('FaucetError'))
                }
                next()
            })
            .catch((error) => {
                console.log('error:',error)
                this.toast.show(I18n.t('FaucetError'))
                next()
            })
    }
    render() {
        const { navigate } = this.props.navigation
        const { accounts, currentAccount, networkId } = this.props.WalletReducer
        return (
            <MyBackground>
                <View style={{ flexDirection: 'column' }}>
                    <MyBackButton
                        onPress={() => { navigate('Ethereum') }}
                    />
                    <MyCard
                        screenWidth={global.screenWidth * 0.9}
                        margin={0}
                        top={0}
                        style={{
                            paddingBottom: 0, paddingLeft: 0, paddingRight: 0,
                            marginLeft: global.screenWidth * 0.05
                        }}
                    >
                        <ViewShot
                            ref='viewShot'
                            options={{ format: "png", quality: 1 }}
                            style={{ backgroundColor: '#fff' }}
                        >
                            <Title titleText={I18n.t('ReciveTitle')} fontSize={24} />
                            <View style={styles.divide}></View>
                            <View style={styles.content}>
                                <View style={styles.QRView}>
                                    <QRCode
                                        value={accounts[currentAccount].address}
                                        size={150}
                                    />
                                    <View style={styles.jazzIcon}>
                                        <Jazzicon
                                            size={28}
                                            address={accounts[currentAccount].address}
                                            containerStyle={{ borderRadius: 5 }}
                                        />
                                    </View>
                                </View>
                                <View style={styles.addressNum}>
                                    <Icon name="circle" size={10} color={networks[networkId].color} />
                                    <Text style={styles.balanceAccount}>{I18n.t('Address')}{currentAccount + 1}</Text>
                                </View>
                                <Ripple
                                    rippleColor='#ccc'
                                    rippleOpacity={0.6}
                                    onPress={() => {
                                        Clipboard.setString(accounts[currentAccount].address)
                                    }}
                                >
                                    <Text style={styles.balanceAddress}>{accounts[currentAccount].address}</Text>
                                </Ripple>
                            </View>
                        </ViewShot>
                        <View style={styles.buttonView}>
                            <MyButton
                                screenWidth={100}
                                height={32}
                                raiseLevel={2}
                                borderRadius={5}
                                text={'📋' + I18n.t('CopyAddress')}
                                backgroundColor='#fc0'
                                backgroundDarker='#960'
                                backgroundActive='#ff0'
                                textColor='#333'
                                borderColor='#960'
                                borderWidth={1}
                                textSize={I18n.t('ButtonFontSize')}
                                letterSpacing={0}
                                onPress={() => {
                                    Clipboard.setString(accounts[currentAccount].address)
                                    this.toast.show(I18n.t('Success'))
                                }}
                            />
                            <MyButton
                                screenWidth={100}
                                height={32}
                                raiseLevel={2}
                                borderRadius={5}
                                text={'💾' + I18n.t('SavePic')}
                                backgroundColor='#3f0'
                                backgroundDarker='#090'
                                backgroundActive='#3f0'
                                textColor='#333'
                                borderColor='#090'
                                borderWidth={1}
                                textSize={I18n.t('ButtonFontSize')}
                                letterSpacing={0}
                                onPress={
                                    () => { this.Capture() }}
                            />
                        </View>
                        <View style={styles.faucet}>
                            {networkId === 1 && (
                                <MyButton
                                    screenWidth={200}
                                    height={32}
                                    raiseLevel={2}
                                    borderRadius={5}
                                    text={'🚰' + I18n.t('Faucet')}
                                    backgroundColor='#ff9999'
                                    backgroundDarker='#ff1a1a'
                                    backgroundActive='#ffe5e5'
                                    textColor='#333'
                                    borderColor='#ff1a1a'
                                    borderWidth={1}
                                    textSize={I18n.t('ButtonFontSize')}
                                    letterSpacing={0}
                                    progress={true}
                                    onPress={
                                        (next) => { this.Faucet(accounts[currentAccount].address,next) }}
                                />
                            )}

                        </View>
                    </MyCard>
                </View>
                <Toast
                    position='top'
                    positionValue={30}
                    ref={(ref) => this.toast = ref} />
            </MyBackground >
        )
    }
}
const mapStateToProps = state => (state)

const mapDispatchToProps = dispatch => ({
})
export default connect(mapStateToProps, mapDispatchToProps)(Recive)