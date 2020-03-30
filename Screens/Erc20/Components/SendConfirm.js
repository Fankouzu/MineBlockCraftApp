import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import Title from '../../Components/Title'
import MyButton from '../../Components/MyButton'
import MyCard from '../../Components/MyCard'
import Jazzicon from '@novaviva/react-native-jazzicon'
import { I18n } from '../../../i18n'

function SendConfirm(props) {

    const { amount, fromAddress, toAddress } = props.TokenReducer


    return (
        <View>
            <MyCard
                screenWidth={global.screenWidth}
                margin={0.05}
                top={10}
                style={{ padding: 10 }}>
                <Title titleText={I18n.t('SendConfirm')} style={styles.Title} />
                <View style={styles.divide}></View>
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
                    <Text style={styles.title}>{I18n.t('SendAmount')}:</Text>
                    <View style={styles.rightViewV}>
                        <Text style={styles.amount}>{amount}</Text>
                    </View>
                </View>
                <View style={styles.divide}></View>
                <View style={styles.bottom}>
                    <MyButton
                        screenWidth='100%'
                        text={I18n.t('Back')}
                        height={50}
                        backgroundColor='#ccc'
                        backgroundDarker='#999'
                        backgroundActive='#ccc'
                        textColor='#333'
                        borderColor='#999'
                        borderWidth={1}
                        style={{ marginRight: 5, flex: 3 }}
                        onPress={() => { props.handleTurnPage(-1) }}
                    />
                    <MyButton
                        screenWidth='100%'
                        text={I18n.t('NextStep')}
                        height={50}
                        backgroundColor='#6f0'
                        backgroundDarker='#390'
                        textColor='#000'
                        borderColor='#390'
                        borderWidth={1}
                        style={{ marginleft: 5, flex: 7 }}
                        onPress={() => { props.handleTurnPage(1) }}
                    />
                </View>
            </MyCard>
        </View>
    )
}
const styles = StyleSheet.create({
    divide: {
        borderWidth: 0.3,
        borderColor: '#666',
        borderRadius: 1,
        borderStyle: 'dashed',
        marginBottom: 10,
    },
    addressView: {
        paddingHorizontal: 0,
        marginBottom: 10,
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textView: {
        paddingHorizontal: 0,
        marginBottom: 10,
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    amount: {
        color: '#333',
        fontSize: 12,
        height: 16,
        textAlignVertical: 'center',
        fontFamily: 'InputMono Light',
        textAlign: 'right'
    },
    title: {
        fontSize: 14,
        height: 36,
        textAlignVertical: 'center',
        color: '#333'
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
        color: '#333',
    },
    bottom: {
        flexDirection: 'row',
    }
})
const mapStateToProps = state => (state)

const mapDispatchToProps = dispatch => ({
})
export default connect(mapStateToProps, mapDispatchToProps)(SendConfirm)
