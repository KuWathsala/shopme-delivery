import React from 'react';
import { View, Image, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/Ionicons';
import Geocoder from 'react-native-geocoding';

Geocoder.init('AIzaSyAnAth7L5EhCtuNs_Znsvl-Ihhtsxb1Dlg');

export default class SearchPlace extends React.Component{

  componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      position=> {
        console.log('position->',position);
        this.setState({
          source:{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          error:null,
        });
      },
      error=> {this.setState({error: error.message })},
      { enableHighAccuracy: false , timeout: 10000}
    );
  }
  
  render(){
    return (
      <GooglePlacesAutocomplete
        placeholder="find that close to you"
        minLength={3} 
        autoFocus={false}
        returnKeyType={'search'} 
        listViewDisplayed='auto'  
        fetchDetails={true}
        renderDescription={row => row.description} // custom description render

        onPress={(data, details = null) => { 
          //props.source.latitude=details.geometry.location.lat,
          //props.source.longitude=details.geometry.location.lng
          //console.log(props.source);
          console.log(details.geometry);
        }}
        
        getDefaultValue={() => ''}
        
        query={{
        key: 'AIzaSyAnAth7L5EhCtuNs_Znsvl-Ihhtsxb1Dlg',
        language: 'en', 
        types: '(cities)' 
        }}

        nearbyPlacesAPI='GooglePlacesSearch' 

        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} 

        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.

        styles={{
        textInputContainer: {
          flexDirection: 'column',
          width: '100%',
          backgroundColor: 'white',
          height: 50,
        },
        textInput: {
          marginLeft: 20,
          marginRight: 0,
          height: 40,
          backgroundColor: 'white',  
          fontSize: 20,
        },
        predefinedPlacesDescription: {
          color: 'white',
          backgroundColor: 'white'
        },
        }}
      />
    );
  }
}
  