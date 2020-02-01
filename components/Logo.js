import React from 'react'
import {StyleSheet,View, Image} from 'react-native'

export default function Logo() {
    const walletLogo = global.scale > 2 ? require(`../assets/bishen-wallet3x.png`) : require(`../assets/bishen-wallet2x.png`)
    return (
        <View style={styles.top} >
            <Image
                source={walletLogo}
                style={{ width: 100, height: 100 }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    top: {
        height: 150,
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'column'
    }
})