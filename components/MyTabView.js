import * as React from 'react'
import { View, StyleSheet, Text,Clipboard } from 'react-native'
import { TabBar, TabView, SceneMap } from 'react-native-tab-view'
import PropTypes from 'prop-types'

export default function MyTabView(props) {
    const [index, setIndex] = React.useState(0)
    const [routes] = React.useState([
        { key: 'first', title: '中文助记词' },
        { key: 'second', title: '英文助记词' },
    ])
    React.useEffect(() => {
        props.changeLang(index)
    }, [index])
    
    const renderScene = SceneMap({
        first: () => 
            <View style={styles.scene}>
                <Text 
                    style={[
                        styles.mnemonic_zh,
                        {
                            letterSpacing:(global.screenWidth*0.9-10)/4 - 30
                        }]} 
                    onPress={()=>{
                        Clipboard.setString(props.mnemonic_zh)
                    }}
            >
                    {props.mnemonic_zh.replace(/ /g,'')}
                </Text>
            </View>,
        second: () => 
            <View style={styles.scene} >
                <Text 
                style={styles.mnemonic_en}
                onPress={()=>{
                    Clipboard.setString(props.mnemonic_en)
                }}
                >
                {props.mnemonic_en.replace(/ /g,'    ')}
                </Text>
            </View>
    })
    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#390' }}
            style={{ backgroundColor: 'red',borderRadius:10 }}
            labelStyle={{ color: 'black', shadowColor: '#0f0' }}
            pressColor='#6f0'
            inactiveColor='#f00'
            swipeEnabled={true}
            style={{ backgroundColor: '#fff', elevation: 0 ,borderRadius:10}}
        />
    )
    return (
        <TabView
            renderTabBar={renderTabBar}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={(index)=>setIndex(index)}
            swipeEnabled={true}
            initialLayout={{width:global.screenWidth,height:200}}
            style={{flex:0,height:210}}
        />
    )
}

MyTabView.defaultProps = {
    changeLang: null,
}
MyTabView.propTypes = {
    changeLang: PropTypes.func,
}
const styles = StyleSheet.create({
    scene: {
        flex: 0
    },
    mnemonic_zh: {
        fontSize:24,
        textAlign:'center',
        alignContent:'space-between',
        lineHeight:52,
        paddingLeft:5,
        paddingRight:5,
        fontFamily: 'BigYoungMediumGB2.0'
    },
    mnemonic_en: {
        fontSize:20,
        textAlign:'center',
        justifyContent:'space-evenly',
        lineHeight:40,
        paddingLeft:10,
        paddingRight:10,
        fontFamily: 'console'
    }
})