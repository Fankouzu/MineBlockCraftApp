import React from 'react'
import { StyleSheet, Animated, TextInput } from 'react-native'
import PropTypes from 'prop-types'

export default function MyPasswordInput(props) {

    var borderWidth = new Animated.Value(1)
    var borderRadius = new Animated.Value(10)
    const [borderColor, setBorderColor] = React.useState(props.borderColor)
    const [password, setPassword] = React.useState('')
    const duration = 100
    const inputRef = React.useRef()

    React.useEffect(() => {
        props.focus ? inputRef.current.focus() : inputRef.current.blur()
    }, [])


    React.useEffect(() => {
        setBorderColor(props.borderColor)
    }, [props.borderColor])

    const handleTypePassword = (password) => {
        setPassword(password)
        props.handleTypePassword(password)
    }
    const onTextInput = () => {
        setBorderColor(props.borderColorActive)
    }
    const onFocus = () => {
        Animated.parallel([
            Animated.timing(borderWidth, {
                toValue: 2,
                duration: duration,
            }),
            Animated.timing(borderRadius, {
                toValue: 12,
                duration: duration,
            }),
        ]).start(() => {
            setBorderColor(props.borderColorActive)
            props.handleKeybordMargin('up')
        })
    }
    const onBlur = () => {
        Animated.parallel([
            Animated.timing(borderWidth, {
                toValue: 1,
                duration: duration,
            }),
            Animated.timing(borderRadius, {
                toValue: 10,
                duration: duration,
            }),
        ]).start(() => {
            setBorderColor(props.borderColor)
            props.handleKeybordMargin('down')
        })
    }
    return (
        <Animated.View
            style={{
                borderWidth: borderWidth,
                borderRadius: borderRadius,
                borderColor: borderColor,
                height: 47,
                marginBottom: 10,
            }}>
            <TextInput
                ref={inputRef}
                placeholderTextColor="#666"
                onChangeText={(password) => handleTypePassword(password)}
                placeholder={props.placeholder}
                value={password}
                clearButtonMode="while-editing"
                style={styles.textInput}
                secureTextEntry={props.secureTextEntry}
                blurOnSubmit={true}
                onFocus={onFocus}
                onBlur={onBlur}
                onTextInput={onTextInput}
                keyboardType={props.keyboardType}
            />
        </Animated.View>
    )
}
MyPasswordInput.propTypes = {
    handleTypePassword: PropTypes.func.isRequired,
    handleKeybordMargin: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    borderColor: PropTypes.string,
    borderColorActive: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    keyboardType: PropTypes.string,
}
MyPasswordInput.defaultProps = {
    borderColor: '#666',
    borderColorActive: '#666',
    secureTextEntry: true,
    keyboardType: 'default',
}
const styles = StyleSheet.create({
    textInput: {
        paddingLeft: 10,
        paddingRight: 10,
        height: 45,
        lineHeight: 22,
        color: '#666',
        fontSize: 16,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
})
