import React from 'react';
import {Scene,Router,Drawer} from 'react-native-router-flux';
import SignIn from './SignIn/SignIn';
import Map from './Map/Map';
import Profile from './Profile/Profile';
import Status from './Status';
import GetOrder from './GetOrder';
import WrapupDeliver from './WrapupDeliver';
import SideBar from './SideBar';
import Signup from './SignIn/SignUp';

const RouterComponent=()=>{
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
                <Scene key="login" component={SignIn} /*hideNavBar={true}*/ />
                <Scene key="Map" component={Map}/>
                <Scene key="Profile" component={Profile}/>
                <Scene key="Status" component={Status}/>
                <Scene key="GetOrder" component={GetOrder} />
                <Scene key="SignUp" component={Signup} initial/>
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

export default RouterComponent;