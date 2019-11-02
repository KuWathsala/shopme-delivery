import React,{Component} from 'react';
import { View, Text, Dimensions, Image, StyleSheet,TouchableOpacity,ActivityIndicator,Modal,Alert,ImageBackground} from "react-native";
import * as signalR from '@aspnet/signalr';
import axios from 'axios';
import {fetchOrderData,startLocation} from './Store/Actions/Location';
import {connect} from 'react-redux'
import { Actions,ActionConst } from 'react-native-router-flux';
import {AsyncStorage} from 'react-native'
import Geolocation from '@react-native-community/geolocation';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

class Status extends Component{
    constructor(props){
        super(props);
        this.state={
            isOnline:false,
            visible: false,
            ismodalvisible:true,
            connection: new signalR.HubConnectionBuilder().withUrl("https://backend-webapi20191102020215.azurewebsites.net/connectionHub").build(),
            message:null,
            accept: false,
            delivererId:parseInt(this.props.deliverId), //deliverer Id
            source: {
                latitude: 0.1,
                longitude: 0.1
            },
            OrderData:[],
            deliveryId:0,
        }
    }


    componentDidMount(){
        /*SingalR */
        //sleep(1000).then(() => {
        console.log(parseInt(this.props.deliverId));

        Geolocation.getCurrentPosition(
            position=> {
              console.log('position==1->',position);
              this.setState({
                source:{
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                },
              });
             console.log(this.state.source.latitude,this.state.source.longitude);
            },
            error=> {this.setState({error: error.message }),console.log(error.message)},
            //{ enableHighAccuracy: false, timeout: 25000, maximumAge: 3600000 },
            { enableHighAccuracy: true},
          );

        Geolocation.watchPosition(
            position=> {
              console.log('position==1->',position);
              this.setState({
                source:{
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                },
              });
             console.log(this.state.source.latitude,this.state.source.longitude);
            },
            error=> {this.setState({error: error.message }),console.log(error.message)},
            //{ enableHighAccuracy: false, timeout: 25000, maximumAge: 3600000 },
            { enableHighAccuracy: true},
          );
            this.state.connection.start()
            .then(()=> {
                console.log("connected");
                console.log(this.state.delivererId);
                console.log(this.state.source.latitude,this.state.source.longitude);
                let delivererLocation ={
                latitude: this.state.source.latitude, //deliverer first locaation
                longitude: this.state.source.longitude,  //deliverer first locaation
                delivererId: this.state.delivererId, //deliverer id 
                connectionId: null
                };
                this.state.connection.invoke("GoOnline", delivererLocation);
        })
        .catch(error => console.log(error));
   // });
    }

    handleDelivery=()=>{
        axios.get(`https://backend-webapi20191102020215.azurewebsites.net/api/orders/GetOrderDetailsById/${this.state.deliveryId}`)
                    .then(response=>{
                        console.log(response.data);
                        this.setState({OrderData:response.data});
                        console.log(this.state.OrderData);
                       // this.props.fetchOrderData(response.data) // fetch order details
                    }), this.props.fetchOrderData(this.state.OrderData,this.state.deliveryId)
                    Actions.Map();
    }

    switchModeHandeler=()=>{
        this.setState(prevState=>{
            return {
                isOnline:!prevState.isOnline,
            };
            
        })
        if(!this.state.isOnline){
            console.log("now online")
            this.state.connection.invoke("SendRequest");
            this.state.connection.on("SendRequest",(message)=>{
                console.log(message);
                axios.get(`https://backend-webapi20191102020215.azurewebsites.net/api/orders/GetOrderDetailsById/${message}`)
                    .then(response=>{
                        console.log(response.data);
                        this.setState({OrderData:response.data});
                        console.log(this.state.OrderData);
                       // this.props.fetchOrderData(response.data) // fetch order details
                    })
                this.setState({message: message,ismodalvisible:true})
            })

            let delivererStatus='online';
            axios.get(`https://backend-webapi20191102020215.azurewebsites.net/api/deliverers/updateDeliveryStatus/${this.state.delivererId},${delivererStatus}`)
            .then(response=>{
                console.log(response.data);
            })
        }
        else {
            let delivererStatus='offline';
            axios.get(`https://backend-webapi20191102020215.azurewebsites.net/api/deliverers/updateDeliveryStatus/${this.state.delivererId},${delivererStatus}`)
            .then(response=>{
                console.log(response.data);
            })
        }
    }

