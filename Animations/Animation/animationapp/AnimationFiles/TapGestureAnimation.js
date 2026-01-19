import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useRef } from 'react'
import { TapGestureHandler } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated'
import SampleImage from '../assets/getting-started.jpg'
import Heart from '../assets/white-heart.png'

const TapGestureAnimation = () => {
    const doubleTapRef = useRef(null)
    const scale = useSharedValue(0)
    const opacity = useSharedValue(1)
    const AnimatedImage = Animated.createAnimatedComponent(Image)

    const rnStyle = useAnimatedStyle(() => {
        return {
            transform: [{scale: Math.max(scale.value,0)}]
        }
    },[scale])

    const rnTxtStyle = useAnimatedStyle(() => {
        return {
           opacity: opacity.value
        }
    },[opacity])

    const doubleTapHandler = useCallback(() => {
        scale.value = withSpring(1,undefined,(isFinished) => {
            if(isFinished){
                scale.value = withDelay(250,withSpring(0))
            }
        })
    })

    const singleTapHandler = useCallback(() => {
        opacity.value = withTiming(0,undefined,(isFinished) => {
            if(isFinished){
                opacity.value = withDelay(2000,withTiming(1))
            }
        })
    })
  return (
    <View style={styles.container}>
        <TapGestureHandler onActivated={singleTapHandler} waitFor={doubleTapRef}>
            <TapGestureHandler ref={doubleTapRef} maxDelayMs={250} numberOfTaps={2} onActivated={doubleTapHandler}>
                <Animated.View>
                 <ImageBackground source={SampleImage} style={styles.imageBackground}>
                     <AnimatedImage source={Heart} style={[styles.image,rnStyle]}/>
                     <Animated.Text style={[styles.text,rnTxtStyle]}>BALAJI</Animated.Text>
                 </ImageBackground>
                 </Animated.View>
            </TapGestureHandler>  
        </TapGestureHandler>
    </View>
  )
}

export default TapGestureAnimation

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imageBackground:{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image:{
        width: 200,
        height: 200,
    },
    text:{
        color: 'white',
        fontSize: 20,
        letterSpacing: 2,
        fontWeight: 800,
    }
})