import { StyleSheet,TextInput, View, Pressable, ScrollView } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react'

const TranslateTextContainer = ({zIndex=undefined,value, setValue=undefined}) => {
  return (
    <View style={[{flexDirection: 'column',justifyContent: 'space-between',width: '90%', backgroundColor: '#034153', height: '28%', borderRadius: 10, padding: 20, zIndex: zIndex}]}>
     {setValue !== undefined ? (<TextInput
        placeholder="Enter text here..."
        placeholderTextColor="#fff"
        style={{
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 10,
        flex: 1,
        color: 'white',
        borderWidth: 2, // Set the border width
        borderColor: 'white', // Set the border color to white
        }}
        value={value}
        
        onChangeText={value=>setValue(value)}
        // Any other props you want to pass to the TextInput component
      />): <TextInput
      placeholder="Enter text here..."
      placeholderTextColor="#fff"
      style={{
      paddingHorizontal: 15,
      paddingVertical: 15,
      borderRadius: 10,
      flex: 1,
      color: 'white' 
      }}
      value={value}
      // Any other props you want to pass to the TextInput component
    />}
    
    <View style={{alignSelf: 'flex-end', justifyContent: 'space-between', flexDirection: 'row', width: '100%'}}>
        <Pressable>
            <Ionicons name="bookmark" size="20" color="white" />
        </Pressable>
        <Pressable>
            <Ionicons name="copy" size="20" color="white" />
        </Pressable>
        </View>
    </View>
  )
}




export default TranslateTextContainer;
