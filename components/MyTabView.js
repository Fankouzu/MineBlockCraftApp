import * as React from 'react'
import { View, StyleSheet, Dimensions, Text } from 'react-native'
import { TabBar, TabView, SceneMap } from 'react-native-tab-view'



const initialLayout = { width: Dimensions.get('window').width }
export default function MyTabView(props) {
    const [index, setIndex] = React.useState(0)
    const [routes] = React.useState([
        { key: 'first', title: '中文助记词' },
        { key: 'second', title: '英文助记词' },
    ])

    const renderScene = SceneMap({
        first: () => 
            <View style={styles.scene}>
                <Text style={styles.mnemonic_zh}>
                    {props.mnemonic_zh}
                </Text>
            </View>,
        second: () => 
            <View style={styles.scene} >
                <Text style={styles.mnemonic_en}>
                {props.mnemonic_en.replace(/ /g,'    ')}
                </Text>
            </View>
    })
    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#390' }}
            style={{ backgroundColor: 'white' }}
            labelStyle={{ color: 'black', shadowColor: '#0f0' }}
            pressColor='#6f0'
            inactiveColor='#f00'
            swipeEnabled={true}
            style={{ backgroundColor: '#fff', elevation: 0 }}
        />
    )
    return (
        <TabView
            renderTabBar={renderTabBar}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            swipeEnabled={true}
            initialLayout={initialLayout}
        />
    )
}

const styles = StyleSheet.create({
    scene: {
        flex: 1
    },
    mnemonic_zh: {
        fontSize:24,
        letterSpacing:20,
        textAlign:'center',
        alignContent:'space-between',
        lineHeight:52,
        paddingLeft:5,
        paddingRight:5
    },
    mnemonic_en: {
        fontSize:20,
        textAlign:'center',
        justifyContent:'space-evenly',
        lineHeight:40,
        paddingLeft:10,
        paddingRight:10
    },
    MonemonicView: {
        backgroundColor: 'white',
        height: 220,
        elevation: 5,
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowRadius: 5,
        shadowOffset: {
            height: 5,
            width: 5
        },
        zIndex: 1,
        borderRadius: 10,
        marginBottom: 20,
    }
})