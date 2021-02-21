import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { EvilIcons, Ionicons } from '@expo/vector-icons';
import TownImage from '../../assets/town.svg';
import app from '../../Fire';
import "firebase/auth";


export default function MyAccount({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.Infocontainer}>
                    <View style={styles.settingconatiner}>
                    <Text style={{ padding: 20, fontSize: 40, fontWeight: 'bold', color: '#3e3fba', }}>Settings</Text>
                    <Ionicons name="ios-settings" size={40} color="#3e3fba"
                              style={{ padding: 40, alignSelf: 'center', marginTop: 10 }}
                     />
                    </View>

                    <View style={styles.Usercontainer}>
                          <TouchableOpacity style={styles.Imagecontainer}>
                          <EvilIcons name="user" size={100} color="#3e3fba" />
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.Emailcontainer}>
                          <Text style={styles.ButtonText}>{app.auth().currentUser.email}</Text>
                          </TouchableOpacity>
                          </View>
               
                    <TownImage
                    width={300}
                    height={200}
                    style={{ alignSelf: 'center' }}
                    />
                     <View style={styles.Logoutcontainer}>
                         <Ionicons name="md-log-out" size={40} color="#3e3fba" />
                         <TouchableOpacity onPress={()=>{navigation.navigate('Login')}}>
                         <Text style={{fontSize: 30, fontWeight: 'bold', color: '#3e3fba',padding: 40}}>Logout</Text>
                         </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: '20%'
    },
    Infocontainer: {
        width: '95%',
        height: 140,
        alignSelf: 'center',
    },
    settingconatiner: {
        width: '100%',
        height: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    Usercontainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    Imagecontainer: {
        height: 100,
        width: 100,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Logoutcontainer: {
        marginTop: 50,
        width: '95%',
        height: '35%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    Emailcontainer: {
        width: '75%',
        height: '75%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ButtonText: {
        fontSize: 16,
        color: '#3e3fba'

    }
});
