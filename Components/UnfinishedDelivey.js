import React, {Component} from 'react';
import {Text,View,StyleSheet,TextInput,Image,TouchableOpacity,Alert,Linking,KeyboardAvoidingView} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
//import * as actions from '../Store/Actions/index';
import {fetchOrderData,isReach} from './Store/Actions/Location';
import axios from 'axios';
import {AsyncStorage} from 'react-native';

class UnfinishedDelivery extends Component{
    constructor(props) {
        super(props);
        this.state = {
            deliverId:null,
        }
    }
    
componentDidMount(){
    let ReachShop=false;
    AsyncStorage.getItem("ReachShop").then((value) => {
        if(value=="true")
            {ReachShop=true;
            console.log(ReachShop);}
        else
        console.log(ReachShop);
        }).done();  
        
    AsyncStorage.getItem("DeliverId").then((value) => {
        this.setState({deliverId:value})
        console.log(this.state.deliverId);
        }).done();
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
        sleep(1000).then(() => {
        axios.get(`https://backend-webapi20190825122524.azurewebsites.net/api/orders/GetOrderDetailsById/${this.state.deliverId}`)
                    .then(response=>{
                        console.log(response.data);
                       this.props.fetchOrderData(response.data);
                       this.props.isReach(ReachShop); // fetch order details
                       
                    })
                    Actions.Map();
                });
}
    render(){
        return(
            null
                    
                   //dispatch(authSuccess(token,userId,role),Actions.Map())
                
        );
    }
}

export default connect(null,{fetchOrderData,isReach})(UnfinishedDelivery)