import React,{Component} from 'react';
import { View, Text, Dimensions, Image, StyleSheet,TouchableOpacity} from "react-native";
import {wrapupdelivery} from './Store/Actions/Location';
import AnimatedLoader from 'react-native-animated-loader';
import MapViewDirections from 'react-native-maps-directions';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

class WrapupDeliver extends Component{
    constructor(props){
        super(props);
        this.state={
            isOnline:false,
            visible: false,
            fare:null
        }
    }
handleFinish=()=>{
    console.log("Finish Work");
    this.props.wrapupdelivery();
    Actions.Status();
}
    render(){
        return(
                <View style={{flex:1,backgroundColor:'#2A3A36',}}>
                    <Text style={Styles.txtHead}>Hi, Jayashan{"\n"}You have arrived the destination</Text>     
                    <Text style={{color:'white',fontSize:20,paddingBottom:'45%',fontWeight:'bold',paddingTop:'10%'}}>FARE : RS. {this.state.fare}.00</Text>            
                    {/* <TouchableOpacity onPress={()=>Actions.Status()}>
                        <View style={Styles.Button}>
                            <Text style={{alignSelf:'center',fontSize:30,color:'#fff',fontWeight:'bold'}}>OK</Text>
                        </View>
                    </TouchableOpacity> */}
                    <TouchableOpacity onPress={()=>this.handleFinish()} style={{margin:10,alignSelf:'stretch'}}>
                        <Text style={{
                            backgroundColor:'steelblue',color:'white',fontSize:16,
                            height:37,width:'100%',textAlign:'center',padding:10
                        }}>OK</Text>
                    </TouchableOpacity>
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
                              fare:Math.round(result.distance*50)
                            })
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