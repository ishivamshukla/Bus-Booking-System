import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Completed from './Completed';
import Cancelled from './Cancelled';

const Tabs=createMaterialTopTabNavigator();
export default function MyBookings({navigation}){
return(
    <Tabs.Navigator tabBarOptions={{style:{backgroundColor:'white',paddingTop:30}}}>
        <Tabs.Screen name="Completed" component={Completed} />
        <Tabs.Screen name="Cancelled" component={Cancelled}/>
    </Tabs.Navigator>
)
}

