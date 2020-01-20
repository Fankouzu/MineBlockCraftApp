import React from 'react'
import { StyleSheet, View,Text } from 'react-native'

export default function Title(props) {

    return (
        <View style={styles.title} >
            <Text style={[styles.titleText, { fontFamily: 'RuiZiBiGeQingChun'}]}>{props.titleText}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        alignItems: 'center',
    },
    titleText: {
        fontSize: 30,
        lineHeight: 40,
        marginBottom: 30,
        marginTop: 20,
        letterSpacing: 2
    }
})