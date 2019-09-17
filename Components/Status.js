import React,{Component} from 'react';
import { View, Text, Dimensions, Image, StyleSheet,TouchableOpacity,ActivityIndicator,Modal} from "react-native";
//import AnimatedLoader from 'react-native-animated-loader';
import Button from 'react-native-button';
import * as signalR from '@aspnet/signalr';
import Map from './Map/Map';
import axios from 'axios';
import {fetchOrderData} from './Store/Actions/Location';
import {connect} from 'react-redux'
import { Actions } from 'react-native-router-flux';
//import Modal from 'react-native-modal';

class Status extends Component{
    constructor(props){
        super(props);
        this.state={
            isOnline:false,
            visible: false,
            ismodalvisible:true,
            connection: new signalR.HubConnectionBuilder().withUrl("https://backend-webapi20190825122524.azurewebsites.net/connectionHub").build(),
            message:null,
            accept: false,
            //delivererId: parseInt(this.props.userId),
            delivererId:2, //deliverer Id
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
            console.log(parseInt(this.props.userId));
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
            axios.get(`https://backend-webapi20190825122524.azurewebsites.net/api/deliverers/updateDeliveryStatus/${this.state.delivererId},${delivererStatus}`)
            .then(response=>{
                console.log(response.data);
            })
        }
        else {
            let delivererStatus='offline';
            axios.get(`https://backend-webapi20190825122524.azurewebsites.net/api/deliverers/updateDeliveryStatus/${this.state.delivererId},${delivererStatus}`)
            .then(response=>{
                console.log(response.data);
            })
        }
    }

    confirm=()=>{
        this.setState({accept: true}),console.log(this.state.accept);
        let orderStatus='to be delivered';
        let delivererStatus='onroad';
        axios.get(`https://backend-webapi20190825122524.azurewebsites.net/api/orders/updateOrderStatus/${this.state.message},${orderStatus}`)
        .then(response=>{
            console.log(response.data);
        })
        .catch(error=>{console.log(error)})
        console.log(delivererStatus, orderStatus)
        axios.get(`https://backend-webapi20190825122524.azurewebsites.net/api/deliverers/updateDeliveryStatus/${this.state.delivererId},${delivererStatus}`)
        .then(response=>{
            console.log(response.data);
        })
        .catch(error=>{console.log(error)})
    
        axios.get(`https://backend-webapi20190825122524.azurewebsites.net/api/orders/GetOrderDetailsById/${this.state.message}`)
        .then(response=>{
            console.log(response.data);
            this.props.fetchOrderData(response.data) // fetch order details
            this.setState({message: null})
        })
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
                {/* <Modal 
                animationType="slide"
                transparent={true}
                visible={this.state.ismodalvisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                {/* <View style={{flexDirection:'row', alignContent:'center',justifyContent:'center',alignSelf:'center',marginTop:'50%'}}>
                <TouchableOpacity onPress={this.confirm} style={{justifyContent:'center',alignItems:'center', alignSelf:'center'}}>
                    <Text style={{color:'white',margin:5,backgroundColor:'green',color:'white',fontSize:20,padding:5}}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.reject} style={{justifyContent:'center',alignItems:'center',alignSelf:'center'}}>
                    <Text style={{color:'white',margin:5,backgroundColor:'red',color:'white',fontSize:20,padding:5}}>Reject</Text>
                </TouchableOpacity>
                 {/* <Button onPress={this.confirm}>confirm </Button>
                 <Button onPress={this.reject}>reject</Button> 
                </View> *
                <View style={{marginTop: 22}}>
            <View>
              <Text>Hello World!</Text>

              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableOpacity>
            </View>
          </View>
              </Modal> */}
     <Modal
          transparent={true}
          animationType={"slide"}
          visible={this.state.ismodalvisible}
         // onRequestClose={ () => { this.setState(!this.state.ismodalvisible)} } 
         >
 
 
            <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.ModalInsideView}>
                    <Text style={styles.TextStyle}>New Order is Waiting.... </Text>
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
            
            //   <View>
            //   <Button onPress={this.confirm}>confirm </Button>
            //   <Button onPress={this.reject}>reject</Button>
            //   </View>
            );
        } else
        return(
                <View style={{flex:1,}}>
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
        userId: state.auth.userId,
    };
}
  
export default connect(mapStateToProps,{
    fetchOrderData,
})(Status);


styles=StyleSheet.create({
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
      },

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
          marginBottom: 20, 
          color: "#fff",
          padding: 20,
          textAlign: 'center'
         
        }
})
