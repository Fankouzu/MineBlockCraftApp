import React from 'react'
import { StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default function LoadingDot() {
    const [styleArr, setStyleArr] = React.useState([])
    React.useEffect(() => {
        var i = 0
        setInterval(() => {
            const activeDot = []
            for (var j = 0; j < 5; j++) {
                if (i === j) {
                    activeDot[j] = { backgroundColor: '#fff' }
                } else {
                    activeDot[j] = { backgroundColor: '#390' }
                }
            }
            i++
            if (i > 4) i = 0
            setStyleArr(activeDot)
        }, 500)
    }, [])
    return (
        <View style={styles.animation}>
            <View style={[styles.dot, styleArr[0]]}></View>
            <View style={[styles.dot, styleArr[1]]}></View>
            <View style={[styles.dot, styleArr[2]]}></View>
            <View style={[styles.dot, styleArr[3]]}></View>
            <View style={[styles.dot, styleArr[4]]}></View>
            <Icon
                name='keyboard-arrow-right'
                size={25}
                color='#390'
                style={styles.arrow}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    animation: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    dot: {
        width: 5,
        height: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#390',
        marginLeft: 10
    },
    arrow: {
        width: 25,
        height: 25,
    }
})
