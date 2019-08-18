import React from 'react';
import {Text,StyleSheet,View,TouchableHighlight,Image} from 'react-native';

const Header=(props)=>{
    return(
    <View style={styles.viewStyle}>
        <TouchableHighlight style={{marginLeft:10,marginTop:2}}
          onPress={()=>{
            // Actions.drawerMenu();
             console.log("CLICKEDDDDDDDDD");
            // const{navigate}=this.props.navigation;
            // navigate('DrawerOpen');
          }}>
            <Image
              style={{width:32, height:32}}
              source={require('../Assets/menuList.png')}/>
        </TouchableHighlight>
        <Text style={styles.textStyle}>{props.head}</Text>
    </View>
    );    
}

export default Header;

const styles=StyleSheet.create({
    viewStyle: {
        flexDirection:'row',
        backgroundColor: '#eed',
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
        fontSize: 20,
        justifyContent: 'center',
      }
});