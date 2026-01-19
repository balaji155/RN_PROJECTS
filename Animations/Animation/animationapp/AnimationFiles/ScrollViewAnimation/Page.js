import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
const { width : PAGE_WIDTH} = Dimensions.get('window')
const Page = ({title,index,translateX}) => {

    const rnStyle = useAnimatedStyle(() =>{
        const offsetValue = PAGE_WIDTH * index
        return {
            transform: [{translateX: translateX.value + offsetValue}]
        }
    },[translateX])
  return (
    <Animated.View style={[{ ...StyleSheet.absoluteFillObject, flex: 1,backgroundColor: `rgba(0,0,256,0.${index + 2})`,justifyContent: 'center',alignItems: 'center'},rnStyle]}>
       <Text style={styles.text}>{title}</Text>
    </ Animated.View>
  )
}
export { PAGE_WIDTH }
export default Page

const styles = StyleSheet.create({
    text: {
        fontSize: 50,
        color: 'white',
        letterSpacing: 2,
        fontWeight: '600'
    }
})