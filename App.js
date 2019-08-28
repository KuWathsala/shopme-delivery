/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {StyleSheet,} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Store from './Components/Store/Store';
import {Provider} from 'react-redux';
import Router from './Components/Router';
import SingalR from './SingalR';

const App = () => {
  return (
    <Provider store={Store}>
        <Router/>
    </Provider>
 );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignContent:'center',
    alignItems:'center',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
