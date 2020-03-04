import React from 'react'
import { View, StyleSheet } from 'react-native'
import CardButton from './CardButton'
import { I18n } from '../../../i18n'

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
                    onPress={() => { props.showPasswordModal('send') }}
                    textColor='#f60'
                    text={I18n.t('Send')}
                    iconName='send'
                    iconSize={16}
                    iconColor='#f60'
                />
                <CardButton
                    rippleColor='#390'
                    onPress={() => {props.navigation.navigate('Recive',{'DappName':'EthereumDapp'})}}
                    textColor='#390'
                    text={I18n.t('Recive')}
                    iconName='call-received'
                    iconSize={16}
                    iconColor='#390'
                />
                {/* <CardButton
                    rippleColor='#06f'
                    onPress={() => { }}
                    textColor='#06f'
                    text={I18n.t('TxList')}
                    iconName='format-list-bulleted'
                    iconSize={16}
                    iconColor='#06f'
                    rippleStyle={{borderRightWidth: 0}}
                /> */}
            </View>
    )

}
