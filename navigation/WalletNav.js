import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import MainScreen from '../Screens/MainScreen'
import Send from '../Screens/Send'
import Recive from '../Screens/Recive'
import QRCodeScan from '../Screens/QRCodeScan'
import Ethereum from '../Screens/Ethereum'
import {Dapps} from '../Dapps'

const AppNavigator = createStackNavigator(
    {
        MainScreen: {
            screen: MainScreen
        },
        Send: {
            screen: Send
        },
        Recive: {
            screen: Recive
        },
        QRCodeScan: {
            screen: QRCodeScan
        },
        Ethereum:{
            screen: Ethereum
        },
        Dapps:{
            screen: Dapps
        },
    },
    {
        initialRouteName: 'MainScreen',
        headerMode: 'none',
        headerTransitionPreset: 'fade-in-place',
        mode: 'card',
        CardStyleInterpolators: 'forRevealFromBottomAndroid',
    }
)
export default createAppContainer(AppNavigator)