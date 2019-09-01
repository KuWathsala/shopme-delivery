import React,{Component} from 'react';
import {  View, Text, Dimensions, Image, StyleSheet, TextInput, ActivityIndicator } from "react-native";
import * as signalR from '@aspnet/signalr';
import Button from 'react-native-button';
import axios from 'axios';

export default class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            accept: false,
            message: null,
            deliverer :{
                latitude: 6.934923,
                longitude: 79.842766,
                delivererId: 1,
                connectionId: null
            },
            id: 4,
            orderStatus: 'to be delivered',
            delivererStatus: 'offline',
            connection: new signalR.HubConnectionBuilder().withUrl("http://192.168.43.15:5001/connectionHub").build()
        }
    }

    componentDidMount(){
        console.log("componentditmount")

        this.state.connection.start()
        .then(()=> {
            console.log("connected");
            this.state.connection.invoke("GoOnline", this.state.deliverer);
            this.setState({isOnline: true, delivererStatus: 'online'})
        })
        .catch(error => console.log(error));
    
        this.state.connection.invoke("SendRequest");
        this.state.connection.on("SendRequest",(message)=>{
            console.log(message);
            this.setState({
                message: message
            })
        })
        
    }
    
    confirm=()=>{
        this.setState({accept: true}),console.log(this.state.accept);
        this.setState({orderStatus: 'to be delivered'})
        axios.get(`http://192.168.43.15:5001/api/orders/updateOrderStatus/${this.state.message},${this.state.orderStatus}`) // message==orderId
        .then(response=>{
            console.log(response.data);
            this.setState({delivererStatus: 'onroad'})
        })
        .catch(error=>{console.log(error)})
        console.log(this.state.delivererStatus, this.state.orderStatus)
        axios.get(`http://192.168.43.15:5001/api/deliverers/updateDeliveryStatus/${this.state.id},${this.state.delivererStatus}`)
        .then(response=>{
            console.log(response.data);
        })
        .catch(error=>{console.log(error)})

        
        this.state.connection.invoke("Reply",  4,"Accepted"); //seller id
    }

    reject=()=>{
        this.state.connection.invoke("Reply",  4,"Reject"); //seller id
    }

    render(){
        if(this.state.message===null)
            return <View><ActivityIndicator size="large" /></View>;
        else
            if(this.state.accept) 
            return <Text style={{alignItems:'center', fontSize: 20}}>status: {this.state.message}</Text>
            else
                return (
                    <View>
                    <Button onPress={this.confirm}>confirm </Button>
                    <Button onPress={this.reject}>reject</Button>
                    </View>
                );
    }
}

/*
connection.on("send", data => {
            console.log(data);
        });

        connection.start()
        .then(() => connection.invoke("send", "Hello"));
         */
