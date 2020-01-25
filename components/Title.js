import React from 'react'
import { StyleSheet, View,Text } from 'react-native'
import PropTypes from "prop-types"

export default function Title(props) {

    return (
        <View style={styles.title} >
            <Text style={[styles.titleText, { fontFamily: 'BigYoungMediumGB2.0'}]}>{props.titleText}</Text>
            <Text style={styles.subText}>{props.subText}</Text>
        </View>
    )
}

Title.propTypes = {
    titleText: PropTypes.string.isRequired,
    subText: PropTypes.string,
}
Title.defaultProps = {
    subText: '',
}
const styles = StyleSheet.create({
    title: {
        alignItems: 'center',
        marginBottom: 20,
    },
    titleText: {
        fontSize: 30,
        lineHeight: 40,
        letterSpacing: 2
    },
    subText: {
        fontSize: 12,
        lineHeight: 20,
        color:'#333'
    }
})