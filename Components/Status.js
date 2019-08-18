import React,{Component} from 'react';
import { View, Text, Dimensions, Image, StyleSheet,TouchableOpacity} from "react-native";
import AnimatedLoader from 'react-native-animated-loader';

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
                <View style={{flex:1,backgroundColor:'#2A3A36',}}>
                    <Text style={Styles.txtHead}>Hi, Jayashan{"\n"}You're {this.state.isOnline ? 'Online': 'offline'}{"\n"}{this.state.isOnline ? 'Wait for a Delivery..': null}</Text>
                    <View>
                    {/* {this.state.isOnline ? 
                        <AnimatedLoader 
                            visible={this.state.visible}
                            overlayColor="rgba(255,255,255,0.75)" 
                            animationStyle={Styles.lottie}  
                            speed={1}
                        />: null
                    } */}
                    </View>                 
                    <TouchableOpacity onPress={()=>this.switchModeHandeler()}>
                        <View style={(this.state.isOnline ? Styles.onlineButton : Styles.offlineButton)}>
                            <Text style={{alignSelf:'center',fontSize:30,color:'#fff',paddingTop:'20%',fontWeight:'bold'}}>GO</Text>
                            <Text style={{alignSelf:'center',fontSize:30,color:'#fff',fontWeight:'bold'}}>{this.state.isOnline ? 'OFFLINE': 'ONLINE'}</Text>
                        </View>
                    </TouchableOpacity>
            </View>
        )
    };
};
export default Status;

Styles=StyleSheet.create({
    txtHead:{
        alignSelf:'center',
        fontSize:50,
        color:'white',
        paddingTop:'30%', 
        paddingBottom:'45%',
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
        alignSelf:'center', 
        height:150,
        width:150,
        backgroundColor:'#12DC17',
        borderRadius:75,
        borderWidth:5,
        borderColor:'#94D70D',
        overflow:'hidden',
    },
    lottie: {
        width: 200,
        height: 200
      }
})