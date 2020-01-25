import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import AwesomeButton from "react-native-really-awesome-button"
import PropTypes from "prop-types"

export default function MyButton(props) {

    return (
            <AwesomeButton
                onPress={() => props.handleSubmit()}
                size="small"
                backgroundActive={props.backgroundActive}
                backgroundColor={props.backgroundColor}
                backgroundDarker={props.backgroundDarker}
                backgroundShadow={props.backgroundShadow}
                borderColor={props.borderColor}
                borderWidth={props.borderWidth}
                activeOpacity={0.5}
                borderRadius={props.borderRadius}
                raiseLevel={props.raiseLevel}
                height={props.height}
                width={props.screenWidth}
                onPress={props.onPress}
                style={{
                    marginBottom: 10
                }}
            >
                <Text style={[styles.buttonText, { color: props.textColor, fontFamily: 'BigYoungMediumGB2.0' }]}>{props.text}</Text>
            </AwesomeButton>
    )
}
MyButton.propTypes = {
    backgroundActive: PropTypes.string,
    backgroundColor: PropTypes.string,
    backgroundDarker: PropTypes.string,
    borderColor: PropTypes.string,
    borderWidth: PropTypes.number,
    backgroundShadow: PropTypes.string,
    textColor: PropTypes.string,
    borderRadius: PropTypes.number,
    raiseLevel: PropTypes.number,
    height: PropTypes.number,
    screenWidth: PropTypes.number,
    text: PropTypes.string,
    onPress: PropTypes.func,
}
MyButton.defaultProps = {
    backgroundActive: '#4c91d4',
    backgroundColor: '#1976d2',
    backgroundDarker: '#1f3d5a',
    borderColor: '#1976d2',
    borderWidth: 0,
    textColor: '#fff',
    backgroundShadow: 'transparent',
    borderRadius: 10,
    raiseLevel: 6,
    height: 60,
    text: '确定',
    onPress: null,
}
const styles = StyleSheet.create({
    buttonText: {
        fontSize: 20,
        lineHeight: 30,
        letterSpacing: 2,
    },
})