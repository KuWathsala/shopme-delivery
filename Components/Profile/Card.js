import React from 'react';
import {View,Text,StyleSheet} from 'react-native';

export default Card =(props)=>{
    return(
        <View style={Styles.card}>
            <View style={{flex:1}}>
                <View style={{flexDirection:'row'}}>
                    <View style={{flexDirection:'column',paddingEnd:'10%'}}>
                        <Text>08-08-2019</Text>
                        <Text>11:39 AM</Text>
                    </View>
                    
                    <View style={{flexDirection:'column',paddingEnd:'22%'}}>
                        <View style={{flexDirection:'row'}}>
                            <Text>shop → </Text>
                            <Text>Thalawathugoda</Text>
                        </View>
                    </View>
                    
                    
                    <Text style={{textAlign:'right'}}>Rs.450.00</Text>
                </View>
             </View>
        </View>
    );
};

const Styles=StyleSheet.create({
    card:{
        borderWidth:1,
        borderRadius:2,
        borderColor:'#ddd',
        borderWidth:0,
        shadowColor:'#000',
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.1,
        shadowRadius:2,
        marginLeft:5,
        marginRight:5,
        elevation:1,
        backgroundColor:'white',
        height:50,
    },
    cardSection:{
        //flexDirection:'row',
        //alignItems:"flex-start"

    }
})