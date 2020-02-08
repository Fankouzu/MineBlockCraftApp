import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import WalletFrame from '../screen/WalletFrame'
import Send from '../screen/Send'

const AppNavigator = createStackNavigator(
    {
        WalletFrame: {
            screen: WalletFrame
        },
        Send: {
            screen: Send
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