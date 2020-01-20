import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class Copyright extends Component {
    render() {
        return (
            <View style={{alignItems:'center',marginTop:30}}>
                <Text style={{color:'#999',fontSize:10}}> {'© Copyright @Fankouzu'} {new Date().getFullYear()}{'.'}</Text>
            </View>
        )
    }
}
