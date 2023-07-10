
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen.js';
import LoginScreen from './src/screens/LoginScreen.js';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import RegisterScreen from './src/screens/RegisterScreen.js';
import OnboardingScreen from './src/screens/OnboardingScreen.js';

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

function App(){
  const [fontsLoaded] = useFonts({
    'doppio-one': require('./assets/fonts/DoppioOne-Regular.ttf')
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  
  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator initialRouteName='Onboarding'>
        <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen}></Stack.Screen>
        <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen}></Stack.Screen>
        <Stack.Screen options={{headerShown: false}} name="Register" component={RegisterScreen}></Stack.Screen>
        <Stack.Screen options={{headerShown: false}} name="Onboarding" component={OnboardingScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App;

