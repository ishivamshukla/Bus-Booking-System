import React from 'react';
import {View,Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import BookBus from './BookBus';
import MyBookings from './MyBookings';
import MyAccount from './MyAccount';
import {AntDesign} from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
const HomeTabs=createBottomTabNavigator();
export default function HomeTabNavigator({navigation}){
 
    return(
        <HomeTabs.Navigator tabBarOptions={{activeTintColor:'#fff',inactiveTintColor:'#8f90d7',style:{backgroundColor:'#3e3fba',height:'8.4%',paddingBottom:4.2}}}  shifting={false} >
        <HomeTabs.Screen name="Home" component={BookBus} options={{tabBarIcon:({focused,color})=>{
          if(focused){
            return <AntDesign name="home" size={29} color="white"/>
          }
          else{
            return <AntDesign name="home" size={27} color="#9F9FDD"/>
          }
        }}}/>
        <HomeTabs.Screen name="My Bookings" component={MyBookings} options={{tabBarIcon:({focused,color})=>{
            if(focused){
              return  <Entypo name="list" size={29} color="white" />
            }
            else{
              return <Entypo name="list" size={27} color="#9F9FDD" />
            }
        
        }}}/>
        <HomeTabs.Screen name="My Account" component={MyAccount} options={{tabBarIcon:({focused,color})=>{
          if(focused){
            return <EvilIcons name="user" size={39.5} color="white"/>
          }
          else{
            return <EvilIcons name="user" size={35.5} color="#9F9FDD" />
          }
        }}}/>
        </HomeTabs.Navigator>
    )
    
}