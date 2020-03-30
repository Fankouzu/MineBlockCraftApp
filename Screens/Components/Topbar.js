import React, { Component } from 'react'
import { StyleSheet, View, Text,TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Fontisto'
import PropTypes from 'prop-types'


export default function Topbar(props) {

    return (
        <View style={styles.TopBar}>
            <TouchableOpacity
                onPress={props.onPress}
                style={styles.left}>
                <Icon name="angle-left" size={14} color={'#666'} />
            </TouchableOpacity>
            <View style={styles.title}>
                <Text numberOfLines={1} style={styles.titleTxt}>{props.titleTxt}</Text>
            </View>
        </View>
    )
}
Topbar.propTypes = {
    onPress: PropTypes.func.isRequired,
    titleTxt:PropTypes.string
}
Topbar.defaultProps = {
    titleTxt:''
}
const styles = StyleSheet.create({
    TopBar: {
        height: 45,
        flexDirection: 'row',
        backgroundColor: '#efefef',
        width: '100%',
        borderBottomWidth: 0.5,
        borderBottomColor: '#ddd',
        position: 'absolute',
        top: 0,
        zIndex: 1
    },
    left: {
        height: 45,
        width: 40,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1
    },
    title: {
        height: 45,
        width: '100%',
    },
    titleTxt: {
        height: 45,
        textAlign: 'center',
        textAlignVertical: 'center',
        paddingHorizontal: 40,
        overflow: 'hidden'
    },
})