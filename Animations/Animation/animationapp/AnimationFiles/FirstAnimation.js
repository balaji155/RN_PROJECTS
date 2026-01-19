import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring } from 'react-native-reanimated'

const FirstAnimation = () => {
    const progress = useSharedValue(1)
    const scale = useSharedValue(2)

    const handleRotation = (progress) =>{
        'worklet'
         return `${progress.value * 2 *Math.PI}rad`
      }

    const reanimatedStyle = useAnimatedStyle(() =>{
        return {
           opacity: progress.value,
           borderRadius: (progress.value *100)/2,
           transform: [{scale: scale.value},{rotate: handleRotation(progress)}]
        }
    },[progress,scale])


    useEffect(()=>{
        progress.value = withRepeat(withSpring(0.5),3,true)
        scale.value = withRepeat(withSpring(1),3,true)
    },[])
  return (
    <View>
       <Animated.View style={[{height: 100,width: 100,backgroundColor: 'blue'},reanimatedStyle]}/>
    </View>
  )
}

export default FirstAnimation

const styles = StyleSheet.create({

})