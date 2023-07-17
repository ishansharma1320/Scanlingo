import { View, Pressable } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react'

const TranslateTextContainer = ({zIndex=undefined}) => {
  return (
    <View style={[{flexDirection: 'row',justifyContent: 'center',width: '90%', backgroundColor: '#034153', height: '28%', borderRadius: 10, padding: 20, zIndex: zIndex}]}>
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