import React,{useEffect} from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,ScrollView,ToastAndroid} from 'react-native';

export default function ViewBooking({navigation,route}){
   
    let passengers=[];
    useEffect(()=>{ 
        route.params.seats.split(',').map((value,index)=>passengers.push({pname:'',pemail:'',seatNo:Number(value)})); 
    },[passengers.length])

    function validate(data){
        var emailre = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        data.forEach((value,index)=>{
            if(value.pname===""){
             
                ToastAndroid.show(` Passenger ${index+1} Name should not be empty`,ToastAndroid.SHORT);
                
            }
            else if(value.pemail===""){
                ToastAndroid.show(` Passenger ${index+1} Email should not be empty`,ToastAndroid.SHORT);
            }

            else if(!emailre.test(String(value.pemail).toLowerCase())){
                ToastAndroid.show(` Passenger ${index+1} should have valid email`,ToastAndroid.SHORT);
            }

            else{
                navigation.navigate('Booking Bill',{passengersData:passengers,url:route.params.url,id:route.params.id,cost:route.params.cost,busInfo:route.params.busInfo});
            }
        })
    }
  
    return(
    

       <View style={styles.container}>
              <ScrollView >        
           <Text style={styles.passengerInfoText}>passenger information</Text>
            {
                route.params.seats.split(",").map((value,index)=>
                 (
                    <View style={styles.infoContainer} key={index}>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                 <Text style={{padding:5,marginLeft:10,fontWeight:'bold',color:'grey'}}>Passenger {index+1}</Text>
                 <Text style={{padding:7,marginRight:10,fontWeight:'bold',color:'grey'}}>Seat No. {value}</Text>
                    </View>
                    <View style={{width:'90%',alignSelf:'center',marginTop:10}}>
                    <Text style={{fontSize:15,fontWeight:'bold',color:'grey',marginBottom:2}}>Name</Text>
                    <TextInput onChangeText={(text)=>{passengers[index].pname=text}} placeholder="Enter your name" style={{fontSize:16,borderBottomWidth:2,borderBottomColor:'#3e3fba',height:50}}></TextInput>
                    </View>
   
                    <View style={{width:'90%',alignSelf:'center',marginTop:10,marginBottom:30}}>
                    <Text style={{fontSize:15,fontWeight:'bold',color:'grey',marginBottom:2}}>Email Address</Text>
                    <TextInput onChangeText={(text)=>{passengers[index].pemail=text}} placeholder="Enter your email" style={{fontSize:16,borderBottomWidth:2,borderBottomColor:'#3e3fba',height:50,}}></TextInput>
                    </View>
   
   
                </View>
                 )  
                )
              
                 
                       }
            
            <View style={{height:200}}></View>
            </ScrollView>
            <View style={{position:'absolute',backgroundColor:'white',width:'100%',bottom:0}}>
               <TouchableOpacity onPress={()=>{
                    validate(passengers);
             
                   }}>
                <View style={{height:60,backgroundColor:'#3e3fba',justifyContent:'center'}}>
                    <Text style={{color:'white',fontSize:18,alignSelf:'center'}}>Confirm Booking</Text>
                </View>
                </TouchableOpacity>
            </View>
           
            
           
       </View>
       
   );
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        
    },
    passengerInfoText:{
        marginTop:20,
        marginLeft:20,
        fontSize:18,
        fontWeight:'bold'
    },
    infoContainer:{
        width:"90%",
       
       
        alignSelf:'center',
        marginTop:20,
        backgroundColor:'white',
        borderRadius:5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
            }
});