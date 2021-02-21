import React,{useState} from 'react';
import { StyleSheet, Text, View ,TouchableOpacity,Dimensions,ScrollView,ToastAndroid} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import TownImage from '../../assets/town.svg';
import InputField from '../../components/InputField';
import { AntDesign } from '@expo/vector-icons';
import FullModal from '../../components/FullModal';
import app from '../../Fire';
import "firebase/auth";

const screenHeight=Math.round(Dimensions.get('screen').height);

export default function Signup({navigation}) {

  const [modalVisible,setModalVisible] = useState(false);
  const user={
    email:'',
    password:''
  }
    
 async function validate(userData){
   
    var emailre = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    

  if(userData.email===""){
    ToastAndroid.show('Email field should not be empty!', ToastAndroid.SHORT);   
  }
  else if(userData.password===""){
    ToastAndroid.show('Password field should not be empty!', ToastAndroid.SHORT);
  }
  else if(!emailre.test(String(user.email).toLowerCase())){
    ToastAndroid.show('Enter a valid email address!', ToastAndroid.SHORT);
  }
  else{
      setModalVisible(true);
     const result= await app.auth().createUserWithEmailAndPassword(user.email,user.password).catch((err)=>{
      console.error(err);
    })    
      if(result.user){
        setModalVisible(false);
        navigation.navigate('Login');
      }
    }
} 
    return (
<ScrollView showsVerticalScrollIndicator={false}>
<View style={styles.container}>
      <FullModal 
        modalVisible={modalVisible}
      />
     <LinearGradient
      colors={["#3e3fba","#5d5ecf","#7b7adf","#6466e5" ]}
      style={{position:'absolute',top:0,height:'100%',width:'100%',}}
     />
     <View style={styles.TextWrapper}>
        <Text style={[styles.WhiteText,
        {fontWeight:'bold',
        fontSize:60,
        marginTop:(screenHeight>800)?(screenHeight*10)/100:(screenHeight*2)/100
    }]}>BBS</Text>
        <Text style={[styles.WhiteText,{alignSelf:'center',fontWeight:'bold',fontSize:20}]}>SIGN UP</Text>
       </View>
    
       <View style={styles.SVGWrapper}>
          <TownImage 
            width={300}
            height={200}
          /> 
       </View>
     
      <View style={styles.mainContentContainer}>
      <View style={{width:'100%',alignItems:'center'}}>  
        <InputField placeholder="Email" onChangeText={(value)=>user.email=value} secure={false}/>
        <InputField placeholder="Password" onChangeText={(value)=>user.password=value} secure={true}/>
      
   </View>
        <View style={styles.loginButtonRow}>
            <Text style={{fontSize:30,fontWeight:'bold'}}>Sign Up</Text>
            
            <TouchableOpacity onPress={()=>validate(user)}>
            <LinearGradient
             colors={["#6664E1","#4243E8","#3B3BAD"]}
             height={65}
             width={65}
             style={{justifyContent:'center',alignItems:'center',borderRadius:50,}}
            >
           <AntDesign name="arrowright" size={40} color="white"/>
            </LinearGradient>
            </TouchableOpacity>
        </View>

        <View style={styles.signupRow}>
            <TouchableOpacity onPress={()=>navigation.navigate('Login')}><Text style={styles.signupRowText}>Log In</Text></TouchableOpacity>
           
        </View> 
      </View>

    <View style={{height:200,backgroundColor:'white',width:'100%'}}></View>
   
       </View>
    
    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center'
  },
  TextWrapper:{

  },
  WhiteText:{
    color:'white'
  },
  SVGWrapper:{
    alignItems:'center',
    marginTop:'-4.5%',
    marginLeft:'4%'
    
  },
  mainContentContainer:{
   width:'100%',
   alignItems:'center',
    justifyContent:'space-around',
  backgroundColor:'white',
  height:(screenHeight>800)?(screenHeight*55)/100:(screenHeight*50)/100,
  borderTopLeftRadius:40,
  borderTopRightRadius:40
  },

  loginButtonRow:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
    
      width:'80%',
      

  },
  signupRow:{
    flexDirection:'row',
    
    justifyContent:'flex-start',
    alignItems:'center',
    padding:5,
    width:'80%',
    
},
signupRowText:{
    fontSize:20,
    fontWeight:'bold',
    textDecorationLine:'underline',
   textDecorationStyle:'solid'
}
});
