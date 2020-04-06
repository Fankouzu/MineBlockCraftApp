import React from 'react'
import MyButton from './MyButton'
import PropTypes from 'prop-types'
import {
    View,
    Text,
} from 'react-native'

export default function MyBackButton(props) {
    return (
        <View style={{
            width:global.screenWidth,
            height:60,
            }}>
        <MyButton
            text="<"
            screenWidth={25}
            height={26}
            backgroundColor="#fff"
            backgroundDarker="#666"
            textColor="#000"
            borderColor="#666"
            backgroundActive="#fff"
            borderWidth={1}
            raiseLevel={2}
            borderRadius={25}
            style={{
                top: global.screenWidth * 0.05,
                left: global.screenWidth * 0.05,
                position:'absolute',
            }}
            textSize={10}
            onPress={props.onPress}
        />
        <Text
            style={{
                textAlign:'center',
                lineHeight:60,
                fontSize:30,
                fontFamily: 'BigYoungMediumGB2.0',
                color:'#333',
            }}
        >{props.text}</Text>
        </View>
    )
}
MyBackButton.propTypes = {
    onPress: PropTypes.func.isRequired,
}
