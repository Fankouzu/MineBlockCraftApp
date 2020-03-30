import * as Types from './Types'

// export const setCurrentAccount = (account) => {
//     console.log('types',types)
//     return dispatch => {
//         dispatch({
//             type: Types.SET_CURRENT_ACCOUNT,
//             account: account,
//         })
//     }
// }

//WalletReducer

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

export const setMnemonic = (mnemonic) => ({
    type: Types.SET_MNEMONIC,
    mnemonic
})

//WalletMain

export const setContract = (contract) => ({
    type: Types.SET_CONTRACT,
    contract
})
export const setMsgList = (msgList) => ({
    type: Types.SET_MSGLIST,
    msgList
})
export const setProfileModalVisiable = (isProfileModalVisible) => ({
    type: Types.SET_PROFILE_MODAL_VISIABLE,
    isProfileModalVisible
})
export const setSendPasswordModalVisiable = (isSendPasswordModalVisible) => ({
    type: Types.SET_SEND_PASSWORD_MODAL_VISIABLE,
    isSendPasswordModalVisible
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
//Login
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

//Send

export const setFromAddress = (fromAddress) => ({
    type: Types.SET_FROM_ADDRESS,
    fromAddress
})

export const setToAddress = (toAddress) => ({
    type: Types.SET_TO_ADDRESS,
    toAddress
})

export const setAmount = (amount) => ({
    type: Types.SET_AMOUNT,
    amount
})

export const setBalance = (balance) => ({
    type: Types.SET_BALANCE,
    balance
})

export const setEthPrice = (ethPrice) => ({
    type: Types.SET_ETH_PRICE,
    ethPrice
})

export const setNote = (note) => ({
    type: Types.SET_NOTE,
    note
})

export const setGasPrice = (gasPrice) => ({
    type: Types.SET_GAS_PRICE,
    gasPrice
})

export const setMyGasPrice = (myGasPrice) => ({
    type: Types.SET_MY_GAS_PRICE,
    myGasPrice
})

export const setGasLimit = (gasLimit) => ({
    type: Types.SET_GAS_LIMIT,
    gasLimit
})

export const setTX = (tx) => ({
    type: Types.SET_TX,
    tx
})

export const setReceipt = (receipt) => ({
    type: Types.SET_RECEIPT,
    receipt
})

export const clearSend = () => ({
    type: Types.CLEAR_SEND
})

//Gesture

export const setGesture = () => ({
    type: Types.SET_GESTURE
})

//SendToken

export const setTokenTx = (tokenTx) => ({
    type: Types.SET_TOKENTX,
    tokenTx
})

export const setTokenFromAddress = (fromAddress) => ({
    type: Types.SET_TOKEN_FROM_ADDRESS,
    fromAddress
})

export const setTokenToAddress = (toAddress) => ({
    type: Types.SET_TOKEN_TO_ADDRESS,
    toAddress
})

export const setTokenAmount = (amount) => ({
    type: Types.SET_TOKEN_AMOUNT,
    amount
})

export const setTokenBalance = (balance) => ({
    type: Types.SET_TOKEN_BALANCE,
    balance
})

export const setTokenTransferTx = (tx) => ({
    type: Types.SET_TOKEN_TRANSFER_TX,
    tx
})

export const setTokenReceipt = (receipt) => ({
    type: Types.SET_TOKEN_RECEIPT,
    receipt
})

export const clearTokenSend = () => ({
    type: Types.CLEAR_TOKEN_SEND
})