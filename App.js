import React,{useState,useEffect} from 'react';
import { View , StyleSheet } from 'react-native';
import { NavigationContainer, TabActions, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './screens/auth/Login';
import Signup from './screens/auth/Signup';

import HomeStackWithTab from './screens/main/HomeStackWithTab';

const AuthStack=createStackNavigator();
const HomeTabs=createBottomTabNavigator();
const HomeStack=createStackNavigator();
export default function App(){

    const [isLoggedIn,setIsLoggedIn]=useState(false);
    

    
  return(
    <View style={styles.container}>
      <NavigationContainer>
      {(isLoggedIn)?(
        <HomeStack.Navigator>
         
          <HomeStack.Screen name="HomeStackWithTab" component={HomeStackWithTab} options={{headerShown:false}}/>
          <HomeStack.Screen name="Login" component={Login}/>
            <HomeStack.Screen name="Signup"component={Signup}/>
        </HomeStack.Navigator>
        ):(
          <AuthStack.Navigator screenOptions={{headerShown:false}}>
            <AuthStack.Screen name="Login" component={Login}/>
            <AuthStack.Screen name="Signup"component={Signup}/>
            <AuthStack.Screen name="HomeStackWithTab" component={HomeStackWithTab} options={{headerShown:false}}/>
          </AuthStack.Navigator>
        
              )}

      </NavigationContainer>

    </View>
  )
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#F9F9F9'
  }
})