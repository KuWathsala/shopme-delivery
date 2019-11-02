import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Circle} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

export default Card =(props)=>{
    return(
        
            <View style={{flex:1}}>
                <View style={{height:150}}>
                <MapView 
                    showsUserLocation
                    provider={PROVIDER_GOOGLE}
                    style={Styles.map}
                    region={{
                    latitude:6.788070599999998,
                    longitude:79.89128129999995,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                    }}
                >
          
          <Marker
            coordinate={{
              latitude:6.788070599999998,
              longitude:79.89128129999995,
            }}
            //image={shopMarker}
          />

          <Marker
            coordinate={{
              latitude:6.837673280321542,
              longitude:79.90480335265399,
            }}
          />
           {/* <MapViewDirections
            origin={this.props.shopLocation}
            destination={this.props.customerLocation}
            apikey={'AIzaSyDfp50rT_iIa365h388F4TjLEWBS39S2kM'}
            strokeWidth={7}
            strokeColor="#605650"
            fillColor="#000"
          />        */}
          </MapView >
          </View>
                <View style={Styles.card}>
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
                    </View>  
                    
                    <Text style={{textAlign:'right'}}>Rs.450.00</Text>
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
