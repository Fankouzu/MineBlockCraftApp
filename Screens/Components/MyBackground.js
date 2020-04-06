import React from 'react'
import { ImageBackground } from 'react-native'
import Copyright from './Copyright'

export default function MyBackground(props) {
    return (
        <ImageBackground
            source={require('../../assets/welcome3x.png')}
            imageStyle={{
                opacity:0.75,
            }}
            style={[{
                width: '100%',
                height: '100%',
                paddingTop:global.ios ? 30 : 0,
                },
                props.style]}>
                <Copyright />
            {props.children}
        </ImageBackground>
    )
}
