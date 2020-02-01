import * as React from 'react'
import MyButton from '../components/MyButton'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import WelcomeNav from './WelcomeNav'
import CreateNav from './CreateNav'
import ImportNav from './ImportNav'

const AppNavigator = createStackNavigator(
    {
        WelcomeNav: {
            screen: WelcomeNav,
        },
        CreateNav: {
            screen: CreateNav,
        },
        ImportNav: {
            screen: ImportNav,
        },
    },
    {
        initialRouteName: 'WelcomeNav',
        headerMode: 'none',
        headerTransitionPreset: 'fade-in-place',
        mode: 'card',
        CardStyleInterpolators: 'forRevealFromBottomAndroid',
    }
)
const welcomeOptions = ({ navigation }) => {
    let header
    const headerStyle = { height: 0 }
    const headerTransparent = true
    return { headerStyle, headerTransparent, header }
}
const StackOptions = ({ navigation }) => {
    const { goBack } = navigation;
    let header
    const headerStyle = { height: 50 }
    const headerTransparent = true
    const headerLeft = (
        <MyButton
            text='<'
            screenWidth={25}
            height={26}
            backgroundColor='#fff'
            backgroundDarker='#666'
            textColor='#000'
            borderColor='#666'
            borderWidth={1}
            raiseLevel={2}
            borderRadius={25}
            style={{ margin: global.screenWidth * 0.05}}
            textSize={10}
            onPress={() => goBack()}
        />
    )
    return { headerStyle, headerTransparent, headerLeft, header }
}
export default createAppContainer(AppNavigator)