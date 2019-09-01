import React,{Component} from 'react';
import { View, Text, Dimensions, Image, StyleSheet,TouchableOpacity,ActivityIndicator} from "react-native";
//import AnimatedLoader from 'react-native-animated-loader';
import Button from 'react-native-button';
import * as signalR from '@aspnet/signalr';
import Map from './Map/Map';
import axios from 'axios';
import {fetchOrderData} from './Store/Actions/Location';
import {connect} from 'react-redux'

class Status extends Component{
    constructor(props){
        super(props);
        this.state={
            isOnline:false,
            visible: false,

            connection: new signalR.HubConnectionBuilder().withUrl("http://192.168.43.15:5001/connectionHub").build(),
            message:null,
            accept: false,
            delivererId: 1, //deliverer Id
            source: {
                latitude: 6.9271,
                longitude: 79.8612
            },
        }
    }

    componentDidMount(){
        /*SingalR */
        this.state.connection.start()
        .then(()=> {
            console.log("connected");
            let delivererLocation ={
            latitude: this.state.source.latitude, //deliverer first locaation
            longitude: this.state.source.longitude,  //deliverer first locaation
            delivererId: this.state.delivererId, //deliverer id 
            connectionId: null
            };
            this.state.connection.invoke("GoOnline", delivererLocation);
            //this.setState({isOnline: true, delivererStatus: 'online'})
    })
    .catch(error => console.log(error));
    }

    switchModeHandeler=()=>{
        this.setState(prevState=>{
            return {
                isOnline:!prevState.isOnline,visible:true
            };
            
        })
        if(!this.state.isOnline){
            console.log("now online")
            this.state.connection.invoke("SendRequest");
            this.state.connection.on("SendRequest",(message)=>{
                console.log(message);
                this.setState({message: message})
            })

            let delivererStatus='online';
            axios.get(`http://192.168.43.15:5001/api/deliverers/updateDeliveryStatus/${this.state.delivererId},${delivererStatus}`)
            .then(response=>{
                console.log(response.data);
            })
        }
        else {
            let delivererStatus='offline';
            axios.get(`http://192.168.43.15:5001/api/deliverers/updateDeliveryStatus/${this.state.delivererId},${delivererStatus}`)
            .then(response=>{
                console.log(response.data);
            })
        }
    }

    confirm=()=>{
        this.setState({accept: true}),console.log(this.state.accept);
        let orderStatus='to be delivered';
        let delivererStatus='onroad';
        axios.get(`http://192.168.43.15:5001/api/orders/updateOrderStatus/${this.state.message},${orderStatus}`)
        .then(response=>{
            console.log(response.data);
        })
        .catch(error=>{console.log(error)})
        console.log(delivererStatus, orderStatus)
        axios.get(`http://192.168.43.15:5001/api/deliverers/updateDeliveryStatus/${this.state.delivererId},${delivererStatus}`)
        .then(response=>{
            console.log(response.data);
        })
        .catch(error=>{console.log(error)})
    
        axios.get(`http://192.168.43.15:5001/api/orders/GetOrderDetailsById/${this.state.message}`)
        .then(response=>{
            console.log(response.data);
            this.props.fetchOrderData(response.data) // fetch order details
            this.setState({message: null})
        })
        
        this.state.connection.invoke("Reply",  4,"Accepted");// 4 seller id
      }
    
      reject=()=>{
        this.state.connection.invoke("Reply",  4,"Reject");
        this.setState({message: null})
      }

    render(){
        if(this.state.message!=null){
            return (
              <View>
              <Button onPress={this.confirm}>confirm </Button>
              <Button onPress={this.reject}>reject</Button>
              </View>
            );
        } else
        return(
                <View style={{flex:1,}}>
                    {/*<Text style={{fontSize: 70,color: '#26bf63',fontWeight:'400', fontWeight:'bold', }}>
                            shop
                            <Text style={{color: '#5189c9',}}>Me</Text>
                            </Text>
                            <Text style={{color: '#5d6661', fontSize: 25, fontWeight:'normal', marginTop:'-5%',fontWeight:'bold', marginLeft: '30%'}}>
                            delivery
                        </Text>
                    
                    <View style={{flex:4}}>
                    
                    <Text style={{color:'#000',alignSelf:'center', fontSize:50,color:'#000',justifyContent:'center',fontWeight:'bold',paddingTop:'10%'}}>Hi, Jayashan{"\n"}You're {this.state.isOnline ? 'Online': 'offline'}{"\n"}{this.state.isOnline ? 'Wait for a Delivery..': null}</Text>
                    
                    {this.state.isOnline ? 
                        <AnimatedLoader 
                            visible={this.state.visible}
                            overlayColor="rgba(255,255,255,0.75)" 
                            animationStyle={Styles.lottie}  
                            speed={1}
                        />: null    
                    } */}
                    <View style={{flex:1,justifyContent: 'center', alignItems: 'center', alignSelf:'center'}}>
                        {this.state.isOnline ?  <ActivityIndicator  size='large' color="green" />:null}
                    </View>
                    <TouchableOpacity onPress={()=>this.switchModeHandeler() }style={{justifyContent: 'center', alignItems: 'center', alignSelf:'center',position: 'absolute', bottom: 20}} >
                            <Text style={(this.state.isOnline ? 
                                {alignSelf:'center', backgroundColor:'green',color:'white',fontSize:18,height:100,width:100,borderRadius: 50,textAlign:'center',fontWeight:'bold',paddingTop:35,}
                                : 
                                {alignSelf:'center',backgroundColor:'red',color:'white',fontSize:20,height:100,width:100,borderRadius: 50,textAlign:'center',fontWeight:'bold',paddingTop:35,})}>GO {this.state.isOnline ? 'OFFLINE': 'ONLINE'}</Text>
                    </TouchableOpacity>
            </View>
        )
    };
};


const mapStateToProps=state=>{
    console.log("state.location")
    console.log(state.location)
    return {
        location: state.location,
    };
}
  
export default connect(mapStateToProps,{
    fetchOrderData,
})(Status);


Styles=StyleSheet.create({
    txtHead:{
        alignSelf:'center',
        fontSize:50,
        color:'#000',
        justifyContent:'center',
        fontWeight:'bold'
    },
    offlineButton:{
        alignSelf:'center', 
        height:150,
        width:150,
        backgroundColor:'#FA6318',
        borderRadius:75,
        borderWidth:5,
        borderColor:'#FBCC10',
        overflow:'hidden',
    },
    onlineButton:{
        backgroundColor:'green',color:'white',fontSize:20,
        height:37,width:'100%',textAlign:'center',fontWeight:'bold'
    },
    lottie: {
        width: 200,
        height: 200
      }
})