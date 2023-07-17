import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/appScreens/HomeScreen';
import BookmarksScreen from '../screens/appScreens/BookmarksScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tabs = createBottomTabNavigator();
const HomeTabs = () => {
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

export default HomeTabs;