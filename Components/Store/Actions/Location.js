import * as ActionTypes from './ActionType';

export const location=(lat,lng)=>{
    return{
        type:ActionTypes.MARKER_LOCATION,
        lat:lat,
        lng:lng
        };
};