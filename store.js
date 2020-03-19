import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'

const logger = store => next => action => {
    if (typeof action === 'function') {
        //console.log('dispatching a function',action)
    } else {
        console.warn('dispatching', action)
    }
    //console.log('nextState', store.getState())
    return next(action)
}
const middlewares = [
    logger,  
    thunk,   
]

export default createStore(rootReducer, applyMiddleware(...middlewares))