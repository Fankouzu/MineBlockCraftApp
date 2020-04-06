import React from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'
import Title from '../../Components/Title'
import Jazzicon from '@novaviva/react-native-jazzicon'
import MyButton from '../../Components/MyButton'
import { I18n } from '../../../i18n'
import { networks } from '../../../utils/networks'
import { openContract } from '../../../utils/Tools'
import abi from '../../../Contract/MineBlockCraftUser.abi.js'
import ContractAddress from '../../../Contract/address.js'
import Toast from 'react-native-easy-toast'
import MyCard from '../../Components/MyCard'

function Receipt(props) {
    const { navigate } = props.navigation

    const { fromAddress, toAddress, receipt,tokenTx } = props.TokenReducer
    const [AddDisabled, setAddDisabled] = React.useState(false)

    const [already, setAlready] = React.useState(true)

    const toast = React.useRef()

    React.useEffect(() => {
        const { networkId, mnemonic, currentAccount } = props.WalletReducer
        const UserContractAddress = ContractAddress.MineBlockCraftUser[networkId].address
        if (UserContractAddress !== '' && props.TokenReducer.toAddress !== '') {
            const contract = openContract(networks[networkId].name, mnemonic, currentAccount, UserContractAddress, abi)
            contract.isFriends(toAddress).then((ret) => {
                setAlready(ret)
            }).catch((error) => {
                console.warn(error)
            })
        }
    }, [props.TokenReducer.toAddress])


    const addFriend = (toAddress, next) => {
        const { networkId, mnemonic, currentAccount } = props.WalletReducer
        const UserContractAddress = ContractAddress.MineBlockCraftUser[networkId].address

        const contract = openContract(networks[networkId].name, mnemonic, currentAccount, UserContractAddress, abi)
        contract.addFriend(toAddress, { 'gasLimit': 100000 }).then((tx) => {
            toast.current.show(I18n.t('Success'))
            setAddDisabled(true)
            setAlready(true)
            next()
        }).catch((error) => {
            toast.current.show(I18n.t('FunctionError'))
            console.warn(error)
            next()
        })
    }

    return (
        <View>
            <MyCard
                screenWidth={global.screenWidth}
                margin={0.05}
                top={10}
                style={{ padding: 10, alignItems: 'center' }}>
                <Title titleText={I18n.t('Receipt')} style={styles.Title} />
                <View style={styles.divide} />
                <View style={styles.addressView}>
                    <Text style={styles.title}>{I18n.t('FromAddress')}:</Text>
                    <View style={styles.rightViewH}>
                        <View style={styles.jazzIcon}><Jazzicon size={20} address={fromAddress} /></View>
                        <Text numberOfLines={2} style={styles.address}>{fromAddress}</Text>
                    </View>
                </View>
                <View style={styles.addressView}>
                    <Text style={styles.title}>{I18n.t('ToAddress')}:</Text>
                    <View style={styles.rightViewH}>
                        <View style={styles.jazzIcon}><Jazzicon size={20} address={toAddress} /></View>
                        <Text numberOfLines={2} style={styles.address}>{toAddress}</Text>
                    </View>
                </View>
                <View style={styles.textView}>
                    <Text style={styles.title}>{I18n.t('Hash')}:</Text>
                    <View style={styles.rightView}>
                        <Text numberOfLines={2} style={styles.hash}>{receipt.transactionHash}</Text>
                    </View>
                </View>
                <View style={styles.textView}>
                    <Text style={styles.title}>{I18n.t('Block')}:</Text>
                    <View style={styles.rightView}>
                        <Text style={styles.hash}>{receipt.blockNumber}</Text>
                    </View>
                </View>
                {fromAddress !== toAddress && !already && (
                    <MyButton
                        screenWidth={global.screenWidth * 0.9 - 30}
                        text={I18n.t('Back')}
                        height={50}
                        backgroundColor="#fc0"
                        backgroundDarker="#960"
                        backgroundActive="#ff0"
                        textColor="#000"
                        borderColor="#960"
                        borderWidth={1}
                        progress={true}
                        disabled={AddDisabled}
                        onPress={(next) => { addFriend(toAddress, next) }}
                    >
                        <View style={styles.jazzIconBtn}><Jazzicon size={20} address={toAddress} /></View>
                        <Text style={styles.addFriend}>将地址加为好友</Text>
                    </MyButton>
                )}

                <MyButton
                    screenWidth={global.screenWidth * 0.9 - 30}
                    text={I18n.t('Back')}
                    height={50}
                    backgroundColor="#6f0"
                    backgroundDarker="#390"
                    textColor="#000"
                    borderColor="#390"
                    borderWidth={1}
                    onPress={() => { navigate('Token', { contractAddress: tokenTx.result[0].contractAddress }) }}
                />
                <Toast
                    position="top"
                    positionValue={30}
                    ref={toast} />
            </MyCard>
        </View>
    )
}
const styles = StyleSheet.create({
    title: {
        fontSize: 14,
        height: 36,
        textAlignVertical: 'center',
        color: '#333',
    },
    divide: {
        borderWidth: 0.35,
        borderColor: '#000',
        borderRadius: 1,
        borderStyle: 'dashed',
        marginBottom: 10,
        width: '100%',
    },
    addressView: {
        paddingHorizontal: 0,
        marginBottom: 10,
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    jazzIconBtn: {
        width: 22,
        justifyContent: 'center',
        padding: 0.5,
        alignItems: 'center',
        borderRadius: 12,
        borderColor: '#666',
        backgroundColor: '#fff',
    },
    jazzIcon: {
        width: 24,
        justifyContent: 'center',
    },
    address: {
        width: 110,
        fontSize: 10,
        fontFamily: 'InputMono Light',
        lineHeight: 15,
        flexWrap: 'wrap',
        marginVertical: 4,
        marginHorizontal: 6,
        color: '#333',
    },
    hash: {
        width: 130,
        fontSize: 10,
        fontFamily: 'InputMono Light',
        lineHeight: 15,
        flexWrap: 'wrap',
        marginVertical: 4,
        marginHorizontal: 6,
        color: '#333',
        textAlignVertical: 'center',
        textAlign: 'right',
    },
    textView: {
        paddingHorizontal: 0,
        marginBottom: 10,
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    rightView: {
        flexDirection: 'row',
        borderRadius: 5,
        width: 150,
        paddingHorizontal: 6,
        height: 36,
        justifyContent: 'flex-start',
    },
    rightViewH: {
        flexDirection: 'row',
        borderRadius: 5,
        width: 150,
        paddingHorizontal: 6,
        height: 36,
    },
    rightViewV: {
        flexDirection: 'column',
        borderRadius: 5,
        width: 150,
        paddingHorizontal: 6,
        height: 36,
    },
    addFriend: {
        lineHeight: 30,
        fontFamily: 'BigYoungMediumGB2.0',
        fontSize: 20,
        letterSpacing: 2,
    },
})
const mapStateToProps = state => (state)

const mapDispatchToProps = dispatch => ({
})
export default connect(mapStateToProps, mapDispatchToProps)(Receipt)
