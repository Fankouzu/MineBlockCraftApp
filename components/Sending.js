import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { networks } from '../utils/networks'
import Title from '../components/Title'
import LoadingDot from '../components/LoadingDot'
import Jazzicon from '@novaviva/react-native-jazzicon'
import { sendTransaction } from '../utils/Tools'

export default function SendConfirm(props) {

    const { mnemonic, networkId, myGasprice, amount, note, fromAddress, toAddress, account, gasLimit } = props

    const networkName = networks[networkId].nameEN

    console.log('props', props)


    sendTransaction(toAddress, networkName, mnemonic, account, amount, gasLimit, myGasprice, note).then(function (res) {
        console.log("TCL: handleChangeTab -> res", res)
    })



    return (
        <View>
            <Title titleText='转账中...' style={styles.Title} />
            <View style={styles.divide}></View>

            <View style={styles.TxView}>
                <View style={styles.jazzIcon}><Jazzicon size={50} address={fromAddress} /></View>
                <LoadingDot />
                <View style={styles.jazzIcon}><Jazzicon size={50} address={toAddress} /></View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    title: {
        fontSize: 14,
        height: 36,
        textAlignVertical: 'center',
        color: '#333'
    },
    divide: {
        borderWidth: 0.3,
        borderColor: '#666',
        borderRadius: 1,
        borderStyle: 'dashed',
        marginBottom: 10,
    },
    jazzIcon: {
        width: 50,
        justifyContent: 'center'
    },
    TxView: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: 300
    },
})