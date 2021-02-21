import React from 'react';
import {View,Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeTabNavigator from './HomeTabNavigator';
import SelectLocation from './SelectLocation';
import BookSeats from './BookSeats';
import ViewBooking from "./ViewBooking";
import BookingBill from './BookingBill';
import PaymentSuccessful from './PaymentSuccesful';
import TicketView from './TicketView';

const HomeStackTabWithScreens=createStackNavigator();
export default function HomeStackWithTab({navigation}){
    return(
      <HomeStackTabWithScreens.Navigator>
          <HomeStackTabWithScreens.Screen name="Home" component={HomeTabNavigator} options={{headerShown:false}}/>
          <HomeStackTabWithScreens.Screen name="Select Location" component={SelectLocation} options={{headerTintColor:'white',headerStyle:{
                        backgroundColor:'#3e3fba'
                }}}/>
          <HomeStackTabWithScreens.Screen name="Book Seats" component={BookSeats} options={{headerTintColor:'white',headerStyle:{
                        backgroundColor:'#3e3fba'
                }}}/>
            
            <HomeStackTabWithScreens.Screen name="Seats Details" component={ViewBooking} options={{headerTintColor:'white',headerStyle:{
                        backgroundColor:'#3e3fba'
                }}}/>

            <HomeStackTabWithScreens.Screen name="Booking Bill" component={BookingBill} options={{headerTintColor:'white',headerStyle:{
                        backgroundColor:'#3e3fba'
                }}}/>
             <HomeStackTabWithScreens.Screen name="Payment Successful" component={PaymentSuccessful} options={{headerShown:false}}/>
            
             <HomeStackTabWithScreens.Screen name="Ticket View" component={TicketView} options={{title:'',headerTintColor:'white',headerStyle:{
                        backgroundColor:'#3e3fba'
                }}}/>
  
      
      </HomeStackTabWithScreens.Navigator>)

}