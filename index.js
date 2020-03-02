import {AppRegistry} from 'react-native'
import App from './App'
import {name as appName} from './app.json'

console.disableYellowBox = true
console.log('ok')
AppRegistry.registerComponent(appName, () => App)
