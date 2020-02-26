import React from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'
import Title from '../components/Title'
import Jazzicon from '@novaviva/react-native-jazzicon'
import MyButton from '../components/MyButton'

function Receipt(props) {
    const { navigate } = props.navigation
    return (
        <View style={{ alignItems: 'center' }}>
            <Title titleText='转账收据' style={styles.Title} />
            <View style={styles.divide}></View>
            <View style={styles.addressView}>
                <Text style={styles.title}>付款地址:</Text>
                <View style={styles.rightViewH}>
                    <View style={styles.jazzIcon}><Jazzicon size={20} address={props.SendReducer.tx.from} /></View>
                    <Text numberOfLines={2} style={styles.address}>{props.SendReducer.tx.from}</Text>
                </View>
            </View>
            <View style={styles.addressView}>
                <Text style={styles.title}>收款地址:</Text>
                <View style={styles.rightViewH}>
                    <View style={styles.jazzIcon}><Jazzicon size={20} address={props.SendReducer.tx.to} /></View>
                    <Text numberOfLines={2} style={styles.address}>{props.SendReducer.tx.to}</Text>
                </View>
            </View>
            <View style={styles.textView}>
                <Text style={styles.title}>交易哈希:</Text>
                <View style={styles.rightView}>
                    <Text numberOfLines={2} style={styles.hash}>{props.SendReducer.tx.hash}</Text>
                </View>
            </View>
            <View style={styles.textView}>
                <Text style={styles.title}>区块高度:</Text>
                <View style={styles.rightView}>
                    <Text style={styles.hash}>{props.SendReducer.receipt.blockNumber}</Text>
                </View>
            </View>
            <MyButton
                screenWidth={global.screenWidth * 0.9 - 30}
                text='返回'
                height={50}
                backgroundColor='#6f0'
                backgroundDarker='#390'
                textColor='#000'
                borderColor='#390'
                borderWidth={1}
                onPress={() => { navigate('WalletFrame') }}
            />
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
        borderWidth: 0.35,
        borderColor: '#000',
        borderRadius: 1,
        borderStyle: 'dashed',
        marginBottom: 10,
        width: '100%'
    },
    addressView: {
        paddingHorizontal: 0,
        marginBottom: 10,
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    jazzIcon: {
        width: 24,
        justifyContent: 'center'
    },
    address: {
        width: 110,
        fontSize: 10,
        fontFamily: 'InputMono Light',
        lineHeight: 15,
        flexWrap: 'wrap',
        marginVertical: 4,
        marginHorizontal: 6,
        color: '#333'
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
        textAlign: 'right'
    },
    textView: {
        paddingHorizontal: 0,
        marginBottom: 10,
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    title: {
        fontSize: 14,
        height: 36,
        textAlignVertical: 'center',
        color: '#333'
    },
    rightView: {
        flexDirection: 'row',
        borderRadius: 5,
        width: 150,
        paddingHorizontal: 6,
        height: 36,
        justifyContent: 'flex-start'
    },
    rightViewH: {
        flexDirection: 'row',
        borderRadius: 5,
        width: 150,
        paddingHorizontal: 6,
        height: 36
    },
    rightViewV: {
        flexDirection: 'column',
        borderRadius: 5,
        width: 150,
        paddingHorizontal: 6,
        height: 36
    },
})
const mapStateToProps = state => (state)

const mapDispatchToProps = dispatch => ({
})
export default connect(mapStateToProps, mapDispatchToProps)(Receipt)