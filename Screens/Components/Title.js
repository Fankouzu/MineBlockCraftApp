import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import PropTypes from 'prop-types'

export default function Title(props) {

    return (
        <View style={[styles.title,props.style]} >
            <Text style={[
                styles.titleText,{
                    fontFamily: 'BigYoungMediumGB2.0',
                    fontSize:props.fontSize
                },props.style]}>
                {props.titleText}
            </Text>
            {props.subText !== '' && (<Text style={styles.subText}>{props.subText}</Text>)}
        </View>
    )
}

Title.propTypes = {
    titleText: PropTypes.string.isRequired,
    subText: PropTypes.string,
    fontSize: PropTypes.number,
}
Title.defaultProps = {
    subText: '',
    fontSize: 30,
}
const styles = StyleSheet.create({
    title: {
        alignItems: 'center',
        marginBottom: 10,
    },
    titleText: {
        lineHeight: 40,
        letterSpacing: 2
    },
    subText: {
        fontSize: 12,
        lineHeight: 20,
        color: '#333',
        flex: 0
    }
})