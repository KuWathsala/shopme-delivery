import React,{Component} from 'react';
import { View, Text, Dimensions, Image, StyleSheet,TouchableOpacity,ScrollView} from "react-native";
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import * as actions from '../Components/Store/Actions/index';

class GetOrder extends Component{
    constructor(props){
        super(props);
        this.state={
            Order:[]
            }
        };

componentDidMount(){
    this.setState({Order:this.props.products})
}

orderConfirmHandeler=()=>{
            this.props.setReach(true)
            Actions.Map();
        }
orders=()=>{
    return this.state.Order.map((data,i)=>{
        return (
            <View key={i} style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row',marginBottom:10}}>
                <Image source={{uri:data.image}} style={{height:80,width:80,borderRadius:40,marginLeft:20}}/>
                <Text style={{flex: 1, alignSelf: 'stretch',marginLeft:15,marginTop:30, color:'#272726',fontSize:20,fontWeight:'bold'}}>{data.name}</Text>
                <Text style={{flex: 1, alignSelf: 'stretch',color:'#272726',marginTop:30,fontSize:20,fontWeight:'bold',paddingLeft:15}}>{data.quantity}</Text>
            </View>
        )
    })
    }
    render(){
        return(
            <ScrollView style={{flex: 1,backgroundColor:'#E7E7DF'}}>
            <View style={{backgroundColor:'#E7E7DF'}}>
                
                <Text style={{fontSize: 50,color: '#26bf63',fontWeight:'400', fontWeight:'bold',marginTop:15,alignSelf:'center'}}>
                    shop
                <Text style={{color: '#5189c9',}}>Me</Text>
                </Text>
                    <Text style={{color: '#5d6661', fontSize: 15, fontWeight:'normal', marginTop:'-2%',fontWeight:'bold', marginLeft: '30%',alignSelf:'center'}}>
                        delivery
                    </Text>
                
                    <Text style={{color:'#272726',fontSize:25,fontWeight:'bold',paddingTop:'5%',paddingBottom:'15%',textAlign:"center"}}>
                        Shop Name : {this.props.shopName},{"\n\n"}This Delivery job included below items
                    </Text>
                    <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row'}}>
                    {/* <Text style={{flex: 1, alignSelf: 'stretch',paddingLeft:'15%',color:'yellow',fontSize:20,fontWeight:'bold',paddingBottom:15}}>Product Name</Text>
                    <Text style={{flex: 1, alignSelf: 'stretch',color:'yellow',fontSize:20,fontWeight:'bold'}}>Quanity</Text> */}
                </View>
                {this.orders()}
                <TouchableOpacity onPress={()=>this.orderConfirmHandeler()} style={{margin:10,alignSelf:'stretch',marginTop:40,justifyContent:'flex-end'}}>
                        <Text style={{
                            backgroundColor:'steelblue',color:'#272726',fontSize:16,
                            height:37,width:'100%',textAlign:'center',padding:10
                        }}>CONFIRM ITEMs PICK</Text>
                    </TouchableOpacity>
            </View>
            </ScrollView>
        );
    };
}
const mapStateToProps=state=>{
    return{
      isReached:state.location.isReach,
      products:state.location.products,
      shopName:state.location.shopName,
      //deliveryPending:state.location.d
    }
  }
  const mapDispatchToProps=dispatch=>{
    return{
        setReach:(reach)=>dispatch(actions.isReach(reach),console.log("SetReach"))
    };
  }
export default connect(mapStateToProps,mapDispatchToProps)(GetOrder);

Styles=StyleSheet.create({
    txth:{
        alignSelf:'stretch',
        fontSize:25,
        color:'#000',
        //paddingTop:'30%', 
        //paddingBottom:'45%',
        justifyContent:'center',
        fontWeight:'bold',
        paddingLeft:'10%',
        paddingRight:'10%'
    },
});