import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

const PressableTwo = () => {
    const scale = useSharedValue(1);

    const rnViewstyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }]
        }
    })

    const presshandlerIn = () => {
        scale.value = withSpring(0.9);
    }

    const presshandlerOut = () => {
        scale.value = withSpring(1);
    }

    console.log('rendered PressableTwo')

  return (
    <Pressable onPressIn={presshandlerIn} onPressOut={presshandlerOut}>
       <Animated.View style={[styles.btnView,rnViewstyle]}>
           <Text style={styles.btnText}>PressableTwo</Text>
       </Animated.View>
    </Pressable>
  )
}

export default PressableTwo

const styles = StyleSheet.create({
   btnView: {
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