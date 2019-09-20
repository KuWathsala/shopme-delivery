import React, {Component} from 'react';
import {Text,View,StyleSheet,Alert,ActivityIndicator} from 'react-native';
import NetInfo from "@react-native-community/netinfo";

class Net extends Component{
    constructor(props) {
      super(props);
      this.state={
        connected:null
      }
  };
  
  
  
  componentDidMount(){
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this._handleConnectivityChange
  
  );
  
    NetInfo.isConnected.fetch().done((isConnected) => {
      if(isConnected == true)
      {
       this.setState({connected:true});
      }else{
       this.setState({connected:false});
      }
    });
  }
  
    componentWillUnmount() {
      NetInfo.isConnected.removeEventListener(
          'connectionChange',
          this._handleConnectivityChange
      );
    }
   
    _handleConnectivityChange = (isConnected) => {
      if(isConnected == true)
        {
          this.setState({connected:true})
        }
        else
        {
          this.setState({connected:false})
        }
    };
  render(){
    return(
      <View style={styles.offlineContainer}>
        {this.state.connected ? null:<Text style={styles.offlineText}>No Internet Connection</Text>}
    </View>
  );}
}
export default Net;

const styles = StyleSheet.create({
    offlineContainer: {
      backgroundColor: '#b52424',
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      width:'100%',
      position: 'absolute',
      top:30
  
    },
    offlineText: { color: '#fff' }
  });
  