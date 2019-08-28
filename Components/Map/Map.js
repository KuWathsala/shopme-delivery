import React,{Component} from "react";
import { View, Text, Image, StyleSheet,TouchableOpacity} from "react-native";
import MapView, {PROVIDER_GOOGLE, Marker, Circle} from 'react-native-maps';
import {connect} from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
import * as actions from '../Store/Actions/index';
import {Actions} from 'react-native-router-flux';
import * as signalR from '@aspnet/signalr';
import Button from "react-native-button";
import axios from 'axios';


const carMarker=require("../../Assets/carMarker.png") ;
const shopMarker=require("../../Assets/shop.png") ;

class Map extends Component{
  constructor(props){
    super(props);
    this.state={
      startLocation: {
        latitude: 6.9271,
        longitude: 79.8612
      },
      source: {
        latitude: 6.9271,
        longitude: 79.8612
      },
      address: null,
      error: null,
      sourceToShopDistance:10.0,
      sourceToCustomer:10.0,
      connection: new signalR.HubConnectionBuilder().withUrl("http://192.168.43.15:5001/connectionHub").build(),
      message:null,
      accept: false,
      delivererId: 1, //deliverer Id
      orderDetails: null
    };
  }


  
  componentDidMount(){
    Geolocation.getCurrentPosition(
      position=> {
        console.log('position->',position);
        this.props.setLocation(position.coords.latitude,position.coords.longitude);
        this.setState({
          startLocation:{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          error:null,
        });
      },
      error=> {this.setState({error: error.message })},
      { enableHighAccuracy: true},
    );

  //setInterval(() => {
    Geolocation.watchPosition(
          position=> {
            console.log('position==1->',position);
            this.setState({
              source:{
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              },
              error:null,
            });
            this.props.setLocation(this.state.source.latitude,this.state.source.longitude);
          },
          error=> {this.setState({error: error.message })},
          //{ enableHighAccuracy: false, timeout: 25000, maximumAge: 3600000 },
          { enableHighAccuracy: true},
        );
      
    // }, 1000);

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

    this.state.connection.invoke("SendRequest");
    this.state.connection.on("SendRequest",(message)=>{
        console.log(message);
        this.setState({
            message: message
        })
    })
  }
  
  reachShop=()=>{
    console.log("REACH THE SHOP");
         Actions.GetOrder();
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
        this.setState({orderDetails: response.data})
        /*change action */
        this.setState({message: null})
    })
    
    this.state.connection.invoke("Reply",  4,"Accepted");// 4 seller id
  }

  reject=()=>{
    this.state.connection.invoke("Reply",  4,"Reject");
    this.setState({message: null})
  }

  render(){
    let isReachedShop=false
    if(this.state.sourceToShopDistance<0.1){
      isReachedShop=true
    }
    let isFinish=false
    if(this.state.sourceToCustomer<0.1){
      console.log(isFinish);
      isFinish=true
      console.log(isFinish);
    }
    if(this.state.message!=null){
      return (
        <View>
        <Button onPress={this.confirm}>confirm </Button>
        <Button onPress={this.reject}>reject</Button>
        </View>
      );
    } else
    return(
      <View style={styles.container}>
        <View style={{flexDirection:'row',alignContent:'space-around',marginTop:5,marginBottom:5}}>
            <TouchableOpacity onPress={()=>Actions.GetOrder()}>
              <View style={{height:30,width:150,backgroundColor:'#18CF0B',borderColor:'#fff',borderRadius:5,marginRight:5}}>
                  <Text style={{fontSize:15,fontWeight:'bold',alignSelf:'center',color:'white'}}>Delivery Details</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>Actions.Profile()}>
              <View style={{height:30,width:150,backgroundColor:'#18CF0B',borderColor:'#fff',borderRadius:5,}}>
                  <Text style={{fontSize:15,fontWeight:'bold',alignSelf:'center',color:'white',marginRight:5}}>Past Trips</Text>
              </View>
            </TouchableOpacity>
        </View>
        
        <View style={{flex:1}}>
          <MapView 
            showsUserLocation
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
              latitude: this.props.sourceLocation.latitude, 
              longitude: this.props.sourceLocation.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          >
          {/*Source location*/}
          <Marker
            draggable
            coordinate={{
              latitude:  this.props.sourceLocation.latitude, 
              longitude: this.props.sourceLocation.longitude,
            }}
            image={carMarker}

            onDragEnd={ 
              (e) => this.props.setLocation(e.nativeEvent.coordinate.latitude,e.nativeEvent.coordinate.longitude)
                }
          />
          {/*shop location*/}
          <Marker
            coordinate={{
              latitude:this.props.shopLocation.latitude,
              longitude:this.props.shopLocation.longitude,
            }}
            image={shopMarker}
          />
          {/*customer location*/}
          <Marker
            coordinate={{
              latitude:this.props.customerLocation.latitude,
              longitude:this.props.customerLocation.longitude,
            }}
          />

        <Marker
            coordinate={{
              latitude:this.state.startLocation.latitude,
              longitude:this.state.startLocation.longitude,
            }}
            pinColor='#FB6910'
          />
          
          <MapViewDirections
            origin={this.props.sourceLocation}
            destination={this.props.shopLocation}
            apikey={'AIzaSyDfp50rT_iIa365h388F4TjLEWBS39S2kM'}
            strokeWidth={7}
            strokeColor="#3399ff"
            fillColor="#80bfff"
            onStart={(params) => {
              console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
            }}
            onReady={result => {
              console.log(`Distance: ${result.distance} km`)
              console.log(`Duration: ${result.duration} min.`)
              this.setState({
                sourceToShopDistance:result.distance
              })
            }}
          />
        {/*Get distance and time remain from source location to customer location */}
        <MapViewDirections
            origin={this.props.sourceLocation}
            destination={this.props.customerLocation}
            apikey={'AIzaSyDfp50rT_iIa365h388F4TjLEWBS39S2kM'}
            onStart={(params) => {
              console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
            }}
            onReady={result => {
              console.log(`Distance: ${result.distance} km`)
              console.log(`Duration: ${result.duration} min.`)
              this.setState({
                sourceToCustomer:result.distance
              })
            }}
          />
          {/*start location to delivrer current location path*/}
          <MapViewDirections
            origin={this.state.startLocation}
            destination={this.props.sourceLocation}
            apikey={'AIzaSyDfp50rT_iIa365h388F4TjLEWBS39S2kM'}
            strokeWidth={7}
            strokeColor="#605650"
            fillColor="#FB6910"
          />
        {/*shop to customer path*/}
          {(this.props.isReached ) ?
          <MapViewDirections
            origin={this.props.shopLocation}
            destination={this.props.customerLocation}
            apikey={'AIzaSyDfp50rT_iIa365h388F4TjLEWBS39S2kM'}
            strokeWidth={7}
            strokeColor="#1BB608"
            fillColor="#FB6910"
          />:null}
          {isReachedShop && !this.props.isReached ? (this.reachShop()):null}
          {isFinish ?( Actions.WrapupDeliver(),console.log('Finish journeyyyyy')):null}
          </MapView >
        </View>
       </View>
    );
  }
}

const mapStateToProps=state=>{
  return{
    shopLocation:state.location.shopLocation,
    customerLocation:state.location.customerLocation,
    sourceLocation:state.location.sourceLocation,
    isReached:state.location.isReach,
  }
}

const mapDispatchToProps=dispatch=>{
  return{
      setLocation:(latitude,longitude)=>dispatch(actions.location(latitude,longitude))
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Map);


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex:1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  search: {
    flex:1,
    width: '100%',
    flexDirection:'column',
  }
});