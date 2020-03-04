import React from 'react'
import { StyleSheet, Animated, TextInput } from 'react-native'
import PropTypes from 'prop-types'

export default function MyTextArea(props) {

    const borderWidth = new Animated.Value(1)
    const borderRadius = new Animated.Value(10)
    const [borderColor, setBorderColor] = React.useState(props.borderColor)
    const [value, setValue] = React.useState(props.value)
    const duration = 100

    const [height, setHeight] = React.useState(35)


    React.useEffect(() => {
        setBorderColor(props.borderColor)
    }, [props.borderColor])
    React.useEffect(() => {
        setValue(props.value)
    }, [props.value])

    const handleType = (value) => {
        setValue(value)
        props.handleType(value)
    }
    const onTextInput = () => {
        setBorderColor(props.borderColorActive)
    }
    const onFocus = () => {
        Animated.parallel([
            Animated.timing(borderWidth, {
                toValue: 2,
                duration: duration
            }),
            Animated.timing(borderRadius, {
                toValue: 12,
                duration: duration
            })
        ]).start(() => {
            setBorderColor(props.borderColorActive)
            props.handleKeybordMargin('up')
            props.onFocus()
        })
    }
    const onBlur = () => {
        Animated.parallel([
            Animated.timing(borderWidth, {
                toValue: 1,
                duration: duration
            }),
            Animated.timing(borderRadius, {
                toValue: 10,
                duration: duration
            })
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
                height: height,
                marginBottom: 10,
            }}>
            <TextInput
                placeholderTextColor='#666'
                onChangeText={(value) => handleType(value)}
                placeholder={props.placeholder}
                value={value}
                clearButtonMode='while-editing'
                style={styles.textInput}
                blurOnSubmit={true}
                onFocus={onFocus}
                onBlur={onBlur}
                onTextInput={onTextInput}
                multiline={true}
                onContentSizeChange={(event) => {
                    setHeight(Math.max(35,event.nativeEvent.contentSize.height));
                }}
            />
        </Animated.View>
    )
}
MyTextArea.propTypes = {
    handleType: PropTypes.func.isRequired,
    handleKeybordMargin: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    placeholder: PropTypes.string,
    borderColor: PropTypes.string,
    borderColorActive: PropTypes.string,
    value: PropTypes.string
}
MyTextArea.defaultProps = {
    borderColor: '#666',
    borderColorActive: '#666',
    onFocus: () => { },
    value: ''
}
const styles = StyleSheet.create({
    textInput: {
        paddingLeft: 10,
        paddingRight: 10,
        lineHeight: 30,
        color: '#333',
        fontSize: 16,
        alignItems: 'center',
        flex: 1,
        textAlignVertical: 'top',
        letterSpacing:1
    }
})