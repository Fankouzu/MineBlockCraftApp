import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import MainScreen from '../Screens/MainScreen'
import Ethereum from '../Screens/Ethereum'
import GesturePassword from '../Screens/GesturePassword'
import {Dapps} from '../Dapps'

const AppNavigator = createStackNavigator(
    {
        GesturePassword: {
            screen: GesturePassword
        },
        MainScreen: {
            screen: MainScreen
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