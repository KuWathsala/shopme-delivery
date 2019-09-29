import React,{Component} from 'react';
import { View, Text, Dimensions, Image, StyleSheet,TouchableOpacity,} from "react-native";
import {wrapupdelivery} from './Store/Actions/Location';
import AnimatedLoader from 'react-native-animated-loader';
import MapViewDirections from 'react-native-maps-directions';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {AsyncStorage} from 'react-native'

class WrapupDeliver extends Component{
    constructor(props){
        super(props);
        this.state={
            isOnline:false,
            visible: false,
            fare:250,
            distance1:null,
            distance2:null
        }
    }
handleFinish=()=>{
    this.props.wrapupdelivery();
    AsyncStorage.setItem("ReachShop","true");
    Actions.Status();
}

fareCal=()=>{
    let fare=(this.state.distance1+this.state.distance2)*40
    if(fare<50)
        this.setState({fare:50});
    else
        this.setState({fare:fare});
}
    render(){
        let distance1=56.5;
        let distance2=35.4;
        return(
                <View style={{flex:1,backgroundColor:'#2A3A36',}}>
                    <View style={{height:'55%',width:'90%',backgroundColor:'white',alignSelf:'center',alignItems:'center',marginTop:'35%'}}>
                        <View style={{height:'15%',width:'100%',backgroundColor:'black',alignSelf:'center',alignItems:'center',justifyContent:'center'}}>
                            <Text style={{color:'white',fontSize:20}}>Receipt</Text>
                        </View>
                            <Text style={{cocolorlor:'black',fontSize:20,marginTop:45}}>Total</Text>
                            <Text style={{color:'black',fontSize:54,marginTop:5}}>{this.state.fare}.00 LKR</Text>
                            <View style={{alignSelf: 'stretch', flexDirection: 'row',marginTop:45,marginLeft:10,marginBottom:60}} >
                                <Text style={{color:'black',fontSize:20,alignSelf:'stretch'}}>Total distance</Text>
                                <Text style={{fontSize:20,textAlign:'right',marginLeft:'50%'}}>{this.state.distance1+this.state.distance2} km</Text>
                            </View>
                            <TouchableOpacity onPress={()=>this.handleFinish()} style={{margin:10,alignSelf:'stretch',}}>
                        <Text style={{
                            backgroundColor:'steelblue',color:'white',fontSize:16,
                            height:37,width:'100%',textAlign:'center',padding:10
                        }}>Done</Text>
                    </TouchableOpacity>
                    </View>
                    
                    <MapViewDirections
                        origin={this.props.startLocation}
                        destination={this.props.shopLocation}
                        apikey={'AIzaSyDfp50rT_iIa365h388F4TjLEWBS39S2kM'}
                        strokeWidth={7}
                        strokeColor="#1BB608"
                        fillColor="#FB6910"
                        onStart={(params) => {
                            console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                          }}
                          onReady={result => {
                            this.setState({
                              distance1:Math.round(result.distance)
                            })
                          }}
                    />
                    <MapViewDirections
                        origin={this.props.shopLocation}
                        destination={this.props.customerLocation}
                        apikey={'AIzaSyDfp50rT_iIa365h388F4TjLEWBS39S2kM'}
                        strokeWidth={7}
                        strokeColor="#1BB608"
                        fillColor="#FB6910"
                        onStart={(params) => {
                            console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                          }}
                          onReady={result => {
                            this.setState({
                              distance2:Math.round(result.distance),
                            }),
                            this.fareCal();
                          }}
                    />
            </View>
        )
    };
};
const mapStateToProps=state=>{
    return{
        shopLocation:state.location.shopLocation,
        customerLocation:state.location.customerLocation,
        startLocation:state.location.InitialLocation
    }
  }
export default connect(mapStateToProps,{
    wrapupdelivery,
})(WrapupDeliver);

Styles=StyleSheet.create({
    txtHead:{
        alignSelf:'center',
        fontSize:50,
        color:'white',
        paddingTop:'30%', 
        justifyContent:'center',
        fontWeight:'bold'
    },
    Button:{
        alignSelf:'center', 
        height:50,
        width:100,
        backgroundColor:'#12DC17',
        borderWidth:5,
        borderColor:'#94D70D',
        overflow:'hidden',
    },
    lottie: {
        width: 200,
        height: 200
      }
})