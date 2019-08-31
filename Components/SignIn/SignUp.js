import React, {Component} from 'react';
import {Text,View,StyleSheet,TextInput,Image,TouchableOpacity,KeyboardAvoidingView,ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {Field,reduxForm,getFormValues,formValueSelector} from 'redux-form';
import {auth} from '../Store/Actions/Auth';

const renderField=({keyboardType,placeholder,secureTextEntry, meta:{touched,error,warning},input:{onChange, ...restInput}})=>{
    return(<View style={{flexDirection:'column',height:70,alignItems:'flex-start'}}>
       <View style={{flexDirection:'row',height:50,alignItems:'center'}}>
           <TextInput style={styles.Input} keyboardType={keyboardType} placeholder={placeholder} secureTextEntry={secureTextEntry} onChangeText={onChange} {...restInput}/>
       </View>
        {touched && ((error && <Text style={{color:'red',fontWeight:'bold'}}>{error}</Text>) /*|| 
                    (warning && <Text style={{color:red}}>{warning}</Text>)*/) }
       </View>
    );
}
const required=value=> value ? undefined:'Required';
const isValidEmail=value=> value && !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(value) ? 'Invalid email address':undefined;
const isValidPassword=value=> value && !/^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/i.test(value) ? 'Required UPPERCASE, lowercase, digit, symbol and minimum 10 characters ':undefined;
const passwordMatch=(value,allValues)=> value!==allValues.Password ? 'Passwords do not Match':undefined;


class RegisterForm extends Component{
    constructor(props) {
        super(props);
        state = {
        }
      }

submit=(values)=> {
    let authData
    authData={
        LoginVM:{
          Email:values.Email,
          Password:values.Password,
          Role:'Deliverer'
        },
        FirstName:values.FirstName,
        LastName:values.LastName,
        MobileNumber:values.MobileNumber,
        VehicleNo:values.VehicleNo,
        VehicleType:"Three Wheel",
        returnSecureToken: true,
      }
        this.props.auth(authData)
        //window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
        console.log(values);
    }


render(){
    const {submitting,handleSubmit,onSubmit}=this.props;
    const vehicles = ["Motor Bicycle", "Three Wheel"];
    console.log(submitting);
    return(
            <ScrollView>
                <KeyboardAvoidingView style={styles.container} behavior='position' >
                    <Image source={require('../../Assets/logo.png')} style={{width:'40%',height:50,marginTop:10,marginRight:'5%',borderRadius:15}}/>
                    <Text style={{alignSelf:'center', fontSize:40,color:"steelblue",paddingTop:'5%',paddingBottom:'5%',fontWeight:'bold'}}>Registeration Form </Text>
                    <Field name="FirstName" placeholder='First Name' component={renderField} 
                         validate={[required]}
                    />
                    <Field name="LastName" placeholder='Last Name' component={renderField} 
                        validate={[required]}
                    />
                    <Field name="MobileNumber" keyboardType='numeric' placeholder='Mobile Number' component={renderField} 
                        validate={[required]}
                    />
                     {/* <Field name="VehicleType" component="select" style={{alignSelf:'center',marginLeft:'relative',height:37,width:200}}>
                        <option value=""><Text>Select a vehicle...</Text></option>
                            {vehicles.map(Option => (
                                <option value={Option} key={Option}>
                            {Option}
                        </option>
                        ))}
                    </Field> */}
                    <Field name="VehicleNo" component={renderField} placeholder='Vehicle Number'
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
                    <TouchableOpacity onPress={handleSubmit(this.submit)} disabled={submitting} style={{margin:5,alignSelf:'stretch'}}>
                            <Text style={{
                                backgroundColor:'steelblue',color:'white',fontSize:16,
                                height:37,width:'100%',textAlign:'center',padding:10
                            }}>Submit</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}

const mapStateToProps=state=>{
    return{
     //user:state.form
    }
  }
  const SignUp=reduxForm({
      form:'contact',
  })(RegisterForm)
//   export default SignUp;
export default connect(null,{auth})(SignUp);

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