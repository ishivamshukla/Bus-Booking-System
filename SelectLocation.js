import React ,{useState,useEffect} from 'react';
import {View,Text,StyleSheet,TextInput} from 'react-native';
import City from '../../components/City';
import { Feather } from '@expo/vector-icons';
import app from '../../Fire';
import "firebase/database";

export default function SelectLocation({navigation,route}){
   
    const [isSearching,setIsSearching]=useState(false);
    const [foundIndex,setFoundIndex] = useState("");
    const [data,setData]=useState([]);
    useEffect(()=>{
        async function fetchData(){
            const snapshot = await app.database().ref('/cities').once('value');
            if(snapshot.val()){
                setData(snapshot.val());
            }
            
        }
        fetchData();
       
    },[data.length])
    
        function displayData(){
                if(foundIndex>-1){
                    return (
                        <City cityName={data[foundIndex]} onPress={(cityName)=>{
                            if(route.params.selectionType==="source"){
                                navigation.navigate('Home',{screen:'Home',params:{sourceName:cityName}});
                            }  
                            else if(route.params.selectionType=="destination"){
                                navigation.navigate('Home',{screen:'Home',params:{destinationName:cityName}})
                                
                            }
                        }}/>
                    );
                }
                else{
                    return(
                        <View style={{alignItems:'center'}}> 
                        <Text style={{fontSize:20}}>Nothing found</Text>
                    </View>
                    )
                   
                }
              
                
            
        }

        function search(value){
            console.log(foundIndex);
            if(data.indexOf(value)>-1){
                setFoundIndex(data.indexOf(value));
            }
            else{
                setFoundIndex(-1);
            }
        }


    return(
       
        <View style={{flex:1}}>
            <View style={styles.searchBarContainer}>
            <View style={{marginLeft:10,marginRight:10}}><Feather name="search" size={24} color="#3e3fba" /></View>
                <TextInput placeholder="Search" placeholderTextColor="black" style={{fontSize:20}} onChangeText={(value)=>{
                    (value==="")?setIsSearching(false):setIsSearching(true)
                    search(value)
                }}/>
            </View>        
            <View style={{height:40}}></View>

            { 
                (isSearching)?(
                        <View>
                        {
                            displayData()
                        }
                        </View>
                    ):(
                        <View>
                    <Text style={{fontSize:20,fontWeight:'bold',marginLeft:20,marginBottom:10}}> Top Locations</Text>
                
                {
                    data.map((value,index)=>(
                        <City cityName={value} key={index} onPress={(cityName)=>{
                            if(route.params.selectionType==="source"){
                                navigation.navigate('Home',{screen:'Home',params:{sourceName:cityName}});
                            }  
                            else if(route.params.selectionType=="destination"){
                                navigation.navigate('Home',{screen:'Home',params:{destinationName:cityName}})
                                
                            }
                            }}/>
            
                    ))
                }

            
            </View>
                    )
            }
                    
            
           
        </View>
    )
}

const styles=StyleSheet.create({
    searchBarContainer:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:30,
        paddingTop:10,
        paddingBottom:9.5,
        width:'90%',
        alignSelf:'center',
        borderRadius:10,
        backgroundColor:'#F6F6F8',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
})