import React from 'react'
import { View, StyleSheet } from 'react-native'
import CardButton from '../components/CardButton'

const styles = StyleSheet.create({
    cardBottom: {
        flexDirection: 'row',
        height: 40,
        marginTop: 5,
        borderBottomLeftRadius:9,
        borderBottomRightRadius:9,
        overflow:'hidden',
        backgroundColor:'#f9f9f9'
    }
})
export default function CardBottom(props) {

    return (
        <View style={styles.cardBottom}>
                <CardButton
                    rippleColor='#f60'
                    //onPress={()=>{props.navigation.navigate('Send',{balance:props.balance,fromAddress:props.fromAddress})}}
                    onPress={() => { props.showPasswordModal('send') }}
                    textColor='#f60'
                    text='发送'
                    iconName='send'
                    iconSize={16}
                    iconColor='#f60'
                />
                <CardButton
                    rippleColor='#390'
                    onPress={() => { }}
                    textColor='#390'
                    text='接收'
                    iconName='call-received'
                    iconSize={16}
                    iconColor='#390'
                />
                <CardButton
                    rippleColor='#06f'
                    onPress={() => { }}
                    textColor='#06f'
                    text='记录'
                    iconName='format-list-bulleted'
                    iconSize={16}
                    iconColor='#06f'
                    rippleStyle={{borderRightWidth: 0}}
                />
            </View>
    )

}
