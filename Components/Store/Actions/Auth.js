import * as ActionTypes from './ActionType';
import axios from 'axios';
import { Actions,ActionConst } from 'react-native-router-flux';
import {AsyncStorage} from 'react-native'

export const authStart=()=>{
    return{
        type:ActionTypes.AUTH_START
    };
};

export const checkAuthTImeout=(expirationTime)=>{
    return dispatch=>{setTimeout(()=>{
        dispatch(logout());
    },expirationTime*10000 );
};
};

export const authSuccess=(token,userId,role)=>{
    return{
        type:ActionTypes.AUTH_SUCCESS,
        idToken:token,
        userId:userId,
        role:role,
        
    };
};

export const authFail=(error)=>{
    return{
        type:ActionTypes.AUTH_FAIL,
        error:error
    };
};

export const auth=(authData)=>{
    console.log(authData)
    return dispatch=>{
        dispatch(authStart());
        console.log("auth : ",authData);
        let url='';
            console.log(authData.role);
            url='https://backend-webapi20190825122524.azurewebsites.net/api/UserAuth/Signup-Deliverer';
            axios.post(url,authData)
                .then(response=>{
            console.log(response);
            window.alert('Succesfully Registered')
            dispatch(authSuccess(response.data.data.token,response.data.data.id,response.data.role));
            Actions.login();
            dispatch(checkAuthTImeout(3600/*response.data.expiresIn*/));
        })
        .catch(err=>{
            console.log(err);
            dispatch(authFail(err));
        });
    }
};

export const logout=()=>{
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("expirationDate");
    AsyncStorage.removeItem("userId");
    // localStorage.removeItem('token');
    // localStorage.removeItem('expirationDate');
    // localStorage.removeItem('userId');
    return {
        type:ActionTypes.AUTH_LOGOUT
        
    }
}

export const authVerify=(email,password)=>{
    console.log(email,password+" worked")
    // dispatch.authVerify(email,password);
    return dispatch=>{
        dispatch(authStart());
        const authVerifyData={
            Email:email,
            Password:password,
            returnSecureToken: true
        };
        
        let url='https://backend-webapi20190825122524.azurewebsites.net/api/UserAuth/signin';
        axios.post(url,authVerifyData)
        .then(response=>{
           console.log(response);
           const expirationDate=new Date(new Date().getTime()+/*response.data.expiresIn*/3600*10000);
            if(response.data.role=='Deliverer')
                {(dispatch(authSuccess(response.data.data.token,response.data.data.id,response.data.role)),Actions.Status());
                    AsyncStorage.setItem("token",response.data.data.token);
                    AsyncStorage.setItem("userId",response.data.data.id.toString());
                    AsyncStorage.setItem("expirationDate",expirationDate);
                    AsyncStorage.setItem("role",response.data.role);
                    console.log(response.data.data.id);
                    
                } else
                    window.alert('You are not a Deliverer person')
        })
        .catch(err=>{
            console.log("error");
            console.log(err);
            dispatch(authFail(err));
        });
    };
};

export const authCheckState=()=>{
    return dispatch=>{

        let token
        AsyncStorage.getItem("token").then((value) => {
            token=value;
            console.log(token);
            }).done();
        
        let userId;
        AsyncStorage.getItem("userId").then((value) => {
            userId=value;
            console.log(userId);
            }).done();
        
        let role;
        AsyncStorage.getItem("role").then((value) => {
                    console.log('role'+value);
                   role=value;
                //this.setState({"role": value});
                }).done();
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
        sleep(1000).then(() => {
        if(!token){
            console.log("error dispatching");
            dispatch(logout(),Actions.signIn());
        }
    //     }else{
        
    // AsyncStorage.getItem("expirationDate").then((value) => {
    //             const expirationDate=new Date(value);
    //             console.log('date'+value);
    //             }).done();
        
    //     if(expirationDate<=new Date()){
    //             dispatch(logout());
    //         }
        else{
            
                dispatch(authSuccess(token,userId,role),Actions.Status());
                //dispatch(checkAuthTImeout((expirationDate.getTime()-new Date().getTime())/1000));
            }
            })
        }
    };
