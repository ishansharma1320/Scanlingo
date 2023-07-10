import { StyleSheet, Text, View, KeyboardAvoidingView,ImageBackground, TextInput, TouchableOpacity, Image} from 'react-native'
import React,{useState, useEffect} from 'react'
import {auth} from '../../firebase';
import { useNavigation } from '@react-navigation/native';


const OnboardingScreen = () => {
  const navigation = useNavigation();
  
    return (
    <>
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
    <ImageBackground source={require('../../assets/pngs/BackgroundObjects.png')} resizeMode="cover" style={styles.image}>
        <View style={styles.logo}>
            <Image  source={require('../../assets/pngs/logo.png')}></Image>
            <View style={[styles.inputContainer]}>
                <Text style={[styles.textHeader]}>Welcome</Text>
                <Text style={[styles.textSubtitle]}>Bridging communication gap seamlessly</Text>
            </View>
        </View>
        <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={()=>{
                  navigation.navigate("Register");
                }}>
                <Text style={styles.bottomTabText}>Sign Up</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={()=>{
                  navigation.navigate("Login");
                }}>
                <Text style={styles.bottomTabText}>Login</Text>
            </TouchableOpacity>
            </View>
    </ImageBackground>
    </KeyboardAvoidingView>
    
    </>

  )
}

export default OnboardingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D3EBFB'
      },
      logo: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center'
        
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
        textAlign: 'center',
        fontFamily: 'doppio-one',
        fontSize: 18,
        width: 250
      },
      spacer:{
        marginTop: 50,
        marginBottom: 50
      },
      textHeader: {
        fontFamily: 'doppio-one',
        fontSize: 28,
        textAlign: 'center',
      },
      bottomContainer: {
        flex: 1,
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingBottom: 20,
        
      },
      bottomTabText: {
        fontFamily: 'doppio-one'
      }
})