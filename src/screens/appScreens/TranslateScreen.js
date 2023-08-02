import { View, Text, StyleSheet, KeyboardAvoidingView, ImageBackground, Pressable, Image, Switch } from 'react-native'
import { useEffect, useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import TranslateTextContainer from '../../components/TranslateTextContainer';
import TranslateImageContainer from '../../components/TranslateImageContainer';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { auth } from '../../../firebase';
import { getSupportedLanguages, translateText } from '../../api/translateClient';

const TranslateScreen = () => {
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [toValue, setToValue] = useState(null);
  const [fromValue, setFromValue] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [toLanguageItems, setToLanguageItems] = useState([]);
  const [fromLanguageItems, setFromLanguageItems] = useState([]);
  const [text, setText] = useState('');
  const [translated, setTranslated] = useState(null);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  useEffect(() => {
    (async () => {
      try {

        console.log({ event: "Getting Supported Language Data", page: "TranslateScreen", });
        let currentUser = auth.currentUser;
        let idToken = currentUser ? await currentUser.getIdToken() : null;
        let json = null;
        if (idToken) {
          let response = await getSupportedLanguages(idToken);
          json = await response.json();
          console.log({ event: "Queried User Data", page: "HomeScreen", json });
          if (json.status && Array.isArray(json.response.message) && json.response.message.length > 0) {
            setToLanguageItems(json.response.message.map(item => { return { label: item.name, value: item.code } }))
            setFromLanguageItems(json.response.message.map(item => { return { label: item.name, value: item.code } }))
          }
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [])

  handleTranslate = async () =>{
    let sourceText = text;
    let targetLanguage = toValue;
    let request = {sourceText, targetLanguage};
    console.log(request);
    let currentUser = auth.currentUser;
    let idToken = currentUser ? await currentUser.getIdToken() : null;
    if(idToken){
      let response = await translateText(idToken,request);
      json = await response.json()
      console.log(json);
      if(json.status === true && json.response.message.translatedText){
        setTranslated(json.response.message.translatedText);
      }
    }
    
  }

  const navigation = useNavigation();
  const route = useRoute();
  return (
    <>
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <ImageBackground source={require('../../../assets/pngs/BackgroundObjects.png')} resizeMode="cover" style={styles.image}>
          {/* Header Container Starts */}
          <View style={[styles.headerContainer]}>
            <Pressable onPress={() => { navigation.navigate("HomeTabs") }}>
              <Image source={require('../../../assets/pngs/BackIcon.png')}></Image>
            </Pressable>
            <Text style={[styles.appTextHeader]}>{route.name}</Text>
            <Pressable>
              <Image source={require('../../../assets/pngs/UserNotifications.png')}></Image>
            </Pressable>
          </View>
          {/* Header Container Ends */}
          <View style={styles.spacer_10}></View>
          <View style={[{ justifyContent: 'space-between', alignContent: 'center', flexDirection: 'row', width: '90%', zIndex: 1 }]}>
            <View style={{ width: '35%', zIndex: 2 }}>
              <DropDownPicker
                open={fromOpen}
                value={fromValue}
                items={fromLanguageItems}
                setOpen={setFromOpen}
                setValue={setFromValue}
                setItems={setFromLanguageItems}
                style={{
                  backgroundColor: "#FEE6AA",
                  borderWidth: 0,
                }}
                textStyle={{
                  // both for selected and those of dropdown
                  color: '#034153'
                }}
              />
            </View>
            <Image source={require('../../../assets/pngs/TranslateIcon.png')}></Image>
            <View style={{ width: '35%', zIndex: 2 }}>
              <DropDownPicker
                open={toOpen}
                value={toValue}
                items={toLanguageItems}
                setOpen={setToOpen}
                setValue={setToValue}
                setItems={setToLanguageItems}
                style={{
                  backgroundColor: "#FEE6AA",
                  borderWidth: 0,
                  zIndex: '100'
                }}
                textStyle={{
                  // both for selected and those of dropdown
                  color: '#034153'
                }}


              />
            </View>
          </View>
          <View style={styles.spacer_20}></View>
          <View style={[{ justifyContent: 'space-between', alignContent: 'center', flexDirection: 'row', width: '85%' }]}>
            <Text style={{ fontFamily: 'doppio-one' }}>Translate To :</Text>
            <Text style={{ fontFamily: 'doppio-one' }}>{toValue}</Text>
          </View>
          
          <View style={styles.spacer_5}></View>
          <TranslateTextContainer value={translated}  zIndex={-1}/>
          <View style={styles.spacer_10}></View>
          <View style={[{
            justifyContent: 'space-between', alignContent: 'center', flexDirection: 'row', width: '85%',
            zIndex: -1
          }]}>
            <Text style={{ fontFamily: 'doppio-one' }}>Translate From :</Text>
            <Text style={{ fontFamily: 'doppio-one' }}>{fromValue}</Text>
          </View>
          <View style={styles.spacer_5}></View>
          {route.name === "Image" ? <TranslateImageContainer isEnabled={isEnabled} toggleSwitch={toggleSwitch} zIndex={-1} /> : <TranslateTextContainer value={text} setValue={setText} />}
          
          <View style={styles.spacer_10}></View>
          <View>
            {route.name === "Text" ? 
            <Pressable  onPress={()=>{handleTranslate()}}>
              
              <Image source={require('../../../assets/pngs/TextSubmitIcon.png')}></Image>
            
          </Pressable>
             : <Image source={require('../../../assets/pngs/UploadIcon.png')}></Image>}
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
  spacer_5: {
    marginTop: 5,
    marginBottom: 5
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
export default TranslateScreen