import { Dimensions, Platform, StatusBar, PixelRatio } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import Storage from 'react-native-storage'

const { width, height, scale } = Dimensions.get('window')
const OS = Platform.OS
const ios = (OS == 'ios')
const android = (OS == 'android')
const isIPhoneX = (ios && height == 812 && width == 375)
const statusBarHeight = (ios ? (isIPhoneX ? 44 : 20) : StatusBar.currentHeight)


let storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true,
})


global.storage = storage
global.screenWidth = width
global.screenHeight = height
global.scale = scale
global.statusBarHeight = statusBarHeight
global.onePixelRatio = 1 / PixelRatio.get()
global.ios = ios
global.android = android
global.isIPhoneX = isIPhoneX