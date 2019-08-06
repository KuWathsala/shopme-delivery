import React, {Component} from 'react';
import {Text,View,StyleSheet} from 'react-native';

class Delivery extends Component{
    render(){
        return(
            <View styles={styles.container}>
                <Text>ukhjkk</Text>
            </View>
        );
    }
}
export default Delivery

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'blue',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
  });
  