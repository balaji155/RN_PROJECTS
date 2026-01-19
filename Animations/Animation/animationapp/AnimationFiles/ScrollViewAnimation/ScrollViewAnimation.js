import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WordBox from './WordBox'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
const SCROLLWORDS = ['Hey','Whats up','Developer?']
const ScrollViewAnimation = () => {
   const translateX = useSharedValue(0)
    const scrollHandler = useAnimatedScrollHandler((event)=>{
       console.log(event.contentOffset.x)
       translateX.value = event.contentOffset.x
    })
  return (
    <Animated.ScrollView contentContainerStyle={styles.container} horizontal onScroll={scrollHandler} scrollEventThrottle={16} pagingEnabled>
     {SCROLLWORDS.map((title,index)=>
       <WordBox title={title} index={index} key={index} translateX={translateX}/>
    )}
    </Animated.ScrollView>
  )
}

export default ScrollViewAnimation

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})