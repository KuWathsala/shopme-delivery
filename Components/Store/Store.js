import {createStore,applyMiddleware,compose,combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { createLogger} from 'redux-logger';
import locationRecucer from './Reducers/Location';
import authReducer from './Reducers/Auth';
import {reducer as formReducer} from 'redux-form';

const rootReducer=combineReducers({
    location:locationRecucer,
    auth:authReducer,
    form:formReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const logger=createLogger({diff:true,collapsed:true});

export default createStore(rootReducer,composeEnhancers(applyMiddleware(logger,thunk)));