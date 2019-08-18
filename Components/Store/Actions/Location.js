import * as ActionTypes from './ActionType';

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