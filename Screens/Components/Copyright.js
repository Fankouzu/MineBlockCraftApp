import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

export default function Copyright() {
    return (
        <View style={{
            alignItems: 'center',
            height: 40,
            justifyContent: 'center',
            position: 'absolute',
            width: global.screenWidth,
            bottom: 0,
            elevation:0
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
