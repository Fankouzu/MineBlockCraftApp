import React from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import MainNav from './navigation/MainNav'
import './Global'

export default function App() {
    return (
      <View style={[styles.container]}>
        {global.ios && <StatusBar barStyle="default" />}
        <MainNav/>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
