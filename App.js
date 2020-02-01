import React from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import LoginNav from './navigation/LoginNav'
import './Global'

export default function App() {
    console.log(global.screenWidth+'x'+global.screenHeight)
    return (
      <View style={styles.container}>
        {global.ios && <StatusBar barStyle="default" />}
        <LoginNav/>
      </View>
    )
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
