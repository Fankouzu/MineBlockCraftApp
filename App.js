import React from 'react'
import { Platform, StatusBar, StyleSheet, View } from 'react-native'

import LoginNav from './navigation/LoginNav';

export default function App() {

    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <LoginNav />
      </View>
    )
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
