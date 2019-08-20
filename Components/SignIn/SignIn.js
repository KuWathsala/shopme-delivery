import React, {Component} from 'react';
import {Text,View,StyleSheet,TextInput,Image,TouchableOpacity,Alert,Linking,KeyboardAvoidingView} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import * as actions from '../Store/Actions/index';
import {Field,reduxForm} from 'redux-form';
import submit from './submit';

const renderField=({keyboardType,placeholder,secureTextEntry, meta:{touched,error,warning},input:{onChange, ...restInput}})=>{
    return(<View style={{flexDirection:'column',height:70,alignItems:'flex-start'}}>
       <View style={{flexDirection:'row',height:50,alignItems:'center'}}>
           <TextInput style={styles.Input} keyboardType={keyboardType} placeholder={placeholder} secureTextEntry={secureTextEntry} onChangeText={onChange} {...restInput}/>
       </View>
        {touched && ((error && <Text style={{color:'red'}}>{error}</Text>) /*|| 
                    (warning && <Text style={{color:red}}>{warning}</Text>)*/) }
       </View>
    );
}
const required=value=> value ? undefined:'Required';
const isValidEmail=value=> value && !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(value) ? 'Invalid email address':undefined;



class ContactForm extends Component{
    constructor(props) {
        super(props);
        state = {
        }
      }

    handleSubmiting=()=>{
        //onAuth(this.state.email,this.state.password);
        Actions.Map();
        this.props.onAuth(this.state.email,this.state.password)
        
        
    }
    handleRegister=()=>{
        Alert.alert(
            'Register ? ',
            'For register pls visit our site, Press OK',
            [
              {text: 'Ask me later', onPress: () => console.log('Ask me later Pressed'),},
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style:'cancel'},
              {text: 'OK', onPress: () => { Linking.openURL('https://www.google.com')}},
            ],
            { cancelable: false }
          )
    }

    render(){
        const {submitting,handleSubmit,onSubmit}=this.props;
        return(
            
            // <View style={styles.container}>
            // <View style={{alignContent:"center"}}>
            //     <View style={{alignItems:'center'}}> 
            //         <Image source={require('../../Assets/logo.png')} style={{width:'50%',height:60,marginTop:10,marginRight:'5%',borderRadius:15}}/>
            //             <Text style={{fontSize:40,color:"steelblue",paddingTop:'25%',paddingBottom:'30%',fontWeight:'bold'}}>Welcome,  Ready to Ride ? </Text>               
                        
                            
            //             <TextInput style={styles.Input} 
            //                 placeholder='Email'
            //                 keyboardType="email-address" 
            //                 underlineColorAndroid='transparent'
            //                 onChangeText={(email) => this.setState({email})}
            //                 />
            //             <TextInput style={styles.Input} 
            //                 placeholder='Password' 
            //                 secureTextEntry={true} 
            //                 underlineColorAndroid='transparent'
            //                 onChangeText={(password) => this.setState({password})}
            //                 />

            //         <TouchableOpacity onPress={()=>this.handleSubmit()} style={{margin:10,alignSelf:'stretch'}}>
            //             <Text style={{
            //                 backgroundColor:'steelblue',color:'white',fontSize:16,
            //                 height:37,width:'100%',textAlign:'center',padding:10
            //             }}>Log In</Text>
            //         </TouchableOpacity>

            //         <TouchableOpacity onPress={()=>this.handleRegister()} style={{margin:10,alignSelf:'stretch'}}>
            //             <Text style={{
            //                 color:'steelBlue',fontSize:16,textAlign:'center',padding:10
            //             }}>Wanna Register as ShopMe Deliverer ? </Text>
            //         </TouchableOpacity>
            //     </View>
            // </View>
                
            // </View>

            <KeyboardAvoidingView style={styles.container} behavior='position'>
                <View style={{alignItems:"center"}}>
                    <Image source={require('../../Assets/logo.png')} style={{width:'70%',height:80,marginTop:10,marginRight:'5%',borderRadius:15}}/>
                    <Text style={{fontSize:40,color:"steelblue",paddingTop:'45%',paddingBottom:'25%',fontWeight:'bold'}}>Welcome,  Ready to Ride ? </Text> 
                    <Field name="Email" keyboardType="email-address" placeholder='Email' component={renderField} 
                        validate={[required,isValidEmail]}
                    />
                    <Field name="Password" keyboardType='default' placeholder='Password' secureTextEntry={true} component={renderField}
                        validate={[required]} 
                    />
                    <TouchableOpacity onPress={handleSubmit(submit)} disabled={submitting} style={{margin:5,alignSelf:'stretch'}}>
                            <Text style={{
                                backgroundColor:'steelblue',color:'white',fontSize:16,
                                height:37,width:'100%',textAlign:'center',padding:10
                            }}>Log In</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}
  const SignIn=reduxForm({
      form:'Signin',
  })(ContactForm)
  //export default SignIn;
export default SignIn;

const styles=StyleSheet.create({
    container: {
            backgroundColor:"white",
            flex: 1,
            flexDirection: 'column',
            alignItems: 'stretch',
            
      },
      backgroundImage: {
          flex:1,
        alignSelf: 'stretch',
        width: null, // or 'stretch'
      },
      Input:{
          backgroundColor:"white",
          width:420,
          height:40,
          borderWidth:1,
          borderRadius:2,
          borderColor:'steelblue',
          shadowColor:'#000',
          shadowOffset:{width:0,height:2,},
          shadowOpacity:0.1,
          elevation:1,
          marginLeft:5,
          marginRight:5,
          marginTop:10,
      }
});