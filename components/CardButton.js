import React from 'react'
import { Text, StyleSheet } from 'react-native'
import Ripple from 'react-native-material-ripple'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const styles = StyleSheet.create({
    ListButtonText: {
        fontSize: 16,
        color: '#eee',
        marginLeft: 2,
        fontFamily: 'BigYoungMediumGB2.0',
        letterSpacing:3
    },
    ListButton: {
        height: 40,
        lineHeight: 40,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        borderRightWidth:0.5,
        borderRightColor:'#fff',
        flex: 1
    }
})
export default function CardButton(props) {

    return (
        <Ripple
            rippleColor={props.rippleColor}
            rippleOpacity={0.6}
            style={[styles.ListButton,props.rippleStyle]}
            onPress={props.onPress}
        >
            <Text style={[styles.ListButtonText, { color: props.textColor }]}>
                {props.text}
                    </Text>
            <Icon name={props.iconName} size={16} color={props.iconColor} />
        </Ripple>
    )

}
