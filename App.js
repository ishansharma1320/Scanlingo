
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen.js';
import LoginScreen from './src/screens/LoginScreen.js';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { SignedInStack, SignedOutStack } from './navigationStacks.js';
import { auth } from './firebase.js';
import { StatusBar } from 'expo-status-bar';
SplashScreen.preventAutoHideAsync();


function App(){
  const [appIsReady, setAppIsReady] = useState(false);
  const [loggedIn, setLoggedIn] = useState(null);
  
  
  useEffect(()=>{
    async function prepare() {
      try {
        
        await Font.loadAsync({
          'doppio-one': require('./assets/fonts/DoppioOne-Regular.ttf')
        });
        
        
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
    
    
   return auth.onAuthStateChanged(user=>setLoggedIn(user));
  },[]);
  
  
  
  
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  

  return (
    <>
    <StatusBar style="dark" />
    <NavigationContainer onReady={onLayoutRootView}>
      {loggedIn ?  <SignedInStack /> : <SignedOutStack />}
    </NavigationContainer>
    </>
    
  )
}
export default App;

