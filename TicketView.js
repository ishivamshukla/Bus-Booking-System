import React,{useState} from 'react';
import {View,Text,StyleSheet,ScrollView,TouchableOpacity} from 'react-native';
import BusDetailView from '../../components/BusDetailView';
import { FontAwesome } from '@expo/vector-icons'; 
import app from '../../Fire';
import "firebase/database";
import "firebase/auth";
import FullModal from '../../components/FullModal';


export default function TicketView({navigation,route}){
    const [modalVisible,setModalVisible]=useState(false);
    const bus=route.params.bus;
   const ticket=route.params.ticket;
   const cancelled=ticket.cancelled;  
   
    return(
        <View style={styles.container}>
            
            <ScrollView>
            <FullModal 
            modalVisible={modalVisible}
            />
             <BusDetailView
         date={bus.date}
         time={bus.time}
         providerName={bus.provider}
         busMetaInfo={bus.bus}
         cost={bus.cost}
        />   
        {
            (cancelled)?(
                <View style={{width:'30%',backgroundColor:'red',padding:6,borderRadius:20,marginTop:'-10%',marginLeft:'68%'}}><Text style={{color:'white',fontSize:15,textAlign:'center'}}>cancelled</Text></View>
            ):(<View/>)
        } 
   

<View style={styles.billContainer}>
                <View style={styles.travelDetailsContainer}>
                    <Text style={styles.headings}>Travel Details</Text>
                   <View style={styles.infoWrapper}>
                    <Text style={styles.infoText}>{bus.provider}</Text>
                    <Text style={styles.infoText}>{bus.date}</Text>  
                    <Text style={styles.infoText}>{bus.bus} </Text>
                    
                   </View>
                    
                </View>

                    <View style={styles.passengerDetailsContainer} >
                    <Text style={styles.headings}>Passenger Details</Text>
                
                    
                    <View style={styles.infoWrapper} >
                    <View style={styles.rows}>
                    <Text style={styles.infoText}>{ticket.passengerName}</Text>
                    <Text style={styles.infoText}>Seat No. {ticket.seatNo}</Text>
                    </View>
                    <Text style={styles.infoText}>{ticket.passengerEmail}</Text>
                    </View>
              
                
                </View>
                    

              <View style={styles.fareDetailsContainer}>
                    <Text style={styles.headings}>Fare Details</Text> 
                        
                          
                                <View style={styles.rows}>
                                <Text style={[styles.infoText,{marginLeft:20,marginRight:20}]}>Seat No. {ticket.seatNo}</Text>
                            <Text style={[styles.infoText,{marginLeft:20,marginRight:20}]}><FontAwesome name="rupee" size={12} color="grey" /> {ticket.fare}</Text>
        
                            </View>
                            
                        
                    
                    <View style={styles.rows}>
                        <Text style={[styles.infoText,{marginLeft:20,marginRight:20,color:'black',fontWeight:'bold',fontSize:18}]}>Total Payable</Text>
            <Text style={[styles.infoText,{marginLeft:20,marginRight:20,color:'black',fontWeight:'bold',fontSize:18}]}><FontAwesome name="rupee" size={15} color="black" /> {ticket.fare}</Text>
                    </View>
              </View>  
           </View>
           <View style={{height:100}}></View>
           </ScrollView>
          {
              (!cancelled)?(
            <TouchableOpacity onPress={()=>{
                let [userPath]=app.auth().currentUser.email.split('@');
                setModalVisible(true);
                app.database().ref(`/tickets/${userPath}/${route.params.key}/cancelled`).set(true,(err)=>{
                    app.database().ref(`/routes/${ticket.route}/${ticket.id}/seatsConf/${ticket.seatNo}`).set("available");
                    setModalVisible(false);
                    navigation.goBack();
                });
                
               
            }}>
                  <View style={{height:65,width:'100%',backgroundColor:'red',justifyContent:'center'}} >
                 
                <Text style={{color:'white',fontSize:20,fontWeight:'bold',textAlign:'center'}}>Cancel Ticket</Text>
               
                </View>
                </TouchableOpacity>
              ):(
                  <View/>
              )
          }
        </View>
    )
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
})