import * as actionTypes from '../Actions/ActionType';
import {updateObject} from '../utility';
import {AsyncStorage} from 'react-native'

const initialState={
    products:[],
    sourceLocation:{
        latitude: 6.837673280321542,
        longitude: 79.90480335265398
    },
    shopLocation:{
        latitude: 6.837673280321542,
        longitude: 79.90480335265398
    },
    customerLocation:{
        latitude:6.837673280321542,
        longitude:79.90480335265398
    },
    InitialLocation:{
        latitude:6.78,
        longitude:79.12
    },
    isReach:false,
    shopName: '',
    customerName: ''
}

const currentLocation=(state,action)=>{
    return updateObject(state,{
        sourceLocation:{
            latitude:action.latitude,
            longitude:action.longitude
        }
    })
}

const startLocation=(state,action)=>{
    return updateObject(state,{
        InitialLocation:{
            latitude:action.latitude,
            longitude:action.longitude
        }
    })
}

const reachShop=(state,action)=>{
    AsyncStorage.setItem("ReachShop","true");
    console.log("ISREACHEDDDD workeddd");
    return updateObject(state,{
        isReach:action.isReach
    })
}

const finishOrder=(state,action)=>{
    return updateObject(state,{
        isReach:action.isReach
    })
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.CURRENT_LOCATION:return currentLocation(state,action);
        case actionTypes.REACH_SHOP:return reachShop(state,action);
        case actionTypes.START_LOCATION:return startLocation(state,action);
        case actionTypes.FINISH_ORDER:return finishOrder(state,action);
        case actionTypes.ORDER_DATA_SUCCESS:
            return { ...state, 
                products:action.payload.products,
                shopLocation: action.payload.shopLocation,
                customerLocation: action.payload.currentLocation,
                shopName: action.payload.shopName,
                customer: action.payload.customerName,
                customerLocation: action.payload.customerLocation//customer location must change
            };
            // case actionTypes.FINISH_ORDER:
            //     return { ...state, 
            //         shopLocation: null,
            //         customerLocation: null,
            //         shopName: null,
            //         customer: null,
            //         customerLocation: null//customer location must change
            //     }; 
            
        default:return state;
    }
}
export default reducer;
