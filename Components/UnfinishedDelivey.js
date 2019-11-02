import React, {Component} from 'react';
import {Text,View,StyleSheet,TextInput,Image,TouchableOpacity,Alert,Linking,KeyboardAvoidingView} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import * as actions from './Store/Actions/index';
import {fetchOrderData,startLocation} from './Store/Actions/Location';
import axios from 'axios';
import {AsyncStorage} from 'react-native';

class UnfinishedDelivery extends Component{
    constructor(props) {
        super(props);
        this.state = {
            deliverId:null,
            start_lat:null,
            start_lng:null,
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
        this.setState({deliverId:parseInt(value)})
        console.log(this.state.deliverId);
        }).done();

    AsyncStorage.getItem("start_lat").then((value) => {
        this.setState({start_lat:parseFloat(value)})
        console.log(this.state.start_lat);
        }).done();
    
    AsyncStorage.getItem("start_lng").then((value) => {
        this.setState({start_lng:parseFloat(value)})
        console.log(this.state.start_lng);
        }).done();

        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

        sleep(2000).then(() => {
        axios.get(`https://backend-webapi20191102020215.azurewebsites.net/api/orders/GetOrderDetailsById/${this.state.deliverId}`)
                    .then(response=>{
                      //  console.log(response.data);
                      this.props.startLocation(this.state.start_lat,this.state.start_lng);  
                       this.props.fetchOrderData(response.data);
                                            
                    })
                    Actions.Map();
                });
}
    render(){
        return(
            null  
        );
    }
}

const mapStateToProps=dispatch=>{
    return{
        //InitializeLocation:(latitude,longitude)=>dispatch(actions.startLocation(latitude,longitude)),
       // setLocation:(latitude,longitude)=>dispatch(actions.startLocation(latitude,longitude),console.log("start location ...")),
        //fetchOrder:(data)=>dispatch(actions.fetchOrderData(data),console.log("fetchOrder"))
    };
  }
  

export default connect(mapStateToProps,{
    fetchOrderData,startLocation})(UnfinishedDelivery)