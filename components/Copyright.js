import React, { Component } from 'react'
import { Text, View ,Dimensions} from 'react-native'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height
export default class Copyright extends Component {
    render() {
        return (
            <View style={{
                alignItems:'center',
                height:80,
                justifyContent:'center',
                position:'absolute',
                width:screenWidth,
                top:screenHeight-100
                }}>
                <Text style={{
                    color:'#666',
                    fontSize:10,
                    textShadowOffset:{width:1,height:1},
                    textShadowColor:'#ddd',
                    textShadowRadius:1
                    }}> 
                    {'© Copyright @Fankouzu'} {new Date().getFullYear()}{'.'}
                    </Text>
            </View>
        )
    }
}
