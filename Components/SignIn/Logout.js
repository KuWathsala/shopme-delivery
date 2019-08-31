import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../Store/Actions/index';
import SignIn from './SignIn';
import {Actions} from 'react-native-router-flux';

class Logout extends Component{
    componentDidMount(){
        this.props.OnLogout();
    }

    render(){
       return <SignIn/>
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        OnLogout:()=>dispatch(actions.logout())
    };
};

export default connect(null,mapDispatchToProps)(Logout);