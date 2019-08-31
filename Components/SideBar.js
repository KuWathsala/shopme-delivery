import React,{Component} from "react";
// import MenuDrawer from 'react-native-side-drawer';
import {View,StyleSheet,Text,TouchableOpacity,Image} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class SideBar extends Component{
    constructor(props) {
        super(props);

    };

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex:1,backgroundColor:'#000',paddingBottom:50}}>
                    <View style={{flexDirection:'row'}}>
                        <Image source={require('../Assets/profile.png') } style={{height:100, width:100,alignContent:'flex-start',alignSelf:'flex-start',borderRadius:50,paddingTop:50}}/>
                        <Text style={{color:'white',paddingTop:50,fontWeight:'bold',fontSize:16}}>Jayashan Thivanka</Text>
                    </View>
                </View>
                <View style={{flex:3}}>
                    <TouchableOpacity onPress={()=>Actions.Profile()} style={{alignItems:'center',paddingTop:10,paddingBottom:10}}>
                        <Text style={{
                            backgroundColor:'white',color:'#000',fontSize:20,
                            height:45,width:'100%',textAlign:'left',padding:10
                        }}>Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>Actions.Map()} style={{alignItems:'center',paddingTop:10,paddingBottom:10}}>
                        <Text style={{
                            backgroundColor:'white',color:'#000',fontSize:20,
                            height:45,width:'100%',textAlign:'left',padding:10
                        }}>Map</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>Actions.SignUp()} style={{alignItems:'center',paddingTop:10,paddingBottom:10}}>
                        <Text style={{
                            backgroundColor:'white',color:'#000',fontSize:20,
                            height:45,width:'100%',textAlign:'left',padding:10
                        }}>Current Order Details</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>Actions.logout()} style={{alignItems:'center',paddingTop:10,paddingBottom:10}}>
                        <Text style={{
                            backgroundColor:'white',color:'#000',fontSize:20,
                            height:45,width:'100%',textAlign:'left',padding:10
                        }}>Sign Out</Text>
                    </TouchableOpacity>
                </View>                
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF',
    },

});