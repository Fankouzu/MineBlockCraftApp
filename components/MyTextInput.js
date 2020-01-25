import React from 'react'
import { StyleSheet,Animated,TextInput } from 'react-native'
import PropTypes from "prop-types"

export default function MyTextInput(props) {

    const borderWidth = new Animated.Value(1)
    const borderRadius = new Animated.Value(3)
    const [borderColor,setBorderColor] = React.useState('#999')
    const [password,setPassword] = React.useState('')
    const duration=100

    const handleTypePassword = (password) =>{
        setPassword(password)
        props.handleTypePassword(password)
    }
    const onFocus = ()=>{
        Animated.parallel([
            Animated.timing(borderWidth, {
                toValue: 2,
                duration: duration
            }),
            Animated.timing(borderRadius, {
                toValue: 5,
                duration: duration
            })
        ]).start(()=>{
            setBorderColor(props.borderColor)
            props.handleKeybordMargin('up')
        })
    }
    const onBlur = ()=>{
        Animated.parallel([
            Animated.timing(borderWidth, {
                toValue: 1,
                duration: duration
            }),
            Animated.timing(borderRadius, {
                toValue: 3,
                duration: duration
            })
        ]).start(()=>{
            setBorderColor('#999')
            props.handleKeybordMargin('down')
        })
        
    }
    return (
        <Animated.View
            style={{
                borderWidth:borderWidth,
                borderRadius:borderRadius,
                borderColor:borderColor,
                height:47,
                marginBottom: 10,
            }}>
            <TextInput
                placeholderTextColor='#666'
                onChangeText={(password) => handleTypePassword(password)}
                placeholder='输入密码'
                value={password}
                clearButtonMode='while-editing'
                style={styles.textInput}
                secureTextEntry={true}
                blurOnSubmit={true}
                onFocus={onFocus}
                onBlur={onBlur}
            />
        </Animated.View>
    )
}
MyTextInput.propTypes = {
    handleTypePassword: PropTypes.func.isRequired,
    handleKeybordMargin: PropTypes.func.isRequired,
    borderColor: PropTypes.string
}
MyTextInput.defaultProps = {
    borderColor: '#4c91d4'
}
const styles = StyleSheet.create({
    textInput: {
        paddingLeft: 10,
        paddingRight: 10,
        height: 45,
        lineHeight: 45,
        color: '#666',
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flex:1,
    }
})