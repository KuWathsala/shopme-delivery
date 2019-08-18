import React,{Component} from 'react';
import { View, Text, Dimensions, Image, StyleSheet,TouchableOpacity,ScrollView} from "react-native";
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import * as actions from '../Components/Store/Actions/index';

class GetOrder extends Component{
    constructor(props){
        super(props);
        this.state={
            Order:[
                {name:'Milk',quantity:'2'},
                {name:'jhssjs',quantity:'3'},
                {name:'Milk',quantity:'2'},
                {name:'jhssjs',quantity:'3'},
                {name:'Milk',quantity:'2'},
                {name:'jhssjs',quantity:'3'},
                {name:'Milk',quantity:'2'},
                {name:'jhssjs',quantity:'3'},
                {name:'powder',quantity:'4'}
            ]
            }
        };

        orderConfirmHandeler=()=>{
            this.props.setReach(true)
            Actions.Map();
        }
    orders=()=>{
        return this.state.Order.map((data=>{
            return (
                <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row'}}>
                    <Text style={{flex: 1, alignSelf: 'stretch',paddingLeft:'20%',color:'white',fontSize:20,fontWeight:'bold',paddingBottom:15}}>{data.name}</Text>
                    <Text style={{flex: 1, alignSelf: 'stretch',color:'white',fontSize:20,fontWeight:'bold'}}>{data.quantity}</Text>
                </View>
            )
        }))
    }
    render(){
        return(
            <ScrollView>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' ,backgroundColor:'#2A3A36'}}>
                
                    <Text style={{color:'white',fontSize:25,fontWeight:'bold',paddingTop:'5%',paddingBottom:'15%'}}>
                        You have arrived the Shop,{"\n\n"}Get Produts as per below order details & press confirm
                    </Text>
                    <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row'}}>
                    <Text style={{flex: 1, alignSelf: 'stretch',paddingLeft:'15%',color:'yellow',fontSize:20,fontWeight:'bold',paddingBottom:15}}>Product Name</Text>
                    <Text style={{flex: 1, alignSelf: 'stretch',color:'yellow',fontSize:20,fontWeight:'bold'}}>Quanity</Text>
                </View>
                {this.orders()}
                {/* <TouchableOpacity onPress={()=>this.orderConfirmHandeler()}>
                    <View style={{
                        alignSelf:'stretch',
                        width:'95%',
                        height:50,
                        backgroundColor:'white',
                        borderWidth:5,
                        borderColor:'#18B0F9',
                        borderRadius:10,
                        marginTop:50,
                        marginBottom:100,
                    }}>
                        <Text style={Styles.txth}>CONFIRM ITEM PICK</Text>
                     </View>
                </TouchableOpacity> */}
                <TouchableOpacity onPress={()=>this.orderConfirmHandeler()} style={{margin:10,alignSelf:'stretch'}}>
                        <Text style={{
                            backgroundColor:'steelblue',color:'white',fontSize:16,
                            height:37,width:'100%',textAlign:'center',padding:10
                        }}>CONFIRM ITEM PICK</Text>
                    </TouchableOpacity>
            </View>
            </ScrollView>
        );
    };
}
const mapStateToProps=state=>{
    return{
      isReached:state.location.isReach,
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