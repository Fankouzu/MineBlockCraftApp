import React from 'react'
import { createAppContainer } from 'react-navigation'
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch'
import { Transition } from 'react-native-reanimated'
import AuthLoading from '../screen/AuthLoading'
import LoginNav from '../navigation/LoginNav'
import WalletNav from '../navigation/WalletNav'
export default createAppContainer(createAnimatedSwitchNavigator(
    {
        AuthLoading: AuthLoading,
        WalletNav: WalletNav,
        LoginNav: LoginNav,
    },
    {
        initialRouteName: 'AuthLoading',
        transition: (
            <Transition.Together>
                <Transition.Out
                    type="slide-bottom"
                    durationMs={400}
                    interpolation="easeIn"
                />
                <Transition.In type="fade" durationMs={500} />
            </Transition.Together>
        )
    }
))
