import React, {Component} from 'react';
import {Text,View,StyleSheet,TextInput,Image,TouchableOpacity,Alert,Linking,KeyboardAvoidingView} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import * as actions from '../Store/Actions/index';
import {Field,reduxForm,getFormValues,submit} from 'redux-form';

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
const isValidPassword=value=> value && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(value) ? 'Password must contain UPPERCASE lowercase and numbers':undefined;
const passwordMatch=(value,allValues)=> value!==allValues.Password ? 'Passwords do not Match':undefined;

class RegisterForm extends Component{
    constructor(props) {
        super(props);
        state = {
        }
      }
    

    handleSubmit=(values)=>{
        //onAuth(this.state.email,this.state.password);
        console.log(values);
        //this.props.onAuth(this.state.email,this.state.password)
       
        
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
        // const submit=value=>{
        //     console.log(value)
        //     Alert.alert(`validation successful ${JSON.stringify(value)}`);
        // }
        const {submitting,handleSubmit,onSubmit}=this.props;
        console.log(submitting);
        return(
        <KeyboardAvoidingView style={styles.container} behavior='position' >
                <View style={{alignItems:'flex-start'}}>
                    <Image source={require('../../Assets/logo.png')} style={{width:'40%',height:50,marginTop:10,marginRight:'5%',borderRadius:15}}/>
                    <Text style={{alignSelf:'center', fontSize:40,color:"steelblue",paddingTop:'5%',paddingBottom:'5%',fontWeight:'bold'}}>Registeration Form </Text>
                    <Field name="FirstName" placeholder='First Name' component={renderField} 
                        // validate={[required]}
                    />
                    <Field name="LastName" placeholder='Last Name' component={renderField} 
                        validate={[required]}
                    />
                    <Field name="MobileNumber" keyboardType='numeric' placeholder='Mobile Number' component={renderField} 
                        validate={[required]}
                    />
                    <Field name="Email" keyboardType="email-address" placeholder='Email' component={renderField} 
                        validate={[required,isValidEmail]}
                    />
                    <Field name="Password" keyboardType='default' placeholder='Password' secureTextEntry={true} component={renderField}
                        validate={[required,isValidPassword]} 
                    />
                    <Field name="ConfirmPassword" keyboardType='default' placeholder='Confirm Password' secureTextEntry={true} component={renderField}
                        validate={[required,passwordMatch]} 
                    />
                    <TouchableOpacity onPress={()=>handleSubmit()} disabled={submitting} style={{margin:5,alignSelf:'stretch'}}>
                            <Text style={{
                                backgroundColor:'steelblue',color:'white',fontSize:16,
                                height:37,width:'100%',textAlign:'center',padding:10
                            }}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}
const mapDispatchToProps=dispatch=>{
    return{
       // onAuth:()=>dispatch(actions.auth())
    };
   }
  const SignUp=reduxForm({
      form:'contact',
  })(RegisterForm)
  export default SignUp;
//export default connect(null,mapDispatchToProps)(SignUp);

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