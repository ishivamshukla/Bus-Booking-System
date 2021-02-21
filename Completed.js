import React,{useState,useEffect} from 'react';
import { Text, View , TouchableOpacity } from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import BusInfoBox from '../../components/BusInfoBox';
import app from '../../Fire';
import "firebase/database";

function Completed({navigation}){
    const [data,setData]=useState([]);
    const [buses,setBuses]=useState([]);
    let busess=[];
    let busArray=[];
   const [keys,setKeys]=useState([]);
    useFocusEffect(
      React.useCallback(()=>{
        async function getData(){
          const snapshot=await app.database().ref(`/tickets/${username}`).once('value').catch((error)=>console.error(error));
          const result=snapshot.val();
          if(result!==undefined){
            let resultArray=Object.keys(result).map((keyName,keyIndex)=>(result[keyName]))
            setKeys(Object.keys(result));
            
          setData(resultArray);
            busess=data.map((value,index)=>value.id);
            
           async function getBusData(){
              for(let i=0;i<busess.length;i++){
                let snapshot= await app.database().ref(`/routes/${data[i].route}/${busess[i]}`).once('value');
                  busArray[i]=snapshot.val();            
              }
              setBuses(busArray);
            }
            getBusData();
            
          }
             
        }
       
          getData();   
      },[data.length]))
     

   
    const [username]=app.auth().currentUser.email.split('@');
   return(
    <View>
      {
        (buses.length>0)?(
          buses.map((value,index)=>(
          (data[index].cancelled==false)?
           ( <TouchableOpacity key={index} onPress={()=>navigation.navigate('Ticket View',{ticket:(data[index])?data[index]:-1,bus:value,key:keys[index]})}>
            <BusInfoBox busName={value.provider} busTime={value.time} busMetaInfo={value.bus} seats={value.seats} hours={value.hrs} rating={value.ratings}  fare={value.cost} date={value.date} />
            </TouchableOpacity>
          ):(<View key={index}></View>)
          
          ))
        ):(
          <View>
            <Text>There is no data to show</Text>
          </View>
        )
       
      }
    </View>
   )
   
};

export default Completed;
