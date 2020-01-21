import React from 'react'
import { StyleSheet, View,Text } from 'react-native'
import AwesomeButton from "react-native-really-awesome-button"

export default function MyButton(props) {

    return (
        <View>
            <AwesomeButton
                onPress={() => props.handleSubmit()}
                size="small"
                backgroundActive='#4c91d4'
                backgroundColor="#1976d2"
                backgroundDarker='#1f3d5a'
                backgroundShadow='transparent'
                activityColor='red'
                activeOpacity={0.5}
                borderRadius={10}
                raiseLevel={6}
                height={60}
                width={props.screenWidth*0.8}
            >
<Text style={[styles.buttonText, { fontFamily: 'RuiZiBiGeQingChun'}]}>{props.text}</Text>
            </AwesomeButton>
        </View>
    )
}

const styles = StyleSheet.create({

    buttonText: {
        fontSize: 20,
        lineHeight: 30,
        color: '#fff',
        letterSpacing: 2,
    },
})