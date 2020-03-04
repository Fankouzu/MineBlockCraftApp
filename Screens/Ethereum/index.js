import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Send from './Send'
import Recive from './Recive'
import QRCodeScan from './QRCodeScan'
import Ethereum from './Ethereum'

const AppNavigator = createStackNavigator(
    {
        Ethereum: {
            screen: Ethereum
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
    },
    {
        initialRouteName: 'Ethereum',
        headerMode: 'none',
        headerTransitionPreset: 'fade-in-place',
        mode: 'card',
        CardStyleInterpolators: 'forRevealFromBottomAndroid',
    }
)
export default createAppContainer(AppNavigator)