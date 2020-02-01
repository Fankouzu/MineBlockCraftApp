import React from 'react'
import { StyleSheet, Text } from 'react-native'
import AwesomeButton from 'react-native-really-awesome-button'
import PropTypes from 'prop-types'

export default function MyButton(props) {

    const [disabled,setDisabled] = React.useState(props.disabled)
    React.useEffect(() => {
        setDisabled(props.disabled)
    }, [props.disabled])
    return (
            <AwesomeButton
                size='small'
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
                style={props.style}
                disabled={disabled}
            >
                <Text style={[
                    styles.buttonText, 
                    { 
                        fontSize: props.textSize,
                        color: props.textColor, 
                        fontFamily: props.textFont
                    }]}>{props.text}</Text>
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
    style: PropTypes.object,
    textSize:PropTypes.number,
    textFont:PropTypes.string,
    disabled:PropTypes.bool
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
    style:{
        marginBottom: 10
    },
    textSize:20,
    textFont:'BigYoungMediumGB2.0',
    disabled:false
}
const styles = StyleSheet.create({
    buttonText: {
        lineHeight: 30,
        letterSpacing: 2,
    },
})