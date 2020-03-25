import * as Types from '../actions/Types'

const WalletMain = (
    state = {
        contract: {},
        msgList: { error: -1, result: [] },
        isProfileModalVisible: false,
        isSendPasswordModalVisible: false,
        isNetworkModalVisible: false,
        isShowBalanceLoading: 'flex',
    }, action) => {
    switch (action.type) {
        case Types.SET_CONTRACT:
            return {
                ...state,
                contract: action.contract
            }
        case Types.SET_MSGLIST:
            return {
                ...state,
                msgList: action.msgList
            }
        case Types.SET_PROFILE_MODAL_VISIABLE:
            return {
                ...state,
                isProfileModalVisible: action.isProfileModalVisible
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