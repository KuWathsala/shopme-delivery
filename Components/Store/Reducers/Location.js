import * as actionTypes from '../Actions/ActionType';
import {updateObject} from '../utility';

const initialState={
    currentLocation:{
        lat: 6.9271,
        lng: 79.8612
    },
    shopLocation:{
        lat:7.0271,
        lng:80.0612
    },
    customerLocation:{
        lat:7.1271,
        lng:80.1612
    },
}

const markerLocation=(state,action)=>{
    return updateObject(state,{
        shopLocation:{
            lat:action.lat,
            lng:action.lng
        }
    })
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.MARKER_LOCATION:return markerLocation(state,action)
        default:return state;
    }
}
export default reducer;