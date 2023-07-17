
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeTabs from './HomeTabs.js';
import LoginScreen from '../screens/authScreens/LoginScreen.js';
import RegisterScreen from '../screens/authScreens/RegisterScreen.js';
import OnboardingScreen from '../screens/authScreens/OnboardingScreen.js';
import TranslateScreen from '../screens/appScreens/TranslateScreen';
import UserProfileScreen from '../screens/appScreens/UserProfileScreen.js';

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
        <Stack.Screen name="HomeTabs" component={HomeTabs}></Stack.Screen>
      <Stack.Screen name="Text" component={TranslateScreen} ></Stack.Screen>
      <Stack.Screen name="Image" component={TranslateScreen} ></Stack.Screen>
      <Stack.Screen name="UserProfile" component={UserProfileScreen} ></Stack.Screen>
    </Stack.Navigator>
      
    )
  }
  
export {SignedInStack, SignedOutStack};
  