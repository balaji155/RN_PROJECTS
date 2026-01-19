import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Page, { PAGE_WIDTH } from './Page'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { cancelAnimation, useDerivedValue, useSharedValue, withDecay } from 'react-native-reanimated'

const titles = ['whats','up','mobile','Devs?']
const ScrollViewWithPanGesture = () => {
    const translateX = useSharedValue(0)
    const startX = useSharedValue(0)
    const clampedTransatex = useDerivedValue(() => {
        const MAX_TRASLATE_VALUE = - PAGE_WIDTH * (titles.length -1)
        return Math.max(Math.min(translateX.value,0),MAX_TRASLATE_VALUE)
    })
    const panGestureHandler = Gesture.Pan().onBegin(event => {
        startX.value = clampedTransatex.value
        cancelAnimation(translateX)
    }   
    ).onChange(event => {
       translateX.value = event.translationX + startX.value
    }).onEnd(event => {
       translateX.value = withDecay({velocity : event.translationX})
    })
  return (
    <View style={styles.container}>
    <GestureDetector gesture={panGestureHandler}>
      <Animated.View style={{flex:1,flexDirection: 'row'}}>
       {titles.map((title,index) => 
         <Page key={index} title={title} index={index} translateX={clampedTransatex}/>
    )}
    </Animated.View>
    </GestureDetector>
    </View>
  )
}

export default ScrollViewWithPanGesture

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'row'
    }
})