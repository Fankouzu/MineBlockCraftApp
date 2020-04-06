import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import PropTypes from 'prop-types'

export default function AlertText(props) {

    const [alertText, setAlertText] = React.useState(props.alertText)
    React.useEffect(() => {
        setAlertText(props.alertText)
    }, [props.alertText])

    const [alertColor, setAlertColor] = React.useState(props.alertColor)
    React.useEffect(() => {
        setAlertColor(props.alertColor)
    }, [props.alertColor])

    return (
        <View style={styles.alert}>
            {alertText.map((item, index) => {
                return (
                    <Text
                        key={index}
                        style={[
                            styles.alertText, {
                                color: alertColor,
                                textAlign: props.textAlign,
                            }]}>
                        {item}
                    </Text>
                )
            })}
        </View>
    )
}

AlertText.propTypes = {
    alertText: PropTypes.array.isRequired,
    alertColor: PropTypes.string,
    textAlign: PropTypes.string,
}
AlertText.defaultProps = {
    alertColor: '#F30',
    textAlign: 'center',
}
const styles = StyleSheet.create({
    alert: {
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    alertText: {
        textAlign: 'left',
        fontStyle: 'italic',
        fontSize: 12,
        lineHeight: 20,
    },
})
