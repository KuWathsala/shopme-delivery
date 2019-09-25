import React, {Component} from 'react';
import {Text,View,StyleSheet,ScrollView,Image} from 'react-native';
import Card from './Card';
import {connect} from 'react-redux';

class Profile extends Component{
    
    render(){
        return(
            <ScrollView>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'stretch',
                }}>
                <View style={{height: 170, 
                        backgroundColor: 'steelblue',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 1000 },
                        shadowOpacity: 0.2,}}>
                            {this.props.imgUrl!=null ? 
                            <View >
                                <Image source={{uri:this.props.imgUrl}} style={{flexDirection:'row',height:150, width:150,backgroundColor:'white',alignContent:'center',alignSelf:'center',justifyContent:'flex-end',borderRadius:100,padding:50,marginTop:10}}/>
                            </View>:
                            <View >
                                <Image source={require('../../Assets/profile.png')} style={{flexDirection:'row',height:150, width:150,backgroundColor:'white',alignContent:'center',alignSelf:'center',justifyContent:'flex-end',borderRadius:100,padding:50,marginTop:10}}/>
                            </View>}
                </View>

                <View style={{flex:1, backgroundColor: 'powderblue',paddingVertical:5,}}>
                    <Card/>
                    </View>        
                </View>
            </ScrollView>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        imgUrl: state.auth.profImage
    }
}
export default connect(mapStateToProps,null)(Profile);

const styles=StyleSheet.create({
    contrainer:{
        flex:2,
        justifyContent:'center',
        alignContent:'center'
    }
})