import React from 'react'
import { Text, StyleSheet } from 'react-native'
import Ripple from 'react-native-material-ripple'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const styles = StyleSheet.create({
    ListButton: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        height: 50,
        borderTopColor: '#666',
        borderTopWidth: 0.5,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    ListButtonText: {
        fontSize: 14,
        color: '#eee',
        marginLeft: 2,
        letterSpacing: 1,
        fontFamily: 'BigYoungMediumGB2.0'
    }
})
export default function ListButton(props) {

    return (
        <Ripple
            rippleColor={props.iconColor}
            rippleOpacity={0.6}
            style={[styles.ListButton, { width: global.screenWidth * 0.9 }]}
            onPress={() => { props.onPress() }}
        >
            <Icon name="flash-circle" size={16} color={props.iconColor} />
            <Text
                style={styles.ListButtonText}
            >
                {props.text}
            </Text>
        </Ripple>
    )

}
