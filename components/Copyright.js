import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

export default class Copyright extends Component {
    render() {
        return (
            <View style={{
                alignItems: 'center',
                height: 80,
                justifyContent: 'center',
                position: 'absolute',
                width: global.screenWidth,
                top: global.screenHeight - 80
            }}>
                <TouchableOpacity onPress={() => {
                    global.storage.remove({
                        key: 'status',
                    })
                }}>
                    <Text style={{
                        color: '#666',
                        fontSize: 10,
                        textShadowOffset: { width: 1, height: 1 },
                        textShadowColor: '#ddd',
                        textShadowRadius: 1
                    }}>
                        {'© Copyright @Fankouzu'} {new Date().getFullYear()}{'.'}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}
