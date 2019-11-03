import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Circle} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const shopMarker=require("../../Assets/shop.png") ;

export default Card =(props)=>{
  let customer={
    latitude:props.customerlat,
    longitude:props.customerlng
  }
  let shop={
    latitude:props.shoplat,
    longitude:props.shoplng,
  }

  let lat=(props.customerlat+props.shoplat)/2;
  let lng=(props.customerlng+props.shoplng)/2;
  let distance;
    return(
        
            <View style={{flex:1}}>
                <View style={{height:150}}>
                <MapView 
                    showsUserLocation
                    provider={PROVIDER_GOOGLE}
                    style={Styles.map}
                    region={{
                    latitude:lat,
                    longitude:lng,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                    }}
                >
          
          <Marker
            coordinate={{
              latitude:props.customerlat,
              longitude:props.customerlng,
            }}
          />

          <Marker
            coordinate={{
              latitude:props.shoplat,
              longitude:props.shoplng,
            }}
            image={shopMarker}
          />
          <MapViewDirections
            origin={customer}
            destination={shop}
            apikey={'AIzaSyDfp50rT_iIa365h388F4TjLEWBS39S2kM'}
            strokeWidth={7}
            strokeColor="#FB6910"
            fillColor="#000"
            onStart={(params) => {
              console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
            }}
            onReady={result => {
              console.log(`Distance: ${result.distance} km`)
              console.log(`Duration: ${result.duration} min.`)
              distance=result;
            }}
          />
          </MapView >
          </View>
                <View style={Styles.card}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{flexDirection:'column',alignSelf:'flex-start',paddingRight:'25%'}}>
                            <Text style={{fontSize:15}}>{props.date.substring(0,10)}</Text>
                            <Text style={{fontSize:15}}>{props.date.substring(11,19)}</Text>
                        </View>
                        
                        <View>
                            <View style={{flexDirection:'row',marginleft:'30%',marginTop:5}}>
                                <Text style={{fontSize:15}}>From Shop: {props.shopname}</Text>
                            </View>
                        </View>
                    </View>  
                    
                    {/* <Text style={{alignSelf:'flex-end'}}>{distance} Kms</Text> */}
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
        elevation:1,
        backgroundColor:'white',
        height:50,
        marginBottom:10
    },
    cardSection:{
        //flexDirection:'row',
        //alignItems:"flex-start"

    },
    container: {
        ...StyleSheet.absoluteFillObject,
        flex:1,
      },
      map: {
        ...StyleSheet.absoluteFillObject,
      },
      search: {
        flex:1,
        width: '100%',
        flexDirection:'column',
      }
})
