import { StyleSheet, Text, View, KeyboardAvoidingView, ImageBackground, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { auth, db } from '../../../firebase';
import { useNavigation } from '@react-navigation/native';
import { doc, setDoc } from "firebase/firestore";
import { setItemAsync } from "expo-secure-store";
import {createUserData} from "../../api/UserClient";

const RegisterScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSignUp = async function () {
        try{
            let userCredentials =  await auth.createUserWithEmailAndPassword(email, password)
            let currentUser = auth.currentUser;
            let idToken = currentUser ? await currentUser.getIdToken(): null;
            let json = null;
            if(idToken){
                const response = await createUserData(idToken, {email,firstName, lastName});
                json = await response.json();
                console.log({event: "Created User Data", page: "RegisterScreen", json})
            }
            
            if(json && json.status === true && json.response && json.response.message){
                await setItemAsync("user", JSON.stringify(json.response.message));
              }
          } catch (e){
              console.error(e);
          }
    }

    const navigation = useNavigation();
    
    return (
        <>
            <KeyboardAvoidingView style={styles.container} behavior='padding'>
                <ImageBackground source={require('../../../assets/pngs/BackgroundObjects.png')} resizeMode="cover" style={styles.image}>
                    <View style={[styles.inputContainer]}>
                        <Text style={[styles.textHeader]}>Create Account</Text>
                        <Text style={[styles.textSubtitle]}>Start Translating Today!</Text>
                    </View>
                    <View style={styles.spacer}></View>
                    <View style={[styles.inputContainer,{flexDirection: 'row'}]}>
                    <View style={{flex:1,marginRight: 10, width: '100%'}}>
                    <Text style={styles.textLabel}> First Name </Text>
                    <TextInput
                                    placeholder="First Name"
                                    style={[styles.input]}
                                    value={firstName}
                                    onChangeText={text => setFirstName(text)}
                                />
                    </View>
                    <View style={{flex:1}}>
                    <Text style={styles.textLabel}> Last Name </Text>
                    <TextInput
                                    placeholder="Last Name"
                                    style={[styles.input]}
                                    value={lastName}
                                    onChangeText={text => setLastName(text)}
                                />
                    </View>
                    </View>
                    <View style={styles.inputContainer}>
                  
                        <View style={styles.inputFieldContainer}>
                            
                                <Text style={styles.textLabel}> Email Address</Text>
                                <TextInput
                                    placeholder="Email"
                                    style={styles.input}
                                    value={email}
                                    onChangeText={text => setEmail(text)}
                                />
                            
                        </View>
                        <View>
                            <Text style={styles.textLabel}> Password </Text>
                            <TextInput
                                placeholder="Password"
                                style={styles.input}
                                value={password}
                                onChangeText={text => setPassword(text)}
                                secureTextEntry
                            />
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                            <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={()=>{
                            navigation.navigate("Login")
                        }}>
                            <Text style={styles.buttonText}>Login</Text>
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

export default RegisterScreen

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
    textSubtitle: {
        color: '#96A3AB',
        fontSize: 18,
        paddingTop: 10
    },
    spacer: {
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
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 10,
        // 
    },
    inputFieldContainer: {
        marginVertical: 10
    },
    flexHorizontalContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    horizontalWidth: {
        width: '50%',

    },
    horizontalLeft: {
        marginRight: 10,
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