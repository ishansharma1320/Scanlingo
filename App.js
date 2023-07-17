
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { SignedInStack, SignedOutStack } from './src/navigation/navigationStacks';
import { auth } from './firebase.js';
import { StatusBar } from 'expo-status-bar';

SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();
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
    <SignedInStack />
      {/* {loggedIn ?  <SignedInStack /> : <SignedOutStack />} */}
    </NavigationContainer>
    
    
    </>
    
  )
}
export default App;

