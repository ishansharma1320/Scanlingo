import { StyleSheet, Text, View, KeyboardAvoidingView,ImageBackground, TextInput, TouchableOpacity} from 'react-native'
import React,{useState, useEffect} from 'react'
import {auth} from '../../../firebase';
import { useNavigation } from '@react-navigation/native';
import { setItemAsync } from "expo-secure-store";
import { getUserData } from '../../api/UserClient';
const LoginScreen = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const navigation = useNavigation();

  const handleLogin = async function () {
    try{
      let userCredentials = await auth.signInWithEmailAndPassword(email,password)
      let currentUser = auth.currentUser
      let idToken = currentUser ? await currentUser.getIdToken(): null;
      
      let json = null;
      if(idToken){
        let response = await getUserData(idToken);
        json = await response.json();
        console.log({event: "Queried User Data", page: "LoginScreen", json})
      }
      if(json && json.status === true && json.response && json.response.message){
        await setItemAsync("user", JSON.stringify(json.response.message));
      }
      
    } catch(e){
      console.error(e)
    }
    
  }
    return (
    <>
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
    <ImageBackground source={require('../../../assets/pngs/BackgroundObjects.png')} resizeMode="cover" style={styles.image}>
      <View style={[styles.inputContainer]}>
        <Text style={[styles.textHeader]}>Hi, Welcome Back! 👋</Text>
        <Text style={[styles.textSubtitle]}>Hello Again, You have been missed</Text>
      </View>
      <View style={styles.spacer}></View>
    <View style={styles.inputContainer}>
        <View style={styles.inputFieldContainer}>
        <Text style={styles.textLabel}> Email Address</Text>
        <TextInput 
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={text=>setEmail(text)}
        />
        </View>
       <View>
       <Text style={styles.textLabel}> Password </Text>
        <TextInput 
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={text=>setPassword(text)}
        secureTextEntry
        />
       </View>
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=>{
                  navigation.navigate("Register");
                }}>
                <Text style={styles.buttonText} >Register</Text>
            </TouchableOpacity>
        </View>
        
        {/* <View style={[styles.containerLine,styles.inputContainer]}>
            <View style={styles.divider} />

            <View>
              <Text style={styles.textLine}>Or Login With </Text>
            </View>

      <View style={styles.divider} />
    </View> */}
    </ImageBackground>
    </KeyboardAvoidingView>
    
    </>

  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 80
      },
      image: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
      },
      inputContainer: {
        width: '80%',
      },
      textSubtitle:{
        color: '#96A3AB',
        fontSize: 18,
        paddingTop: 10
      },
      spacer:{
        marginTop: 50,
        marginBottom: 50
      },
      textHeader: {
        fontFamily: 'doppio-one',
        fontSize: 28
      },
      textLabel: {
        fontFamily: 'doppio-one',
        marginBottom: 5
      },
      input:{
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 10,
        // 
      },
      inputFieldContainer: {
        marginVertical: 10
      },
      buttonContainer: {
        width: '60%',
        marginVertical: 20,
        alignItems: 'center'
      },
      button: {
        backgroundColor: '#07C9C5',
        padding: 15,
        width: '100%',
        marginBottom: 10,
        borderRadius: 10,
        alignItems: 'center'
      },
      buttonText: {
        color: '#FFFFFF',
        fontWeight: 700
      },
      containerLine: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#96A3AB',
      },
      textLine: {
        width: 100,
        textAlign: 'center',
        color: '#96A3AB'
      },
})