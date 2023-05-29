import { StyleSheet, Text, View, KeyboardAvoidingView,ImageBackground, TextInput, TouchableOpacity} from 'react-native'
import React,{useState, useEffect} from 'react'
import {auth} from '../../firebase';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const handleSignUp = function () {
    auth.createUserWithEmailAndPassword(email,password)
    .then(userCredentials=>{
        const user = userCredentials.user;
        console.log(`Registered with user: ${user.email}`);
    }).catch((error)=>{
        console.log(error);
      })
  }

  const navigation = useNavigation();
  useEffect(()=>{
    const stateChange = auth.onAuthStateChanged(user=>{
        if(user){
            navigation.navigate("Home");
        }
    })
    return stateChange;
  },[])

  const handleLogin = function () {
    auth.signInWithEmailAndPassword(email,password)
    .then(userCredentials=>{
        const user = userCredentials.user;
        console.log(`Logged in with user: ${user.email}`);
    }).catch((error)=>{
        console.log(error);
      })
  }
    return (
    <>
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
    <ImageBackground source={require('../../assets/pngs/BackgroundObjects.png')} resizeMode="cover" style={styles.image}>
    <View style={styles.inputContainer}>
        <TextInput 
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={text=>setEmail(text)}
        />
        <TextInput 
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={text=>setPassword(text)}
        secureTextEntry
        />
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
        </View>
    </ImageBackground>
    </KeyboardAvoidingView>
    
    </>

  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
      },
      image: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      inputContainer: {
        width: '80%'
      },

      input:{
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 10
      },
      buttonContainer: {
        width: '60%',
        marginTop: 40,
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
      }
})