import * as Types from '../actions/Types'

const TokenReducer = (
    state = {
        tokenTx: { error: -2 },
        toAddress: '',
        fromAddress:'',
        amount: 0,
        balance: 0,
        tx: {},
        receipt: {},
    }, action) => {
    switch (action.type) {
        case Types.SET_TOKENTX:
            return {
                ...state, tokenTx: action.tokenTx
            }
        case Types.SET_TOKEN_TO_ADDRESS:
            return {
                ...state, toAddress: action.toAddress
            }
            case Types.SET_TOKEN_FROM_ADDRESS:
                return {
                    ...state, fromAddress: action.fromAddress
                }
        case Types.SET_TOKEN_AMOUNT:
            return {
                ...state, amount: action.amount
            }
        case Types.SET_TOKEN_BALANCE:
            return {
                ...state, balance: action.balance
            }
        case Types.SET_TOKEN_TRANSFER_TX:
            return {
                ...state, tx: action.tx
            }
        case Types.SET_TOKEN_RECEIPT:
            return {
                ...state, receipt: action.receipt
            }
        case Types.CLEAR_TOKEN_SEND:
            return {
                ...state,
                toAddress: '',
                fromAddress:'',
                amount: 0,
                balance: 0,
                tx: {},
                receipt: {},
            }
        default:
            return state
    }
}

export default TokenReducer