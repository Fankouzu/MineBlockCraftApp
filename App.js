import React from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import { Provider } from 'react-redux'
import MainNav from './navigation/MainNav'
import store from './store'
import './Global'


export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={[styles.container]}>
          {global.ios && <StatusBar barStyle="default" />}
          <MainNav />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
