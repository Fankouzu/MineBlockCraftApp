import React from 'react'
import { ImageBackground } from 'react-native'

export default function MyBackground(props) {
    return (
        <ImageBackground 
            source={require('../../assets/welcome3x.png')} 
            style={[{ 
                width: '100%', 
                height: '100%', 
                paddingTop:global.ios? 30 : 0
                },
                props.style]}>
            {props.children}
        </ImageBackground>
    )
}