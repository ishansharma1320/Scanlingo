import { View, Text,StyleSheet,KeyboardAvoidingView,ImageBackground,Pressable,Image,Switch } from 'react-native'
import {useState} from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import TranslateTextContainer from '../../components/TranslateTextContainer';
import TranslateImageContainer from '../../components/TranslateImageContainer';
import { useNavigation, useRoute} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TranslateScreen = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    
    const [items, setItems] = useState([
      {label: 'Apple', value: 'apple'},
      {label: 'Banana', value: 'banana'}
    ]);
    const navigation = useNavigation();
    const route = useRoute();
    return (
       <>
       <KeyboardAvoidingView style={styles.container} behavior='padding'>
         <ImageBackground source={require('../../../assets/pngs/BackgroundObjects.png')} resizeMode="cover" style={styles.image}>
        {/* Header Container Starts */}
             <View style={[styles.headerContainer]}>
               <Pressable onPress={()=>{navigation.navigate("HomeTabs")}}>
                 <Image source={require('../../../assets/pngs/BackIcon.png')}></Image>
               </Pressable>
               <Text style={[styles.appTextHeader]}>{route.name}</Text>
               <Pressable>
                 <Image source={require('../../../assets/pngs/UserNotifications.png')}></Image>
               </Pressable>
             </View>
          {/* Header Container Ends */} 
          <View style={styles.spacer_10}></View>
            <View style={[{justifyContent: 'space-between',alignContent: 'center',flexDirection: 'row', width: '90%'}]}>
         <View style={{ width: '35%'}}>
         <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={{
                backgroundColor: "#FEE6AA",
                borderWidth: 0
            }}
            textStyle={{
                // both for selected and those of dropdown
                color: '#034153'
              }}
        />
         </View>
        <Image source={require('../../../assets/pngs/TranslateIcon.png')}></Image>
        <View style={{ width: '35%'}}>
         <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={{
                backgroundColor: "#FEE6AA",
                borderWidth: 0
            }}
            textStyle={{
                // both for selected and those of dropdown
                color: '#034153'
              }}
        
          
        />
         </View>
            </View>
            <View style={styles.spacer_20}></View>
            <View style={[{justifyContent: 'space-between',alignContent: 'center',flexDirection: 'row', width: '85%',
            zIndex: -1
            }]}>
              <Text style={{fontFamily: 'doppio-one'}}>Translate From :</Text>
              <Text style={{fontFamily: 'doppio-one'}}>English</Text>
            </View>
            <View style={styles.spacer_5}></View>
            {route.name === "Image" ? <TranslateImageContainer isEnabled={isEnabled} toggleSwitch={toggleSwitch} zIndex={-1}/> : <TranslateTextContainer zIndex={-1}/>}
            <View style={styles.spacer_10}></View>
            <View style={[{justifyContent: 'space-between',alignContent: 'center',flexDirection: 'row', width: '85%'}]}>
              <Text style={{fontFamily: 'doppio-one'}}>Translate To :</Text>
              <Text style={{fontFamily: 'doppio-one'}}>Spanish</Text>
            </View>
            <View style={styles.spacer_5}></View>
            <TranslateTextContainer />
            <View style={styles.spacer_10}></View>
            <View>
                {route.name === "Text" ? <Image source={require('../../../assets/pngs/TextSubmitIcon.png')}></Image> : <Image source={require('../../../assets/pngs/UploadIcon.png')}></Image>}
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