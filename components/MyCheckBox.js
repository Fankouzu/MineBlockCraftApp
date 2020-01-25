import React from 'react'
import { StyleSheet, View } from 'react-native'
import CheckBox from 'react-native-check-box'
import PropTypes from "prop-types"

export default function MyCheckBox(props) {

    const [checked,setChecked] = React.useState(false)

    const handleCheck = () => {
        setChecked(!checked)
        props.handleCheck(!checked)
    }
    return (
        <View style={styles.checkView}>
            <CheckBox
                rightText='记住密码'
                isChecked={checked}
                onClick={() => handleCheck()}
                checkBoxColor='#666'
                checkedCheckBoxColor={props.checkedCheckBoxColor}
                rightTextStyle={styles.CheckBox}
            />
        </View>
    )
}

MyCheckBox.propTypes = {
    handleCheck: PropTypes.func.isRequired,
    checkedCheckBoxColor: PropTypes.string
}
MyCheckBox.defaultProps = {
    checkedCheckBoxColor: '#390'
}
const styles = StyleSheet.create({
    checkView: {
        marginBottom: 10,
    },
    CheckBox: {
        color: '#666',
        fontSize: 14,
    }
})