
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/appScreens/HomeScreen.js';
import LoginScreen from '../screens/authScreens/LoginScreen.js';
import RegisterScreen from '../screens/authScreens/RegisterScreen.js';
import OnboardingScreen from '../screens/authScreens/OnboardingScreen.js';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BookmarksScreen from '../screens/appScreens/BookmarksScreen.js';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();
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
      <Tabs.Navigator initialRouteName='Home' screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'home'
              : 'home-outline';
          } else if (route.name === 'Bookmarks') {
            iconName = focused ? 'bookmarks' : 'bookmarks-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#034153',
        tabBarInactiveTintColor: 'gray',
      })}>
      
        <Tabs.Screen name="Home" component={HomeScreen}></Tabs.Screen>
        <Tabs.Screen name="Bookmarks" component={BookmarksScreen}></Tabs.Screen>
      
    </Tabs.Navigator>
      
    )
  }
  
export {SignedInStack, SignedOutStack};
  