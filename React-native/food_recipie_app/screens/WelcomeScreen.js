import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import FoodImage from '../assets/rounded_image.png'
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen'
import Animated, { useAnimatedStyle, useSharedValue ,withSpring } from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'

const WelcomeScreen = () => {
    const firstCirclePadding = useSharedValue(0)
    const secondCirclePadding = useSharedValue(0)
    const navigation = useNavigation()

    useEffect(() => {
         firstCirclePadding.value = 0
         secondCirclePadding.value = 0 
         setTimeout(()=>firstCirclePadding.value = withSpring(firstCirclePadding.value+hp(4.5)),500)
         setTimeout(()=>secondCirclePadding.value = withSpring(secondCirclePadding.value+hp(4)),300)
         setTimeout(() => navigation.navigate('home'),2500)
      }, []);
    
      const firstCircleStyle = useAnimatedStyle(() => ({
        padding: firstCirclePadding.value,
      }));
    
      const secondCircleStyle = useAnimatedStyle(() => ({
        padding: secondCirclePadding.value,
      }));
    
  return (
    <View style={styles.conatiner}>
      <Animated.View style={[styles.firstCircle,firstCircleStyle]}>
        <Animated.View style={[styles.secondCircle,secondCircleStyle]}>
            <Image source={FoodImage} style={{width:220,height:200}}/>
        </Animated.View>
      </Animated.View>
      <View style={styles.textContainer}>
          <Text style={styles.heading(hp)}>Foody</Text>
          <Text style={styles.subHeading(hp)}>Food is always right</Text>
      </View>
   </View>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
   conatiner:{
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: '#FFBF00',
     gap: 20
   },
   firstCircle:{
       borderRadius: 9999,
       backgroundColor: 'rgba(255, 255, 255, 0.2)',
   },
   secondCircle:{
    borderRadius: 9999,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
   },
   textContainer:{
      justifyContent: 'center',
      alignItems: 'center'
   },
   heading:(hp) =>({
      fontSize: hp(7),
      fontWeight: 'bold',
      color: 'white'
   }),
   subHeading:(hp)=>({
     fontSize: hp(2),
     fontWeight: '600',
     color: 'white'
   })
})