import React,{Component} from "react";
import { View, Text, Dimensions, Image, StyleSheet} from "react-native";
import MapView, {PROVIDER_GOOGLE, Marker, Circle} from 'react-native-maps';
import {connect} from 'react-redux';

class Map extends React.Component{
  constructor(props){
    super(props);
    this.state={
      source: {
        latitude: 6.9271,
        longitude: 79.8612
      },
      address: null,
      error: null,
    };
  }
  
  // componentDidMount(){
  //   navigator.geolocation.getCurrentPosition(
  //     position=> {
  //       console.log('position->',position);
  //       this.setState({
  //         source:{
  //           latitude: position.coords.latitude,
  //           longitude: position.coords.longitude,
  //         },
  //         error:null,
  //       });
  //     },
  //     error=> {this.setState({error: error.message })},
  //     //{ enableHighAccuracy: false, timeout: 25000, maximumAge: 3600000 },
  //   );
  // }

  render(){
    console.log('state->',this.state);
    return(
      <View style={styles.container}>
        <MapView 
          showsUserLocation
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude:  this.state.source.latitude, 
            longitude: this.state.source.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >

        <Marker
          draggable
          coordinate={{
            latitude:  this.state.source.latitude, 
            longitude: this.state.source.longitude,
          }}

          onDragEnd={ 
            (e) => this.setState({ 
              source:{
                latitude:  e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,  
              }
            },
            console.log(this.state))
          }
        />
        <Marker
          coordinate={{
            latitude:7.1,
            longitude:80.0,
          }}
          pinColor='green'
        />

        {/*<Circle
          center={{
            latitude:  this.state.latitude, 
            longitude: this.state.longitude,
          }}
          radius={500}
          strokeWidth={2}
          strokeColor="#3399ff"
          //fillColor="#80bfff"
        />*/}

        
        {/*<MapViewDirections
          origin={this.state.source}
          destination={this.state.destination}
          strokeWidth={6}
          strokeColor="blue"
          apikey="AIzaSyAnAth7L5EhCtuNs_Znsvl-Ihhtsxb1Dlg"
        />*/}
        </MapView >
      </View>
    );
  }
}

const mapStateToProps=state=>{
  return{
  }
}

const mapDispatchToProps=dispatch=>{
  return{
      onAuth:()=>dispatch(actions.auth())
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Map);


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex:1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  search: {
    flex:1,
    width: '100%',
    flexDirection:'column',
  }
});


