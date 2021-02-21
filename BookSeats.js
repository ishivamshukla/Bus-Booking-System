import React,{useState,useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View,Text,StyleSheet,ScrollView,TouchableOpacity, BackHandler, ToastAndroid} from 'react-native';
import BusDetailView from '../../components/BusDetailView';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import Seats from '../../components/Seats';
import app from '../../Fire';
import "firebase/database";
import { Value } from 'react-native-reanimated';


var bookSeats=[];
export default function BookSeats({navigation,route}){
       
        const [seatStatus,setSeatStatus]=useState("");
        const [bookedSeats,setBookedSeats]=useState("");
        const [seatsConf,setSeatsConf]=useState([]);
             
        useEffect(()=>{
          async function fetchSeatsConf(){
            const snapshot=await app.database().ref(`/routes/${route.params.url}/${route.params.id}/seatsConf`).once('value');
            if(snapshot.val()!==undefined||snapshot.val()!==null){
                setSeatsConf(snapshot.val());
               
            }
              
          }                       
          fetchSeatsConf(); 
           
        },[seatsConf.length])
               
        useFocusEffect(
            React.useCallback(() => {
                bookSeats=[];
            
              return () => {
              };
            }, [])
          );
    
    const arr=[];
    const finalar=[];
    const limit=route.params.seats;
    const even=(limit%2==0)?true:false;
    const finallimit=(limit%2==0)?limit:limit+1;
    for(let i = 1;i<finallimit;i=i+2){
        if(even==false&&i==limit){
            arr.push(<View style={{flexDirection:'row-reverse'}} key={i}>
                        <Seats serialNo={i} status={seatsConf[i]} onBooked={(seatNo)=>{bookSeats.push(seatNo);setBookedSeats(bookSeats.toString())}} onCancelled={(seatNo)=>{bookSeats.splice(bookSeats.indexOf(seatNo),1); setBookedSeats(bookSeats.toString())}}/>
            </View> )
        break;      
        }
            else{

        arr.push(<View style={{flexDirection:'row-reverse'}} key={i}>
                    <Seats serialNo={i} status={seatsConf[i]} onBooked={(seatNo)=>{bookSeats.push(seatNo);setBookedSeats(bookSeats.toString())}} onCancelled={(seatNo)=>{bookSeats.splice(bookSeats.indexOf(seatNo),1); setBookedSeats(bookSeats.toString())}}/>
                    <Seats serialNo={i+1} status={seatsConf[i+1]} onBooked={(seatNo)=>{bookSeats.push(seatNo);setBookedSeats(bookSeats.toString())}} onCancelled={(seatNo)=>{bookSeats.splice(bookSeats.indexOf(seatNo),1); setBookedSeats(bookSeats.toString())}}/>                    

                    </View>
                );
            }
        

    }

    for(let i=0;i<(limit/2);i=i+2){
        finalar.push(<View style={{flexDirection:'row-reverse',justifyContent:'space-between'}} key={i}>
                        {arr[i]}
                        {arr[i+1]}
                     </View>);
    }
 

    return(
        <View style={styles.container}>
            <ScrollView>
        <BusDetailView
         date={route.params.date}
         time={route.params.time}
         providerName={route.params.provider}
         busMetaInfo={route.params.busName}
         cost={route.params.fare}
        />    

        <View style={styles.availableInfoContainer}>
            <View style={{flexDirection:'row',padding:10,justifyContent:'space-evenly',alignItems:'center'}}>
            <View style={{width:25,height:25,backgroundColor:'green'}}></View>
            <Text style={{fontSize:18,marginLeft:10}}>Selected</Text>
        </View>
        <View style={{flexDirection:'row',padding:17,justifyContent:'space-evenly'}}>
            <View style={{width:25,height:25,backgroundColor:'black'}}></View>
            <Text style={{fontSize:18,marginLeft:10}}>Available</Text>
        </View>
        
        <View style={{flexDirection:'row',padding:17,justifyContent:'space-evenly'}}>
            <View style={{width:25,height:25,backgroundColor:'grey'}}></View>
            <Text style={{fontSize:18,marginLeft:10}}>Booked</Text>
        </View>

        </View>
        <View style={styles.seatsViewContainer}>
           <View style={{alignItems:'flex-end',width:'96%',marginBottom:15}}>
           <MaterialCommunityIcons name="steering" size={24} color="grey" />
           </View>
            {
                finalar
            }
        </View>            
      
        <View style={{height:100,width:'100%'}}></View>
       
        </ScrollView>
        <View style={{flexDirection:'row',position:'absolute',bottom:0}}>
            <View style={{backgroundColor:'white',padding:3,flex:2}}>
        <Text style={{marginLeft:9,fontSize:20}}>selected:{bookedSeats}</Text>
            </View>
            <View style={{flex:1.2}}>
            <TouchableOpacity onPress={()=>{
                if(bookSeats.length>0){
                    navigation.navigate('Seats Details',{seats:bookedSeats,url:route.params.url,id:route.params.id,cost:route.params.fare,busInfo:{provider:route.params.provider,busName:route.params.busName,time:route.params.time,seats:route.params.seats,hours:route.params.hours,rating:route.params.rating,fare:route.params.fare,date:route.params.date,boarding:route.params.sname,dropping:route.params.dname}})
                }
                else{
                    ToastAndroid.show('Please select a Seat',ToastAndroid.SHORT)
                }
                
                
                }}>
            <View style={{backgroundColor:'#3e3fba',padding:14,flex:1,fontSize:20,fontWeight:'bold'}}>
                <Text style={{textAlign:'center',color:'white',fontSize:20,fontWeight:'bold'}}>Done</Text>
            </View>
            </TouchableOpacity>
            </View>
        </View>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        
    },
    seatsViewContainer:{
        borderWidth:1,
        borderColor:'grey',
        width:'60%',
        padding:10,
        alignSelf:'center',
        marginTop:20
    },
    availableInfoContainer:{
        flexDirection:'row',
        marginTop:10
    }
})