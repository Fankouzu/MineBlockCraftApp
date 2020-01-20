import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import OpenWallet from '../screen/OpenWallet'
import Mnemonic from '../screen/Mnemonic'

const AppNavigator = createStackNavigator(
    {
        Open: {
            screen: OpenWallet,
        },
        Mnemonic: {
            screen: Mnemonic,
        },
    },
    {
        initialRouteName: 'Open',
        headerMode: 'none',
    }
)

export default createAppContainer(AppNavigator)