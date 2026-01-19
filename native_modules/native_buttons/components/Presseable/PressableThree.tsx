import { Pressable, StyleSheet, Text,NativeModules } from 'react-native'
import React from 'react'

const PressableThree = () => {
    const { Haptics } = NativeModules;
    console.log('NativeModules:', NativeModules);
    const handlePress = () => {
       if(Haptics && Haptics.impact){
           Haptics.impact('light');
       }
    }
  return (
    <Pressable  
      style={({pressed}) => [
        styles.button,
        {opacity: pressed ? 0.8 : 1,transform: [{scale: pressed ? 0.96 : 1}]}
      ]}
      onPress={handlePress}
    >
        <Text style={styles.btnText}>Pressable three</Text>
    </Pressable>
  )
}

export default PressableThree

const styles = StyleSheet.create({
    button: {
        width: 200,
        height: 45,
        borderRadius: 8,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8
    },
    btnText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
    }
})