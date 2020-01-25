import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Welcome from '../screen/Welcome'
import OpenWallet from '../screen/OpenWallet'
import Mnemonic from '../screen/Mnemonic'

const AppNavigator = createStackNavigator(
    {
        Welcome: {
            screen: Welcome
        },
        Open: {
            screen: OpenWallet
        },
        Mnemonic: {
            screen: Mnemonic,
        },
    },
    {
        initialRouteName: 'Welcome',
        headerMode: 'none',
        headerTransitionPreset:'fade-in-place',
        mode:'card',
        CardStyleInterpolators:'forRevealFromBottomAndroid'
    }
)

export default createAppContainer(AppNavigator)