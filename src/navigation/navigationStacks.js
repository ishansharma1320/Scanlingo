
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeTabs from './HomeTabs.js';
import LoginScreen from '../screens/authScreens/LoginScreen.js';
import RegisterScreen from '../screens/authScreens/RegisterScreen.js';
import OnboardingScreen from '../screens/authScreens/OnboardingScreen.js';
import TranslateScreen from '../screens/appScreens/TranslateScreen';
import UserProfileScreen from '../screens/appScreens/UserProfileScreen.js';
import { auth } from '../../firebase.js';
import { getItemAsync, deleteItemAsync } from "expo-secure-store";
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
    const handleSignout = async ()=>{
      try {
        await auth.signOut();
        let uid = await getItemAsync("user_id");
        console.log(uid);
        await deleteItemAsync("user_id");
        uid = await getItemAsync("user_id");
        console.log(uid);
      } catch(e){
        console.error(e);
      }
    }
    return (
      <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown: false}}>
        <Stack.Screen name="HomeTabs" component={HomeTabs}></Stack.Screen>
      <Stack.Screen name="Text" component={TranslateScreen} ></Stack.Screen>
      <Stack.Screen name="Image" component={TranslateScreen} ></Stack.Screen>
      <Stack.Screen name="UserProfile" component={UserProfileScreen} initialParams={{handleSignout}} ></Stack.Screen>
    </Stack.Navigator>
      
    )
  }
  
export {SignedInStack, SignedOutStack};
  