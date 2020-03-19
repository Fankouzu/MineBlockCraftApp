import * as Types from '../actions/Types'

const WalletReducer = (
    state = {
        accounts: [],
        currentAccount: 0,
        networkId: 0,
        encrypt: '',
        mnemonic: '',
        gesture: '',
    }, action) => {
    switch (action.type) {
        case Types.SET_CURRENT_ACCOUNT:
            return {
                ...state, currentAccount: action.currentAccount
            }
        case Types.SET_ACCOUNTS:
            return {
                ...state, accounts: action.accounts
            }
        case Types.SET_NETWORK_ID:
            return {
                ...state, networkId: action.networkId
            }
        case Types.SET_ENCRYPT:
            return {
                ...state, encrypt: action.encrypt
            }
        case Types.SET_WALLET:
            return {
                accounts: action.wallet.accounts,
                currentAccount: action.wallet.currentAccount,
                networkId: action.wallet.networkId,
                encrypt: action.wallet.encrypt
            }
        case Types.SELECT_ACCOUNT:
            return {
                ...state,
                accounts: action.accounts,
                currentAccount: action.currentAccount
            }
        case Types.SET_MNEMONIC:
            return {
                ...state, mnemonic: action.mnemonic
            }
        case Types.SET_GESTURE:
            return {
                ...state, gesture: action.gesture
            }
        default:
            return state
    }
}

export default WalletReducer