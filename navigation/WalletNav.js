import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import WalletFrame from '../screen/WalletFrame'
import Send from '../screen/Send'
import QRCodeScan from '../screen/QRCodeScan'

const AppNavigator = createStackNavigator(
    {
        WalletFrame: {
            screen: WalletFrame
        },
        Send: {
            screen: Send
        },
        QRCodeScan: {
            screen: QRCodeScan
        }
    },
    {
        initialRouteName: 'WalletFrame',
        headerMode: 'none',
        headerTransitionPreset: 'fade-in-place',
        mode: 'card',
        CardStyleInterpolators: 'forRevealFromBottomAndroid',
    }
)
export default createAppContainer(AppNavigator)