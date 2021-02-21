import React from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
export default function PaymentSuccesful({navigation}){
    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}> 
            <FontAwesome name="ticket" size={100} color="#3e3fba" />
            <Text style={{color:'#3e3fba',fontSize:20,marginTop:20,fontWeight:'bold'}}>your ticket is booked succesfully </Text>
            <View style={{width:'100%',position:'absolute',bottom:0}}>
                <TouchableOpacity onPress={()=>navigation.popToTop()}>
                <View style={{width:'100%',padding:20,backgroundColor:'#3e3fba'}}>
                    <Text style={{color:'white',fontSize:20,textAlign:'center'}}>Done</Text>
                </View>
                </TouchableOpacity>
                </View>
        </View>
    )
}