import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../../constants/colors'
import  Animated,{ Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated'

const Pagination = ({breakingNews,scrollX,paginationIndex}) => {
    console.log(breakingNews.length,'lengthArray')
    const { width }= Dimensions.get('screen')
  return (
    <View style={styles.container}>
       {breakingNews?.map((_,index)=> {
           const pgAnimatedStyle = useAnimatedStyle(() => {
              const dotWidth = interpolate(
                scrollX.value % (breakingNews.length * width),
                [(index-1)* width,index * width,(index+1) * width],
                [8,20,8],
                Extrapolation.CLAMP
              )
             return {
                width: dotWidth
             }
           })
         return (
            <Animated.View style={[styles.dot,{backgroundColor: paginationIndex === index ? colors.tint : colors.lightGrey},pgAnimatedStyle]} />
         )
       })}
    </View>
  )
}

export default Pagination

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 30
    },
    dot:{
        width: 8,
        height: 8,
        marginHorizontal: 5,
        borderRadius: 8
    }
})