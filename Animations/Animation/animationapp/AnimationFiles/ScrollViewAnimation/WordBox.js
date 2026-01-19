import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated'

const {width,height} = Dimensions.get('window')
const SIZE = width*0.7
const WordBox = ({title,index,translateX}) => {

  const rnStyle = useAnimatedStyle(()=> {
    const scale = interpolate(translateX.value,
      [(index -1)*width,index*width,(index+1)*width],
      [0,1,0],
      Extrapolation.CLAMP
    )

    const borderRadius = interpolate(translateX.value,
      [(index -1)*width,index*width,(index+1)*width],
      [0,SIZE/2,0],
      Extrapolation.CLAMP
    )
     return {
        borderRadius,
        transform: [{scale }]
     }
  },[translateX])

  const rnTxtStyle = useAnimatedStyle(() =>{
    const translateY = interpolate(translateX.value,
      [(index -1)*width,index*width,(index+1)*width],
      [height/2,0,-height/2],
      Extrapolation.CLAMP
    )
    const opacity = interpolate(translateX.value,
      [(index -1)*width,index*width,(index+1)*width],
      [-2,1,-2],
      Extrapolation.CLAMP
    )
     return {
        opacity,
       transform: [{translateY}]
     }
  },[translateX])
  return (
    <View key={index} style={[styles.container,{backgroundColor: `rgba(0,0,256,0.${index+2})`}]}>
        <Animated.View style={[styles.square,rnStyle]} />
        <Animated.View style={[rnTxtStyle,{position: 'absolute'}]}>
                <Text style={styles.title}>{title}</Text>
            </Animated.View>
    </View>
  )
}

export default WordBox

const styles = StyleSheet.create({
    container:{
        width,
        height, 
        alignItems: 'center',
        justifyContent: 'center' 
    },
    square:{
       width: SIZE,
       height: SIZE,
       backgroundColor: 'rgba(0,0,256,0.4)'
    },
    title:{
      fontSize: 70,
      fontFamily: '700',
      textTransform: 'uppercase',
      color: 'white'
    }
})