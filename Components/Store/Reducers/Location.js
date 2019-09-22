import * as actionTypes from '../Actions/ActionType';
import {updateObject} from '../utility';

const initialState={
    products:[],
    sourceLocation:{
        latitude: 6.837673280321542,
        longitude: 79.90480335265398
    },
    shopLocation:{
        latitude: 6.877673280321542,
        longitude: 79.93480335265398
    },
    customerLocation:{
        latitude:6.873673280321542,
        longitude:79.92480335265398
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

const reachShop=(state,action)=>{
    console.log("ISREACHEDDDD");
    return updateObject(state,{
        isReach:action.isReach
    })
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.CURRENT_LOCATION:return currentLocation(state,action);
        case actionTypes.REACH_SHOP:return reachShop(state,action);
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
