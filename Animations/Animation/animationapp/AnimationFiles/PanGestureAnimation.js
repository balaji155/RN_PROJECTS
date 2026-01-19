import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

const SIZE = 100.0
const CIRCLE_RADIUS = SIZE*2
const PanGestureAnimation = () => {
    const translateX = useSharedValue(0)
    const translateY = useSharedValue(0);
    const startX = useSharedValue(0);
    const startY = useSharedValue(0);

   const panGestureHandler = Gesture.Pan()
   .onStart(()=>{
       startX.value = translateX.value
       startY.value = translateY.value
   }).onUpdate((event)=>{
      translateX.value = event.translationX + startX.value
      translateY.value = event.translationY + startY.value
   }).onEnd(() => {
       let distance = Math.sqrt((translateX.value ** 2)+(translateY.value ** 2))
       if(distance < CIRCLE_RADIUS + SIZE / 2){
        translateX.value = withSpring(0)
        translateY.value = withSpring(0)
       }
       
   })

    const reanimatedStyle = useAnimatedStyle(() =>{
        return {
            transform: [
                {translateX:translateX.value},
                {translateY: translateY.value}
            ]
        }
    },[translateX])
  return (
    <View>
     <View style={styles.circle}>
       <GestureDetector gesture={panGestureHandler}>
         <Animated.View style={[styles.square,reanimatedStyle]} /> 
       </GestureDetector>
       </View>
    </View>
  )
}

export default PanGestureAnimation

const styles = StyleSheet.create({
    square:{
        width: SIZE,
        height: SIZE,
        backgroundColor: 'rgba(0,0,256,0.5)',
        borderRadius: 20
    },
    circle: {
        width: CIRCLE_RADIUS *1.8,
        height: CIRCLE_RADIUS*1.8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: CIRCLE_RADIUS,
        borderWidth: 4,
        borderColor: 'rgba(0,0,256,0.5)'
    }
})