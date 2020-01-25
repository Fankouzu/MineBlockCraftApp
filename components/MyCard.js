import React from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from "prop-types"

export default function MyCard(props) {
    return (
        <View style={[styles.MyCard,
        {
            width: props.screenWidth * (1 - props.margin * 2),
            marginLeft: props.screenWidth * props.margin,
            marginRight: props.screenWidth * props.margin,
            marginTop: props.top
        }]}>
            {props.children}
        </View>
    )
}

MyCard.propTypes = {
    screenWidth: PropTypes.number.isRequired,
    margin: PropTypes.number,
    top: PropTypes.number,
    children: PropTypes.node,
}
MyCard.defaultProps = {
    top: 0,
    margin: 0.1,
    children: null,
}
const styles = StyleSheet.create({
    MyCard: {
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#aaa',
        padding: 15,
        elevation: 5,
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowRadius: 10,
        shadowOffset: {
            height: 10,
            width: 10
        }
    }
})