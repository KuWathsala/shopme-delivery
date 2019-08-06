import React from 'react';
import {Scene,Router} from 'react-native-router-flux';
import SignIn from './SignIn/SignIn';
import Map from './Map/Map';

const RouterComponent=()=>{
    return(
        <Router>
            <Scene key="root">
                <Scene key="login" component={SignIn} title={null} initial/>
                <Scene key="Map" component={Map}/>
            </Scene>
        </Router>

    );
};

export default RouterComponent;