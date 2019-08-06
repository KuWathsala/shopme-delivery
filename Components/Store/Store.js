import {createStore,applyMiddleware,compose,combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { createLogger} from 'redux-logger';
import locationRecucer from './Reducers/Location';
import authReducer from './Reducers/Auth';

const rootReducer=combineReducers({
    location:locationRecucer,
    auth:authReducer
});

const logger=createLogger({diff:true,collapsed:true});

export default createStore(rootReducer,applyMiddleware(logger,thunk));