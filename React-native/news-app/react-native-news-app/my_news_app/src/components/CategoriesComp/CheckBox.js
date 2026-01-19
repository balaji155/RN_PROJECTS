import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CheckCircleIcon } from 'react-native-heroicons/solid'
import { colors } from '../../../constants/colors'
import Animated, { FadeIn, FadeOut, LinearTransition, useAnimatedStyle, withTiming } from 'react-native-reanimated'

const CheckBox = ({label,isChecked,onPress,key}) => {

    const rnContAnimStyle = useAnimatedStyle(()=>{
        return({
            backgroundColor : withTiming(isChecked ? 'rgba(239,142,82,0.1)' : 'transparent',{duration : 150}),
            borderColor : withTiming(isChecked ? colors.tint : colors.black,{duration : 150}),
            paddingLeft: 16,
            paddingRight: isChecked ? 10 : 16
        })
    },[isChecked])

    const txtAnimStyle = useAnimatedStyle(() =>{
        return({
          color: withTiming(isChecked ? colors.tint : colors.black,{duration : 150}),
        })
    },[isChecked])
  return (
    <Animated.View key={key} style={[styles.container,rnContAnimStyle]} onTouchEnd={onPress} layout={LinearTransition.springify().mass(0.8)}>
      <Animated.Text style={[styles.label,txtAnimStyle]}>{label}</Animated.Text>
      {isChecked &&  
      <Animated.View style={styles.CheckBox} 
            entering={FadeIn.duration(350)} 
            exiting={FadeOut}
            >
          <CheckCircleIcon size={14} color={colors.tint}/>
      </Animated.View>}
    </Animated.View>
  )
}

export default CheckBox

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderWidth: 1,
        borderRadius: 32,
        borderColor: colors.black
    },
    label:{
        color: colors.black,
        fontSize:14,
        fontWeight: '500'
    },
    CheckBox:{
        marginLeft: 8,
        height: 14,
        width: 14
    }
})