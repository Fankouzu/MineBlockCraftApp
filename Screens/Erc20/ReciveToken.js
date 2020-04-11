import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Clipboard,
    PermissionsAndroid,
} from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import QRCode from 'react-native-qrcode-svg'
import Jazzicon from '@novaviva/react-native-jazzicon'
import Ripple from 'react-native-material-ripple'
import Toast from 'react-native-easy-toast'
import ViewShot from 'react-native-view-shot'
import CameraRoll from '@react-native-community/cameraroll'
import { I18n,countryCode } from '../../i18n'
import { networks } from '../../utils/networks'
import Topbar from '../Components/Topbar'
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
        marginBottom: 20,
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
        marginBottom: 20,
    },
    jazzIcon: {
        position: 'absolute',
        top: 75,
        left: 75,
        backgroundColor: '#fff',
        padding: 4,
        borderRadius: 5,
        marginLeft: -16,
        marginTop: -16,
    },
    balanceAddress: {
        color: '#333',
        fontSize: 10,
        lineHeight: 30,
        fontWeight: 'bold',
        marginLeft: 15,
        marginRight: 15,
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 10,
        marginBottom: 10,
    },
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
    render() {
        const { navigate } = this.props.navigation
        const { accounts, currentAccount, networkId } = this.props.WalletReducer
        const { tokenTx } = this.props.TokenReducer
        return (
            <MyBackground>
                <View style={{ flexDirection: 'column' }}>
                    <Topbar
                        onPress={() => { navigate('Token', { contractAddress: tokenTx.result[0].contractAddress }) }}
                        titleTxt={this.props.TokenReducer.tokenTx.result[0].tokenName}
                    />
                    <MyCard
                        screenWidth={global.screenWidth * 0.9}
                        margin={0}
                        top={65}
                        style={{
                            paddingHorizontal: 0,
                            marginHorizontal: global.screenWidth * 0.05,
                        }}
                    >
                        <ViewShot
                            ref="viewShot"
                            options={{ format: 'png', quality: 1 }}
                            style={{ backgroundColor: '#fff' }}
                        >
                            <Title titleText={I18n.t('ReciveTitle')} fontSize={countryCode === 'CN' ? 24 : 20} />
                            <View style={styles.divide} />
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
                                    rippleColor="#ccc"
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
                                backgroundColor="#fc0"
                                backgroundDarker="#960"
                                backgroundActive="#ff0"
                                textColor="#333"
                                borderColor="#960"
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
                                backgroundColor="#3f0"
                                backgroundDarker="#090"
                                backgroundActive="#3f0"
                                textColor="#333"
                                borderColor="#090"
                                borderWidth={1}
                                textSize={I18n.t('ButtonFontSize')}
                                letterSpacing={0}
                                onPress={
                                    () => { this.Capture() }}
                            />
                        </View>
                    </MyCard>
                </View>
                <Toast
                    position="top"
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
