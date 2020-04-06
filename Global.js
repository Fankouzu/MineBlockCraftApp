import { Dimensions, Platform, StatusBar, PixelRatio ,InteractionManager} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import Storage from 'react-native-storage'

const { width, height, scale } = Dimensions.get('window')
const OS = Platform.OS
const ios = (OS === 'ios')
const android = (OS === 'android')
const isIPhoneX = (ios && height === 812 && width === 375)
const statusBarHeight = (ios ? (isIPhoneX ? 44 : 20) : StatusBar.currentHeight)


let storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true,
})

const _setTimeout = global.setTimeout;
const _clearTimeout = global.clearTimeout;
const MAX_TIMER_DURATION_MS = 60 * 1000;
if (Platform.OS === 'android') {
    // Work around issue `Setting a timer for long time`
    // see: https://github.com/firebase/firebase-js-sdk/issues/97
    const timerFix = {};
    const runTask = (id, fn, ttl, args) => {
        const waitingTime = ttl - Date.now();
        if (waitingTime <= 1) {
            InteractionManager.runAfterInteractions(() => {
                if (!timerFix[id]) {
                    return;
                }
                delete timerFix[id];
                fn(...args);
            });
            return;
        }

        const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
        timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
    };

    global.setTimeout = (fn, time, ...args) => {
        if (MAX_TIMER_DURATION_MS < time) {
            const ttl = Date.now() + time;
            const id = '_lt_' + Object.keys(timerFix).length;
            runTask(id, fn, ttl, args);
            return id;
        }
        return _setTimeout(fn, time, ...args);
    };

    global.clearTimeout = id => {
        if (typeof id === 'string' && id.substr(0, 4) === '_lt_') {
            _clearTimeout(timerFix[id]);
            delete timerFix[id];
            return;
        }
        _clearTimeout(id);
    };
}
global.storage = storage
global.screenWidth = width
global.screenHeight = height
global.scale = scale
global.statusBarHeight = statusBarHeight
global.onePixelRatio = 1 / PixelRatio.get()
global.ios = ios
global.android = android
global.isIPhoneX = isIPhoneX
