import React, {Component} from 'react';
import {Text,View,StyleSheet,TextInput,TouchableHighlight} from 'react-native';
import Button from 'react-native-button';
import Header from '../Header';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

class SignIn extends Component{
    constructor(props) {
        super(props);
        state = {
          email   : '',
          password: '',
        }
      }

    handleSubmit=()=>{
        Actions.Map();
        this.props.onAuth(this.state.email,this.state.password)
    }

    render(){
        return(
            <View style={{backgroundColor:"#1BE0AE",paddingBottom:500}}>
                <Header head={'Sign In'}/>

            <View style={{alignContent:"center"}}>
                <View style={{alignItems:'center',justifyContent:'flex-end',paddingTop:300,paddingBottom:50}}> 
                        <Text style={{fontSize:40,color:"white",paddingBottom:40}}>Hey,  Ready to Ride ? </Text>               
                        <TextInput style={styles.Input} 
                            placeholder='Email'
                            keyboardType="email-address" 
                            underlineColorAndroid='transparent'
                            onChangeText={(email) => this.setState({email})}
                            />
                        <TextInput style={styles.Input} 
                            placeholder='Password' 
                            secureTextEntry={true} 
                            underlineColorAndroid='transparent'
                            onChangeText={(password) => this.setState({password})}
                            />
                    <Button
                        style={{fontSize:20,color:'blue',fontWeight:'bold'}}
                        containerStyle={{backgroundColor:'#EEE',borderRadius:4,height:45,width:150,overflow:'hidden',marginTop:40}}
                        onPress={()=>this.handleSubmit()}
                    >
                        Log In
                    </Button>
                </View>
            </View>
                
            </View>
            
        );
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        onAuth:(email,password)=>dispatch(actions.authVerify(email,password))
    };
  }
export default connect(null,mapDispatchToProps)(SignIn);

const styles=StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC',
      },

      Input:{
          backgroundColor:"white",
          width:420,
          height:40,
          borderWidth:1,
          borderRadius:2,
          borderColor:'#ddd',
          borderBottomWidth:0,
          shadowColor:'#000',
          shadowOffset:{width:0,height:2},
          shadowOpacity:0.1,
          elevation:1,
          marginLeft:5,
          marginRight:5,
          marginTop:10,
          paddingEnd:10,
      }
});