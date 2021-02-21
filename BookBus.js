import React,{useState} from 'react';

import {View,Text,StyleSheet, ScrollView,TouchableOpacity, ToastAndroid} from 'react-native';
import IconInputField from '../../components/IconInputField';
import { Fontisto } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import BusInfoBox from '../../components/BusInfoBox';
import app from '../../Fire';
import "firebase/database";
export default function BookBus({navigation,route}){
    const [buses,setBuses]=useState([]);
    const data=[1,2,3];
    

    if(route.params){   
        if(route.params.sourceName){
            var {sourceName}=route.params;
        }
        else{
            var sourceName="";
        }
        
        if(route.params.destinationName){
            var {destinationName} = route.params;
        }
        else{
            var destinationName="";
        }
    }
    
    return(
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.fieldsContentContainer}>
                <View style={styles.textRowContainer}>
                <Text style={[styles.text,{fontSize:27,fontWeight:'bold'}]}>Book tickets</Text>
                <Text style={[styles.text,{fontSize:25,fontWeight:'bold'}]}>BBS</Text>
                </View>
                
                <View style={styles.fieldsContainer}>
                 <IconInputField icon={<Fontisto name="bus" size={24} color="black" />} placeholder="ENTER SOURCE" onPress={()=>navigation.navigate('Select Location',{selectionType:'source'})} value={(route.params)?sourceName:""}/> 
                 <IconInputField icon={<FontAwesome5 name="traffic-light" size={24} color="black" />} placeholder="ENTER DESTINATION" onPress={()=>navigation.navigate('Select Location',{selectionType:'destination'})} value={(route.params)?destinationName:""}/>                     
                
                <TouchableOpacity onPress={()=>{
                    if(sourceName!==undefined&&destinationName!==undefined){
                       async function fetchData(){
                          const snapshot = await app.database().ref(`/routes/${sourceName}To${destinationName}`).once('value').catch((err)=>console.log(err))
                        try{
                            if(snapshot.val()){
                                setBuses(snapshot.val());
                               
                            }
                        }catch(err){
                            ToastAndroid.show('There is no bus for the route',ToastAndroid.SHORT)
                        }
                        
                        }
                       fetchData();
                    }
                    else{
                        console.log(`the url is${sourceName}To${destinationName}`);
                    }
                }}>
                    <View style={styles.searchButton}>
                        <Text style={[styles.text,{fontWeight:'bold'}]}>SEARCH</Text>
                    </View>
                </TouchableOpacity>
               </View>
            </View>
            {
               (buses!==undefined)?(
                buses.map((value,index)=>(
                    <TouchableOpacity onPress={()=>navigation.navigate('Book Seats',{provider:value.provider,busName:value.bus,time:value.time,seats:value.seats,hours:value.hrs,rating:value.ratings,fare:value.cost,date:value.date,url:`${sourceName}To${destinationName}`,id:index,sname:sourceName,dname:destinationName})} key={index}>
                          <BusInfoBox busName={value.provider} busTime={value.time} busMetaInfo={value.bus} seats={value.seats} hours={value.hrs} rating={value.ratings}  fare={value.cost} date={value.date} />
                    </TouchableOpacity>
                   ))
               ):(
                   <View>
                       
                   </View>
               )
               
            }
            
            <View style={{height:90}}></View>
          </ScrollView>
        </View>
    );
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        
    },
    fieldsContentContainer:{
        backgroundColor:'#3e3fba',
        padding:'3%',
        paddingTop:'9%',
        alignItems:'center',
        marginBottom:'7%'
        
    },
    textRowContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:'95%'
    },  
    text:{
        color:'white'
    },
    fieldsContainer:{
        
        width:'95%',
        marginTop:'4%',
        backgroundColor:'white',
        borderRadius:4,
        paddingBottom:"3.5%",
        paddingTop:"3.5%"
        },
        dateRow:{
            flexDirection:'row',
            justifyContent:'space-between',
            borderBottomWidth:1,
            marginTop:'-1%',
            borderBottomColor:"grey",
            width:'90%',
            alignSelf:'center'
        },
        searchButton:{
            backgroundColor:'#3e3fba',
            alignItems:'center',
            width:'90%',
            alignSelf:'center',
            marginTop:'5%',
            padding:'3%',
            borderRadius:5          
        },
       


}
);