import { View, Pressable, Switch } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';

const TranslateImageContainer = ({isEnabled, toggleSwitch,zIndex=undefined}) => {
  return (
    <View style={[{flexDirection:'row',justifyContent: 'center',width: '90%', backgroundColor: '#034153', height: '28%', borderRadius: 10, padding: 20, 
            // zIndex: zIndex
            }]}>
    <View style={{flex: 1, justifyContent: 'space-between'}}>
    <View style={{alignSelf: 'flex-start', justifyContent: 'space-between', flexDirection: 'row', width: '100%'}}>
        
        <View style={{flex: 1}}></View>
        <Switch 
        style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }], marginRight: -10 }}
        trackColor={{false: '#767577', true: '#fff'}}
        thumbColor={isEnabled ? '#034153' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        value={isEnabled}
        onValueChange={()=>{
            toggleSwitch();
            console.log(isEnabled);
            console.log("Pressed")
        }}
        />
        
        
        </View>   
    <View style={{alignSelf: 'flex-end', justifyContent: 'space-between', flexDirection: 'row', width: '100%'}}>
        <Pressable >
            <Ionicons name="bookmark" size="20" color="white" />
        </Pressable>
        <Pressable>
            <Ionicons name="copy" size="20" color="white" />
        </Pressable>
        </View>
    </View> 
    </View>
  )
}

export default TranslateImageContainer