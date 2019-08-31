import React,{Component} from 'react';
import { View, Text, Dimensions, Image, StyleSheet,TouchableOpacity,ActivityIndicator} from "react-native";
//import AnimatedLoader from 'react-native-animated-loader';

class Status extends Component{
    constructor(props){
        super(props);
        this.state={
            isOnline:false,
            visible: false,
        }
    }
    switchModeHandeler=()=>{
        this.setState(prevState=>{
            return {
                isOnline:!prevState.isOnline,visible:true
            };
            
        })
    }
    render(){
        return(
                <View style={{flex:1,}}>
                    <Text style={{fontSize: 70,color: '#26bf63',fontWeight:'400', fontWeight:'bold', }}>
                        shop
                        <Text style={{color: '#5189c9',}}>Me</Text>
                    </Text>
                    <Text style={{color: '#5d6661', fontSize: 25, fontWeight:'normal', marginTop:'-5%',fontWeight:'bold', marginLeft: '30%'}}>
                        delivery
                    </Text>
                    <View style={{flex:4}}>
                    
                    <Text style={{color:'#000',alignSelf:'center', fontSize:50,color:'#000',justifyContent:'center',fontWeight:'bold',paddingTop:'10%'}}>Hi, Jayashan{"\n"}You're {this.state.isOnline ? 'Online': 'offline'}{"\n"}{this.state.isOnline ? 'Wait for a Delivery..': null}</Text>
                    
                    {/* {this.state.isOnline ? 
                        <AnimatedLoader 
                            visible={this.state.visible}
                            overlayColor="rgba(255,255,255,0.75)" 
                            animationStyle={Styles.lottie}  
                            speed={1}
                        />: null    
                    } */}
                    {this.state.isOnline ?  <ActivityIndicator size='large' color="green" />:null}
                    </View>  
                    <View style={{flex:1}}>             
                    <TouchableOpacity onPress={()=>this.switchModeHandeler()}>
                            <Text style={(this.state.isOnline ? 
                                {alignSelf:'center', backgroundColor:'green',color:'white',fontSize:20,height:60,width:250,textAlign:'center',fontWeight:'bold',paddingTop:10}
                                : 
                                {alignSelf:'center',backgroundColor:'orange',color:'white',fontSize:20,height:60,width:250,textAlign:'center',fontWeight:'bold',paddingTop:10})}>GO {this.state.isOnline ? 'OFFLINE': 'ONLINE'}</Text>
                    </TouchableOpacity>
                    </View>  
            </View>
        )
    };
};
export default Status;
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