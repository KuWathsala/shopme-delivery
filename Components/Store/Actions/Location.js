import * as ActionTypes from './ActionType';
import {AsyncStorage} from 'react-native'

export const location=(latitude,longitude)=>{
    return{
        
        type:ActionTypes.CURRENT_LOCATION,
        latitude:latitude,
        longitude:longitude
        };
};

export const isReach=(isReach)=>{
    return{
        type:ActionTypes.REACH_SHOP,
        isReach:isReach
    };
}

//////////////////////////////////////////////////////

export const OrderDataRequest=()=>({
    type: ActionTypes.ORDER_DATA_REQUEST
});

export const OrderDataSuccess=(json)=>({
    type: ActionTypes.ORDER_DATA_SUCCESS,
    payload: json
}); 

export const fetchOrderData=(object,id)=>{
    console.log("object")
    console.log(object)
    let data= {
        sourceLocation:{
            latitude: 6.837673280321542,
            longitude: 79.90480335265398
        },
        shopLocation:{
            latitude: object.shopLocationLatitude,
            longitude: object.shopLocationLongitude
        },
        customerLocation:{
            latitude: object.customerLatitude,
            longitude:object.customerLongitude
        },
        isReach:false,
        shopName: object.shopName,
        customerName: object.firstName+" "+object.lastName
    }
    console.log(data)
    return dispatch=>{
        dispatch(OrderDataRequest());
        dispatch(OrderDataSuccess(data));
        AsyncStorage.setItem("DeliverId",id);
    }
}

export const wrapupdelivery=()=>{
    return dispatch=>{
        dispatch(FinishOrder());
        AsyncStorage.removeItem("DeliverId");
    }
}

export const FinishOrder=()=>({
    type: ActionTypes.FINISH_ORDER,
});