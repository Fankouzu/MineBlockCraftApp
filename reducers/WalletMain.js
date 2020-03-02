import * as Types from '../actions/Types'

const WalletMain = (
    state = {
        isPasswordModalVisible: false,
        isSendPasswordModalVisible: false,
        isNetworkModalVisible: false,
        isShowBalanceLoading: 'flex'
    }, action) => {
    switch (action.type) {
        case Types.SET_PASSWORD_MODAL_VISIABLE:
            return {
                ...state,
                isPasswordModalVisible: action.isPasswordModalVisible
            }
        case Types.SET_SEND_PASSWORD_MODAL_VISIABLE:
            return {
                ...state,
                isSendPasswordModalVisible: action.isSendPasswordModalVisible
            }
        case Types.SET_NETWORK_MODAL_VISIABLE:
            return {
                ...state,
                isNetworkModalVisible: action.isNetworkModalVisible
            }
        case Types.SET_SHOW_BALANCE_LOADING:
            return {
                ...state,
                isShowBalanceLoading: action.isShowBalanceLoading
            }
        case Types.SELECT_ACCOUNT:
            return {
                ...state,
                isPasswordModalVisible: action.isPasswordModalVisible
            }
        default:
            return state
    }
}

export default WalletMain