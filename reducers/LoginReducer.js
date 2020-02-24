import * as Types from '../actions/Types'

const LoginReducer = (
    state = {
        mnemonicCn: '',
        mnemonicEn: '',
        useMnemonic: '',
        lang: '',
        randomMnemonic: [],
    }, action) => {
    switch (action.type) {
        case Types.SET_IMPORT_MNEMONIC:
            return {
                ...state,
                useMnemonic: action.useMnemonic
            }
        case Types.SET_MNEMONIC_CN:
            return {
                ...state,
                mnemonicCn: action.mnemonicCn
            }
        case Types.SET_MNEMONIC_EN:
            return {
                ...state,
                mnemonicEn: action.mnemonicEn
            }
        case Types.SET_USE_MNEMONIC:
            return {
                ...state,
                useMnemonic: action.useMnemonic
            }
        case Types.SET_DEFAULT_MNEMONIC:
            return {
                ...state,
                mnemonicCn: action.mnemonicCn,
                useMnemonic: action.mnemonicCn,
                lang: 'cn'
            }
        case Types.SET_LANG:
            return {
                ...state,
                useMnemonic: action.lang === 'cn' ? state.mnemonicCn : state.mnemonicEn,
                lang: action.lang
            }
        case Types.SET_RANDOM_MNEMONIC:
            return {
                ...state,
                randomMnemonic: action.randomMnemonic,
            }
        default:
            return state
    }
}

export default LoginReducer