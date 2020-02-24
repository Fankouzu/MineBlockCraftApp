import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'

const logger = store => next => action => {
    if (typeof action === 'function') {
        //console.log('dispatching a function',action)
    } else {
        console.log('dispatching', action)
    }
    //console.log('nextState', store.getState())
    return next(action)
}
const middlewares = [
    logger,  // 打印 state 信息
    thunk,   // 提供异步 action
]

// 在 store 中添加中间件, 配置 reducer
export default createStore(rootReducer, applyMiddleware(...middlewares))