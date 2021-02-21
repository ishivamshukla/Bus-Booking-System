import React,{useState} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,ScrollView} from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { BaseRouter } from '@react-navigation/native';
import app from '../../Fire';
import "firebase/database";
import "firebase/auth";
import FullModal from '../../components/FullModal';
export default function BookingBill({navigation,route}){
        const [modalVisible,setModalVisible]=useState(false);
        let cost=route.params.cost;
        let totalCost=cost*route.params.passengersData.length;
        console.log(app.auth().currentUser);
      
    return(
        <View style={styles.container}>
            <ScrollView>
                <FullModal
                modalVisible={modalVisible}
                >

                </FullModal>
           <View style={styles.billContainer}>
                <View style={styles.travelDetailsContainer}>
                    <Text style={styles.headings}>Travel Details</Text>
                   <View style={styles.infoWrapper}>
                    <Text style={styles.infoText}>{route.params.busInfo.provider}</Text>
                    <Text style={styles.infoText}>{route.params.busInfo.date}</Text>  
                    <Text style={styles.infoText}>{route.params.busInfo.busName} </Text>
                    <Text style={styles.infoText}>BOARDING POINT:  {route.params.busInfo.boarding}</Text>
                    <Text style={styles.infoText}>DROPPING POINT:  {route.params.busInfo.dropping}</Text>
                   </View>
                    
                </View>

                    <View style={styles.passengerDetailsContainer} >
                    <Text style={styles.headings}>Passenger Details</Text>
                {
                    route.params.passengersData.map((value,index)=>(
                    <View style={styles.infoWrapper} key={index}>
                    <View style={styles.rows}>
                    <Text style={styles.infoText}>{value.pname}</Text>
                    <Text style={styles.infoText}>Seat No. {value.seatNo}</Text>
                    </View>
                    <Text style={styles.infoText}>{value.pemail}</Text>
                    </View>
                ))
                }
                </View>
                    

              <View style={styles.fareDetailsContainer}>
                    <Text style={styles.headings}>Fare Details</Text> 
                        {
                            route.params.passengersData.map((value,index)=>(
                                <View style={styles.rows} key={index}>
                                <Text style={[styles.infoText,{marginLeft:20,marginRight:20}]}>Seat No. {value.seatNo}</Text>
                            <Text style={[styles.infoText,{marginLeft:20,marginRight:20}]}><FontAwesome name="rupee" size={12} color="grey" /> {cost}</Text>
        
                            </View>
                            ))
                        }

                    <View style={styles.rows}>
                        <Text style={[styles.infoText,{marginLeft:20,marginRight:20,color:'black',fontWeight:'bold',fontSize:18}]}>Total Payable</Text>
            <Text style={[styles.infoText,{marginLeft:20,marginRight:20,color:'black',fontWeight:'bold',fontSize:18}]}><FontAwesome name="rupee" size={15} color="black" /> {totalCost}</Text>
                    </View>
              </View>  
           </View>
            <View style={{height:100}}></View>
            </ScrollView>
           <View style={{ position:'absolute',bottom:0,width:'100%'}}>
          <TouchableOpacity onPress={()=>{
              route.params.passengersData.forEach((value,index)=>{
                  let [username]=value.pemail.split('@');

                app.database().ref(`/tickets/${username}`).push().set({
                    passengerName:value.pname,
                    passengerEmail:value.pemail,
                    seatNo:value.seatNo,
                    fare:cost,
                    route:route.params.url,
                    id:route.params.id,
                    cancelled:false
                    
                },(err)=>{
                    app.database().ref(`/routes/${route.params.url}/${route.params.id}/seatsConf/${value.seatNo}`).set("booked")
                }) 
              });
              setModalVisible(true);
              setTimeout(()=>{
                  setModalVisible(false);
                  navigation.navigate('Payment Successful')
                },1000)
        }}>
           <View style={styles.payButton}>
                              
                    <Text style={{color:'white',fontWeight:'bold',fontSize:18}}>Pay  <FontAwesome name="rupee" size={17} color="white" /> {totalCost}</Text>
            </View>
            </TouchableOpacity>
            </View>
           
        </View>
    );
}

const styles=StyleSheet.create({
    container:{
        flex:1
    },
    billContainer:{
        marginTop:20,
        backgroundColor:'white',
        width:'95%',
        alignSelf:'center'
    },
    travelDetailsContainer:{
      paddingTop:10
    },
    headings:{
        fontSize:18,
        fontWeight:'bold',
        textAlign:'center',
        color:'grey'
    },
    infoWrapper:{
        marginLeft:10,
        marginTop:20,
        marginRight:15
    },
    infoText:{
        color:'grey',
        marginBottom:5
    },
    rows:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    passengerDetailsContainer:{
        marginTop:45
    },
    fareDetailsContainer:{
        marginTop:40
    },
    payButton:{
        backgroundColor:'#3e3fba',
        padding:15,
        justifyContent:'center',
        alignItems:'center',
       
        width:'100%'
    }
})