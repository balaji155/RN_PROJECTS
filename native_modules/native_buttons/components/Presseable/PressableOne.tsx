import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PressableOne = () => {
    console.log('rendered PressableOne')
  return (
    <Pressable  
      style={({pressed}) => [
        styles.button,
        {opacity: pressed ? 0.8 : 1,transform: [{scale: pressed ? 0.96 : 1}]}
      ]}
    >
        <Text style={styles.btnText}>Pressable one</Text>
    </Pressable>
  )
}

export default PressableOne

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