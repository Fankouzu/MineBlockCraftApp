import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Title from '../components/Title'
import Jazzicon from '@novaviva/react-native-jazzicon'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default function SendConfirm(props) {

    const { myGasprice, amount, note, fromAddress, toAddress } = props



    const [styleArr,setStyleArr] = React.useState([])
    React.useEffect(() => {
        var i = 0
            setInterval(() => {
                const activeDot = []
                for(var j=0;j<5;j++){
                    if(i===j){
                        activeDot[j] = {backgroundColor: '#fff'}
                    }else{
                        activeDot[j] = {backgroundColor: '#390'}
                    }
                }
                i++
                if(i>4) i=0
                setStyleArr(activeDot)
            }, 500)
    }, [])

    return (
        <View>
            <Title titleText='转账中...' style={styles.Title} />
            <View style={styles.divide}></View>

            <View style={styles.TxView}>
                <View style={styles.jazzIcon}><Jazzicon size={50} address={fromAddress} /></View>
                <View
                    style={styles.animation}
                >
                    <View style={[styles.dot,styleArr[0]]}></View>
                    <View style={[styles.dot,styleArr[1]]}></View>
                    <View style={[styles.dot,styleArr[2]]}></View>
                    <View style={[styles.dot,styleArr[3]]}></View>
                    <View style={[styles.dot,styleArr[4]]}></View>
                    <Icon
                        name='keyboard-arrow-right'
                        size={25}
                        color='#390'
                        style={styles.arrow}
                    />
                </View>
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
        height:300
    },
    animation: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5
    },
    dot: {
        width: 5,
        height: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#390',
        marginLeft:10
    },
    arrow: {
        width: 25,
        height: 25,
    }
})