    confirm=()=>{
        this.setState({accept: true}),console.log(this.state.accept);
        let orderStatus='to be delivered';
        let delivererStatus='onroad';
        axios.get(`https://backend-webapi20191102020215.azurewebsites.net/api/orders/updateOrderStatus/${this.state.message},${orderStatus}`)
        .then(response=>{
            console.log(response.data);
        })
        .catch(error=>{console.log(error)})
        console.log(delivererStatus, orderStatus)

        axios.get(`https://backend-webapi20191102020215.azurewebsites.net/api/deliverers/updateDeliveryStatus/${this.state.delivererId},${delivererStatus}`)
        .then(response=>{
            console.log(response.data);
        })
        .catch(error=>{console.log(error)})

        axios.get(`https://backend-webapi20191102020215.azurewebsites.net/api/Orders/orderCongirmed/${this.state.message},${this.state.delivererId}`)
        .then(response=>{
            console.log(response.data);
        })
        .catch(error=>{console.log(error)})
    
        //axios.get(`https://backend-webapi20191102020215.azurewebsites.net/api/orders/GetOrderDetailsById/${this.state.message}`)
        //.then(response=>{
            //console.log(response.data);
            this.props.fetchOrderData(this.state.OrderData,this.state.message); // fetch order details
            this.props.startLocation(this.state.source.latitude,this.state.source.longitude);
            AsyncStorage.setItem("start_lat",this.state.source.latitude.toString());
            AsyncStorage.setItem("start_lng",this.state.source.longitude.toString());
            this.setState({message: null});
       // })
        this.setState({ismodalvisible:false});
        this.state.connection.invoke("Reply", parseInt(this.props.userId),"Accepted");// 4 seller id
        Actions.Map();
      }
    
      reject=()=>{
        this.setState({ismodalvisible:false});
        this.state.connection.invoke("Reply",parseInt(this.props.userId),"Reject");
        this.setState({message: null})
        Actions.Status();
      }

render(){   
    if(this.state.message!=null){
        return (
            
            <View style={{flex:1,backgroundColor:'black',opacity:0.6,transparent:true}}>
                <Modal
                    transparent={true}
                    animationType={"slide"}
                    visible={this.state.ismodalvisible}
                    onRequestClose={ () => { this.setState(!this.state.ismodalvisible)} }
                    >
                        <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={styles.ModalInsideView}>
                                <Text style={styles.TextStyle}>New Order from Shop {this.state.OrderData.shopName} </Text>
                                <Text style={styles.TextStyle}>Customer Name {this.state.OrderData.firstName} {this.state.OrderData.lastName} </Text>
                                <View style={{flexDirection:'row', alignContent:'center',justifyContent:'center',alignSelf:'center'}}>
                                <TouchableOpacity onPress={this.confirm} style={{justifyContent:'center',alignItems:'center', alignSelf:'center'}}>
                                <Text style={{color:'white',margin:5,backgroundColor:'green',color:'white',fontSize:20,padding:5}}>Accept</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.reject} style={{justifyContent:'center',alignItems:'center',alignSelf:'center'}}>
                                <Text style={{color:'white',margin:5,backgroundColor:'red',color:'white',fontSize:20,padding:5}}>Reject</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
            
                        </View>
                </Modal>
            </View>
            );
        } else
        return(
            <ImageBackground source={require('../Assets/delivery.jpeg')}  style={{width: '100%', height: '100%',resizeMode: 'cover'}} imageStyle={{opacity:0.7}}>
                <View style={{flex:1}}>
                    <View style={{justifyContent: 'flex-start', alignItems: 'center', alignSelf:'center',position: 'absolute', top: 5}}>
                        <Text style={{fontSize: 70,color: '#26bf63',fontWeight:'400', marginTop: '40%', fontWeight:'bold', }}>
                            shop
                            <Text style={{color: '#5189c9',}}>
                                Me
                            </Text>
                        </Text>
                        <Text style={{color: '#5d6661', fontSize: 25, fontWeight:'normal', marginTop:'-5%',fontWeight:'bold', marginLeft: '30%'}}>
                                    delivery
                        </Text>
                    </View>
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
            </ImageBackground>
            
        )
    };
};


const mapStateToProps=state=>{
    console.log("state.location")
    console.log(state.location)
    return {
        deliverId: state.auth.userId,
        //location: state.location,
    };
}
  
export default connect(mapStateToProps,{
    fetchOrderData,
    startLocation
})(Status);


styles=StyleSheet.create({
      MainContainer :{
        
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: (Platform.OS == 'ios') ? 20 : 0
         
        },
         
        ModalInsideView:{
         
          justifyContent: 'center',
          alignItems: 'center', 
          backgroundColor : "#00BCD4", 
          height: 300 ,
          width: '90%',
          borderRadius:10,
          borderWidth: 1,
          borderColor: '#fff'
         
        },
         
        TextStyle:{
         
          fontSize: 20, 
          marginBottom: 5, 
          color: "#fff",
          padding: 20,
          textAlign: 'center'
         
        }
})
