import { combineReducers } from 'redux'
import WalletReducer from './WalletReducer'
import WalletMain from './WalletMain'
import LoginReducer from './LoginReducer'


export default rootReducer = combineReducers({
    WalletReducer: WalletReducer,
    WalletMain: WalletMain,
    LoginReducer:LoginReducer,
})