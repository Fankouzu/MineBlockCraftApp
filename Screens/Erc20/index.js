import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import SendToken from './SendToken'
import ReciveToken from './ReciveToken'
import Token from './Token'
import Erc20 from './Erc20'

const AppNavigator = createStackNavigator(
    {
        Erc20: {
            screen: Erc20,
        },
        Token: {
            screen: Token,
        },
        SendToken: {
            screen: SendToken,
        },
        ReciveToken: {
            screen: ReciveToken,
        },
    },
    {
        initialRouteName: 'Erc20',
        headerMode: 'none',
        headerTransitionPreset: 'fade-in-place',
        mode: 'card',
        CardStyleInterpolators: 'forRevealFromBottomAndroid',
    }
)
export default createAppContainer(AppNavigator)
