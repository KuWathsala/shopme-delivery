import React, {Component} from 'react';
import {Text,View,StyleSheet,Alert,ActivityIndicator} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { connect} from 'react-redux';
import * as actions from './Store/Actions/index';
import { Actions } from 'react-native-router-flux';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

class Start extends Component{
  constructor(props) {
    super(props);
    this.state={
      connected:null
    }
};
componentDidMount(){
  if(this.props.isAuth){
    Actions.Status();
  }
}


     render(){
        return(
          <View>
            {/* {this.state.connected ? null:
          <View style={styles.offlineContainer}>
          <Text style={styles.offlineText}>No Internet Connection</Text>
          </View>}
          {this.state.connected ? this.props.onTryAutoSignUp():null} */}
          {/* {this.props.onTryAutoSignUp()} */}
          <View style={{flex:1,justifyContent: 'center', alignItems: 'center', alignSelf:'center',position: 'absolute', top: 5}}>
          <Text style={{fontSize: 80,color: '#26bf63',fontWeight:'400', marginTop: '55%', fontWeight:'bold', }}>
              Shop
              <Text style={{color: '#5189c9',}}>
                  Me
              </Text>
          </Text>
          <Text style={{color: '#5d6661', fontSize: 25, fontWeight:'normal', marginTop:'-5%',fontWeight:'bold', marginLeft: '30%',marginBottom:10}}>
                      delivery
          </Text>
          <ActivityIndicator size='large' color="blue"/>
        
        </View>
        </View>
         
        );
    }
}
const mapStateToProps = (state) => {
  return {
      isAuth:state.auth.token!==null
  }
}

// const mapDispatchToProps=dispatch=>{
//   return{
//     onTryAutoSignUp: ()=>dispatch(actions.authCheckState())
//   };
// };

 export default connect(mapStateToProps,null)(Start);
//export default Start;

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width:'100%',
    position: 'absolute',

  },
  offlineText: { color: '#fff' }
});
