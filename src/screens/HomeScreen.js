import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {auth} from '../../firebase';
import { useNavigation } from '@react-navigation/native';
export default function HomeScreen () {

    const navigation = useNavigation();

    const handleLogout = function (){
      auth.signOut().then(()=>{
        navigation.replace("Login");
      }).catch((error)=>{
        console.log(error);
      })
    }
    return (
      <View style={styles.container}>
        <Text>Current User: {auth.currentUser?.email}</Text>
        <View style={styles.signoutContainer}>
        <TouchableOpacity style={styles.signoutPlaceholder} onPress={handleLogout}>
          <Text style={styles.signoutText}> Signout </Text>
        </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
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
