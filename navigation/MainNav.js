import {createSwitchNavigator, createAppContainer} from 'react-navigation'
import AuthLoading from '../screen/AuthLoading'
import LoginNav from '../navigation/LoginNav'
import WalletNav from '../navigation/WalletNav'
export default createAppContainer(createSwitchNavigator(
    {
      AuthLoading: AuthLoading,
      WalletNav: WalletNav,
      LoginNav: LoginNav,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  ))
  