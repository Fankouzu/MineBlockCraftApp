import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { BarIndicator } from 'react-native-indicators'
import PropTypes from 'prop-types'

export default function Loading(props) {

    const [display, setDisplay] = React.useState({display:'none'})


    React.useEffect(() => {
        if(props.display){
            setDisplay({display:'flex',position:'absolute'})
        } else{
            setDisplay({display:'none'})
        }
    }, [props.display])
    return (
        <View style={[styles.Container,display,{
            backgroundColor:props.backgroundColor
        }]} >
            <BarIndicator count={5} size={40} color='#0f0' />
        </View>
    )
}

Loading.propTypes = {
    display: PropTypes.bool.isRequired,
    backgroundColor:PropTypes.string
}
Loading.defaultProps = {
    display: false,
    backgroundColor:'#000'
}
const styles = StyleSheet.create({
    Container: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        opacity: 0.7,
        elevation: 1,
    },
})