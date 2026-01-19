import { View, Text } from 'react-native'
import React from 'react'
import { colors } from '@/constants/colors'
import Animated,{ useAnimatedStyle, useSharedValue } from 'react-native-reanimated'

const SliderWidth = 300

const RangeSlider = () => {
    const leftX = useSharedValue(0)
    const rightX = useSharedValue(SliderWidth)

    const leftThumbStyles =  useAnimatedStyle(() => {
        return {
            transform:[
                { translateX: leftX.value}
            ]
        } 
    })

  return (
    <Animated.View 
    style={{
        width: SliderWidth,
        height: 5,
        backgroundColor: colors.primary,
        borderRadius: 99
    }}>
      <Animated.View 
          style={[{
             position: 'absolute',
             width: 24,
             height: 24,
             backgroundColor:'white',
             borderRadius: 99,
             borderWidth: 2,
             borderColor: colors.primary,
             transform: [{translateX: 0},{translateY: -10}]
          }]}
      />
       <Animated.View 
          style={[{
             position: 'absolute',
             width: 24,
             height: 24,
             backgroundColor:'white',
             borderRadius: 99,
             borderWidth: 2,
             borderColor: colors.primary,
             transform: [{translateX: SliderWidth - 24},{translateY: -10}]
          }]}
      />
    </Animated.View>
  )
}

export default RangeSlider