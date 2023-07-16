
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen.js';
import LoginScreen from './src/screens/LoginScreen.js';
import RegisterScreen from './src/screens/RegisterScreen.js';
import OnboardingScreen from './src/screens/OnboardingScreen.js';

const Stack = createNativeStackNavigator();

const SignedOutStack = () => {
  return (
<Stack.Navigator initialRouteName='Onboarding' screenOptions={{headerShown: false}}>
    <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
    <Stack.Screen name="Register" component={RegisterScreen}></Stack.Screen>
    <Stack.Screen name="Onboarding" component={OnboardingScreen}></Stack.Screen>
  </Stack.Navigator>
    
  )
}



const SignedInStack = () => {
    return (
      <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown: false}}>
      
        <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
      
    </Stack.Navigator>
      
    )
  }
  
export {SignedInStack, SignedOutStack};
  