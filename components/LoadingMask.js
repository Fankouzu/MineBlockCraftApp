import React from 'react'
import {
    StyleSheet,
    View,
    ActivityIndicator
} from 'react-native'
import PropTypes from 'prop-types'

export default function LoadingMask(props) {
    return (
        <View
            style={{
                display: props.hidden ? 'none' : 'flex'
            }}>
            <View style={[
                styles.mask,
                {
                    height: global.screenHeight,
                    width: global.screenWidth,
                }]}>
                <ActivityIndicator size={60} color="#390" />
            </View>
        </View>
    )
}

LoadingMask.propTypes = {
    hidden: PropTypes.bool
}
LoadingMask.defaultProps = {
    hidden: true,
}
const styles = StyleSheet.create({
    mask: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        position: 'absolute',
        zIndex: 9,
        elevation: 5,
        justifyContent: 'center',
    }
})