import { combineReducers } from 'redux'
import WalletReducer from './WalletReducer'
import WalletMain from './WalletMain'
import LoginReducer from './LoginReducer'
import SendReducer from './SendReducer'
import TokenReducer from './TokenReducer'


export default rootReducer = combineReducers({
    WalletReducer: WalletReducer,
    WalletMain: WalletMain,
    LoginReducer:LoginReducer,
    SendReducer:SendReducer,
    TokenReducer:TokenReducer,
})