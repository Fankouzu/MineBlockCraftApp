import React from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import { Provider } from 'react-redux'
import MainNav from './navigation/MainNav'
import store from './store'
import SplashScreen from 'react-native-splash-screen'
import './Global'


export default class App extends React.Component {
  componentDidMount () {
    SplashScreen.hide()
  }
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
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
})
