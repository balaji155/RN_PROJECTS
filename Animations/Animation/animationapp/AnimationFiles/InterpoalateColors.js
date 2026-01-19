import { Dimensions, StyleSheet, Switch, Text, useWindowDimensions, View } from 'react-native'
import React, { useState } from 'react'
import Animated, { interpolateColor, useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated'

const colors = {
    dark: {
        background: '#1E1E1E',
        circle: '#252525',
        text: '#F8F8F8'
    },
    light: {
        background: '#F8F8F8',
        circle: '#FFF',
        text: '#1E1E1E'
    }
}
const SWITCH_TRACK_COLOR ={
    true: 'rgba(256,0,256,0.2)',
    false: 'rgba(0,0,0,0.1)'
}

const { width ,height} = Dimensions.get('window')
const SIZE = width * 0.75
const InterpoalateColors = () => {
    const [theme,setTheme] = useState('light')
    const progress = useDerivedValue(() => {
        return theme === 'dark' ? withTiming(1) : withTiming(0)
    },[theme])
    const toggleTheme = (toggled) => {
        setTheme(toggled ? 'dark' : 'white');
      };
      const rnStyle = useAnimatedStyle(()=>{
        const backgroundColor = interpolateColor(progress.value,
            [0,1],
            [colors.light.background,colors.dark.background]
        )
          return {
              backgroundColor
          }
      },[progress])

      const rnCircleStyle = useAnimatedStyle(()=>{
        const backgroundColor = interpolateColor(progress.value,
            [0,1],
            [colors.light.circle,colors.dark.circle]
        )
          return {
              backgroundColor
          }
      },[progress])

      const rnTxtStyle = useAnimatedStyle(()=>{
        const color = interpolateColor(progress.value,
            [0,1],
            [colors.light.text,colors.dark.text]
        )
          return {
              color
          }
      },[progress])
  return (
    <Animated.View style={[styles.conatiner,rnStyle]}>
        <Animated.Text style={[styles.txt,rnTxtStyle]}>Theme</Animated.Text>
      <Animated.View style={[styles.circle,rnCircleStyle]}>
       <Switch 
          value={theme === 'dark'}
          onValueChange={toggleTheme}
          trackColor={SWITCH_TRACK_COLOR}
          thumbColor={'violet'}
       />
     </Animated.View>
    </Animated.View>
  )
}

export default InterpoalateColors

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width,
        height
    },
    circle:{
        width : SIZE,
        height: SIZE,
        borderRadius: SIZE/2,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset:{
            width: 0,
            height: 20,
        },
        shadowRadius: 10,
        shadowOpacity: 0.1,
        elevation: 8
    },
    txt:{
        fontSize: 70,
        fontWeight: '700',
        letterSpacing: 14,
        marginBottom: 30
    }
})