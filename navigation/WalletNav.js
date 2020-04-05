import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import MainScreen from '../Screens/MainScreen'
import Ethereum from '../Screens/Ethereum'
import GesturePassword from '../Screens/GesturePassword'
import Chat from '../Screens/Chat'
import Erc20 from '../Screens/Erc20'
import MintCoin from '../Screens/MintCoin'
import {Dapps} from '../Dapps'

const AppNavigator = createStackNavigator(
    {
        GesturePassword: {
            screen: GesturePassword
        },
        MainScreen: {
            screen: MainScreen
        },
        Chat: {
            screen: Chat
        },
        Ethereum:{
            screen: Ethereum
        },
        Erc20:{
            screen: Erc20
        },
        MintCoin:{
            screen: MintCoin
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