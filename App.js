/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment,Component} from 'react';
import {StyleSheet,Alert,View,Text} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Store from './Components/Store/Store';
import {Provider} from 'react-redux';
import Router from './Components/Router';
import SingalR from './SingalR';
import Net from './Components/Net'
class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      connected:true
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
  return (
    <Provider store={Store}>
    {this.state.connected ? <Router/>: 
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>No Internet Connection</Text>
    </View>}
    </Provider> 
    
 );
}
};

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


export default App;
