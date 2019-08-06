import React from 'react';
import {Text,StyleSheet,View,style} from 'react-native';

const Header=(props)=>{
    return(
    <View style={styles.viewStyle}>
        <Text style={styles.textStyle}>{props.head}</Text>
    </View>
    );    
}

export default Header;

const styles=StyleSheet.create({
    viewStyle: {
        backgroundColor: '#eed',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        paddingTop: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative'
      },
      textStyle: {
        fontSize: 20
      }
});