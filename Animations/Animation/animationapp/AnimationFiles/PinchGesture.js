import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SampleImage from '../assets/getting-started.jpg'
import { Gesture, GestureDetector, PinchGestureHandler } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'


const {width,height} = Dimensions.get('window')
const PinchGesture = () => {
    const AnimatedImage = Animated.createAnimatedComponent(Image)
    const scale = useSharedValue(1)
    const translateX = useSharedValue(0)
    const  translateY = useSharedValue(0)
    const pinchGestureHandler = Gesture.Pinch().onUpdate((event) =>{
        scale.value = event.scale
        translateX.value = event.focalX
        translateY.value = event.focalY
    }).onEnd(() => {
        scale.value = withTiming(1)
    })
    const rnStyle = useAnimatedStyle(() =>{
        return {
            transform: [ 
                {translateX: translateX.value},
                {translateY: translateY.value},
                {translateX: -width/2},
                {translateY: -height/2},
                {scale: scale.value},
                {translateX: -translateX.value},
                {translateY: -translateY.value},
                {translateX: width/2},
                {translateY: height/2},
            ]
        }
    },[scale,translateX,translateY])

    const rnFocalStyle = useAnimatedStyle(() =>{
        return{
            transform: [
                {translateX: translateX.value},
                {translateY: translateY.value}]
        }
    })
  return (
      <GestureDetector gesture={pinchGestureHandler}>
         <Animated.View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
          <AnimatedImage style={[{flex: 1},rnStyle]} source={SampleImage} resizeMode='contain'/>
          <Animated.View style={[styles.focalPointing,rnFocalStyle]}/>
         </Animated.View>
      </GestureDetector>
  )
}

export default PinchGesture

const styles = StyleSheet.create({
    focalPointing:{
       ...StyleSheet.absoluteFillObject,
        width: 20, // Adjust size as needed
        height: 20,
        backgroundColor: 'blue',
        borderRadius: 10
    }
})