import React from 'react'
import { StyleSheet, View } from 'react-native'
import CheckBox from 'react-native-check-box'

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
                checkBoxColor='#999'
                checkedCheckBoxColor='#1976d2'
                rightTextStyle={styles.CheckBox}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    checkView: {
        marginTop: 25,
        marginBottom: 25,
    },
    CheckBox: {
        color: '#333',
        fontSize: 14,
    }
})