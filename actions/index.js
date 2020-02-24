import * as Types from './Types'

export const setAccounts = (accounts) => ({
    type: Types.SET_ACCOUNTS,
    accounts
})

export const setCurrentAccount = (currentAccount) => {
    return ({
        type: Types.SET_CURRENT_ACCOUNT,
        currentAccount
    })
}

export const setNetworkId = (networkId) => ({
    type: Types.SET_NETWORK_ID,
    networkId
})

export const setEncrypt = (encrypt) => ({
    type: Types.SET_ENCRYPT,
    encrypt
})

export const setWallet = (wallet) => ({
    type: Types.SET_WALLET,
    wallet
})

export const setPasswordModalVisiable = (isPasswordModalVisible) => ({
    type: Types.SET_PASSWORD_MODAL_VISIABLE,
    isPasswordModalVisible
})

export const setNetworkModalVisiable = (isNetworkModalVisible) => ({
    type: Types.SET_NETWORK_MODAL_VISIABLE,
    isNetworkModalVisible
})

export const setShowBalanceLoading = (isShowBalanceLoading) => ({
    type: Types.SET_SHOW_BALANCE_LOADING,
    isShowBalanceLoading
})
export const selectAccount = (accounts, currentAccount, isPasswordModalVisible) => ({
    type: Types.SELECT_ACCOUNT,
    accounts: accounts,
    isPasswordModalVisible,
    currentAccount
})

export const setImportMnemonic = (useMnemonic) => ({
    type: Types.SET_IMPORT_MNEMONIC,
    useMnemonic
})

export const setMnemonicCn = (mnemonicCn) => ({
    type: Types.SET_MNEMONIC_CN,
    mnemonicCn
})

export const setMnemonicEn = (mnemonicEn) => ({
    type: Types.SET_MNEMONIC_EN,
    mnemonicEn
})

export const setUseMnemonic = (useMnemonic) => ({
    type: Types.SET_USE_MNEMONIC,
    useMnemonic
})

export const setDefaultMnemonic = (mnemonicCn) => ({
    type: Types.SET_DEFAULT_MNEMONIC,
    mnemonicCn
})

export const setLang = (lang) => ({
    type: Types.SET_LANG,
    lang
})

export const setRandomMnemonicCn = (randomMnemonicCn) => {
    return dispatch => {
        dispatch({
            type: Types.SET_RANDOM_MNEMONIC_CN,
            randomMnemonicCn,
        })
    }
}

export const setRandomMnemonic = (randomMnemonic) => ({
    type: Types.SET_RANDOM_MNEMONIC,
    randomMnemonic
})

// export const setCurrentAccount = (account) => {
//     console.log('types',types)
//     return dispatch => {
//         dispatch({
//             type: Types.SET_CURRENT_ACCOUNT,
//             account: account,
//         })
//     }
// }
