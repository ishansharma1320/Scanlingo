import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, KeyboardAvoidingView, ImageBackground, TextInput, TouchableOpacity, Pressable, Image } from 'react-native'
import { auth } from '../../../firebase';
import { useNavigation } from '@react-navigation/native';
import { useEffect,useState } from 'react';
import {getUserData} from "../../api/UserClient";
import {getItemAsync} from "expo-secure-store"

export default function HomeScreen() {
  const [firstName, setFirstName] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
     try{
      let user = await getItemAsync("user");
      console.log({event: "Got User Data from secure storage",page: "HomeScreen", user});
      if (!user) {
        let currentUser = auth.currentUser;
        let idToken = currentUser ? await currentUser.getIdToken() : null;
        let json = null;
        if (idToken) {
          let response = await getUserData(idToken);
          json = await response.json();
          console.log({ event: "Queried User Data", page: "HomeScreen", json });
          setFirstName(json.firstName);
        }
      } else {
        user = JSON.parse(user);
        setFirstName(user.firstName);
      }
     } catch(err){
      console.error(err);
     }
    })();
  }, []);
 
  return (

    <>
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <ImageBackground source={require('../../../assets/pngs/BackgroundObjects.png')} resizeMode="cover" style={styles.image}>
     {/* Header Container Starts */}
          <View style={[styles.headerContainer]}>
            <Pressable onPress={()=>navigation.navigate("UserProfile")}>
              <Image source={require('../../../assets/pngs/UserIcon.png')}></Image>
            </Pressable>
            <Text style={[styles.appTextHeader]}>ScanLingo</Text>
            <Pressable>
              <Image source={require('../../../assets/pngs/UserNotifications.png')}></Image>
            </Pressable>
          </View>
       {/* Header Container Ends */} 
    <View style={styles.spacer_30}></View>
       <View style={[styles.inputContainer]}>
                <Text style={[styles.textHeader]}>Hi {firstName}, Welcome! 👋</Text>
                <View style={styles.spacer_20}></View>
                <Text style={[styles.textSubtitle]}>What would you like to translate today?</Text>
            </View>

        <View style={styles.spacer_10}></View>
        <View style={[{justifyContent: 'center',width: '90%', backgroundColor: '#034153', height: '45%', borderRadius: 10, padding: 20}]}>
          <Pressable  onPress={()=>{navigation.navigate("Text")}} style={{height: '45%',backgroundColor: '#FEE6AA', borderRadius: 10, justifyContent: 'center'}}>
              
              <Image  style={{alignSelf: 'center'}} source={require('../../../assets/pngs/TextIcon.png')}></Image>
              <Text style={{color: '#056174', fontFamily: 'doppio-one', fontSize: 16, textAlign: 'center'}}> Text </Text>
              
              
          </Pressable>
          <Pressable onPress={()=>{navigation.navigate("Image")}} style={{marginTop: 20, height: '45%',backgroundColor: '#FEE6AA',borderRadius: 10, justifyContent: 'center'}}>
          {/* <View > */}
              <Image  style={{alignSelf: 'center'}} source={require('../../../assets/pngs/ImageIcon.png')}></Image>
              <Text style={{color: '#056174', fontFamily: 'doppio-one', fontSize: 16, textAlign: 'center' }}> Image </Text>
              {/* </View> */}
          </Pressable>
        </View>
            
      </ImageBackground>
    </KeyboardAvoidingView>
   
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingLeft: 10,
    paddingRight: 10
  },
  textHeader: {
    fontFamily: 'doppio-one',
    fontSize: 18,
    textAlign: 'center',
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  inputContainer: {
    width: '80%',
  },
  textSubtitle: {
    textAlign: 'center',
    fontFamily: 'doppio-one',
    fontSize: 18,
    width: 275,
    
  },
  spacer_10: {
    marginTop: 10,
    marginBottom: 10
  },
  spacer_20: {
    marginTop: 20,
    marginBottom: 20
  },
  spacer_30: {
    marginTop: 30,
    marginBottom: 30
  },
  appTextHeader: {
    fontFamily: 'doppio-one',
    fontSize: 24,
    textAlign: 'center',
    color: '#056174'
  },
  image: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  innerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signoutContainer: {
    width: '80%',
    marginTop: 20,
    alignItems: 'center'
  },
  signoutPlaceholder: {
    padding: 15,
    backgroundColor: '#07C9C5',
    width: '100%',
    alignItems: 'center'
  },
  signoutText: {
    color: 'white',
    fontWeight: 700
  }
});
