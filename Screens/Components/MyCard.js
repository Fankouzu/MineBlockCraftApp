import React from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

export default function MyCard(props) {
    return (
        <View style={[styles.MyCard,
        {
            width: props.screenWidth * (1 - props.margin * 2),
            marginHorizontal: props.screenWidth * props.margin,
            marginTop: props.top,
            padding: props.padding,
            height:props.height,
        },props.style]}>
            {props.children}
        </View>
    )
}

MyCard.defaultProps = {
    top: 0,
    margin: 0.1,
    children: null,
    padding: 15,
}
MyCard.propTypes = {
    screenWidth: PropTypes.number.isRequired,
    margin: PropTypes.number,
    top: PropTypes.number,
    padding: PropTypes.number,
    height: PropTypes.number,
    children: PropTypes.node,
}
const styles = StyleSheet.create({
    MyCard: {
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#aaa',
        padding: 15,
        elevation: 0,
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowRadius: 10,
        shadowOffset: {
            height: 10,
            width: 10,
        },
        flex: 0,
        marginBottom: 10,
        overflow:'hidden',
    },
})
