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
            <View style={[styles.scene]} >
                <Text>
                    111
                </Text>
            </View>,
        second: () => 
            <View style={[styles.scene]} >
                <Text>
                    111
                </Text>
            </View>
    })
    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#4c91d4' }}
            style={{ backgroundColor: 'white' }}
            labelStyle={{ color: 'black', shadowColor: '#0f0' }}
            pressColor='#4c91d4'
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
            style={styles.MonemonicView}
            initialLayout={initialLayout}
        />
    )
}

const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
    MonemonicView: {
        backgroundColor: 'white',
        height: 200,
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
        marginBottom: 30,
    }
})