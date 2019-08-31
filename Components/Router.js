import React,{Component} from 'react';
import { connect} from 'react-redux';
import {Scene,Router,Drawer} from 'react-native-router-flux';
import SignIn from './SignIn/SignIn';
import Map from './Map/Map';
import Profile from './Profile/Profile';
import Status from './Status';
import GetOrder from './GetOrder';
import WrapupDeliver from './WrapupDeliver';
import SideBar from './SideBar';
import Signup from './SignIn/SignUp';
import Signout from './SignIn/Logout';
import * as actions from './Store/Actions/index';

class RouterComponent extends Component{
    
    componentDidMount(){
        this.props.onTryAutoSignUp();
      }

    render(){
    return(
        <Router>
            <Scene key="root">
                
                <Drawer
                    hideNavBar={true}
                    key="drawerMenu"
                    contentComponent={SideBar}
                    drawerWidth={250}
                    drawerPosition="left"
                >
                <Scene key="login" component={SignIn} initial/*hideNavBar={true}*/ />
                <Scene key="Map" component={Map}/>
                <Scene key="Profile" component={Profile}/>
                <Scene key="Status" component={Status}/>
                <Scene key="GetOrder" component={GetOrder} />
                <Scene key="SignUp" component={Signup} />
                <Scene key="logout" component={Signout} />
                <Scene key="WrapupDeliver" component={WrapupDeliver} hideNavBar={true}/>
                {/*
                <Scene
                    key="carsListScreen"
                    component={CarsListScreen}
                />

                <Scene
                    key="carViewScreen"
                    component={CarViewScreen}
                /> */}

            </Drawer>
            </Scene>
        </Router>

    );
};
};

const mapDispatchToProps=dispatch=>{
    return{
      onTryAutoSignUp: ()=>dispatch(actions.authCheckState())
    };
  };

export default connect(null,mapDispatchToProps)(RouterComponent);