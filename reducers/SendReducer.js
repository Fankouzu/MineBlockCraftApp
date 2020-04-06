import * as Types from '../actions/Types'

const SendReducer = (
    state = {
        fromAddress: '',
        toAddress: '',
        networkId: 0,
        amount: 0,
        balance: 0,
        ethPrice: 0,
        note: '',
        gasPrice: 0,
        myGasPrice: 0,
        gasLimit: 21000,
        tx: {},
        receipt: {},
    }, action) => {
    switch (action.type) {
        case Types.SET_FROM_ADDRESS:
            return {
                ...state, fromAddress: action.fromAddress,
            }
        case Types.SET_TO_ADDRESS:
            return {
                ...state, toAddress: action.toAddress,
            }
        case Types.SET_NETWORK_ID:
            return {
                ...state, networkId: action.networkId,
            }
        case Types.SET_AMOUNT:
            return {
                ...state, amount: action.amount,
            }
        case Types.SET_BALANCE:
            return {
                ...state, balance: action.balance,
            }
        case Types.SET_ETH_PRICE:
            return {
                ...state, ethPrice: action.ethPrice,
            }
        case Types.SET_NOTE:
            return {
                ...state, note: action.note,
            }
        case Types.SET_GAS_PRICE:
            return {
                ...state, gasPrice: action.gasPrice,
            }
        case Types.SET_MY_GAS_PRICE:
            return {
                ...state, myGasPrice: action.myGasPrice,
            }
        case Types.SET_GAS_LIMIT:
            return {
                ...state, gasLimit: action.gasLimit,
            }
        case Types.SET_TX:
            return {
                ...state, tx: action.tx,
            }
        case Types.SET_RECEIPT:
            return {
                ...state, receipt: action.receipt,
            }
        case Types.CLEAR_SEND:
            return {
                fromAddress: '',
                toAddress: '',
                networkId: 0,
                amount: 0,
                balance: 0,
                ethPrice: 0,
                note: '',
                gasPrice: 0,
                myGasPrice: 0,
                gasLimit: 21000,
                tx: {},
                receipt: {},
            }
        default:
            return state
    }
}

export default SendReducer
