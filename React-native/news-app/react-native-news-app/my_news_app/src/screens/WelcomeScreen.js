import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import WelcomeImage from '../../assets/images/getting-started.jpg'
import { colors } from '../../constants/colors'
import Animated ,{FadeInLeft,FadeInRight,FadeInDown} from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'
import { ROUTES } from '../../Routes/RouteNames'

const WelcomeScreen = () => {
      const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/images/getting-started.jpg')} style={styles.imageBackGround}>
         <View style={styles.wrapper}>
           <Animated.Text  entering={FadeInLeft.delay(300).duration(500)} style={styles.firstTxt}>Stay Updated!</Animated.Text>
           <Animated.Text entering={FadeInRight.delay(700).duration(500)} style={styles.secondTxt}>Get started to read the world wide news!!</Animated.Text>
           <Animated.View entering={FadeInDown.delay(1200).duration(500)}>
               <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate(ROUTES.BOTTOMTABNAVIGATOR)}>
                  <Text style={styles.btnTxt}>Get started</Text>
               </TouchableOpacity>
           </Animated.View>
         </View>
      </ImageBackground>
    </View>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageBackGround:{
      flex: 1,
    },
    firstTxt:{
      color: 'white',
      fontSize: 24,
      letterSpacing: 2,
      textAlign: 'center',
    },
    wrapper:{
      flex: 1,
      justifyContent: 'flex-end',
      paddingBottom: 50,
      paddingHorizontal: 30,
      gap:10,
      backgroundColor: 'rgba(0,0,0,0.5)'
    },
    secondTxt:{
       color: 'white',
       fontSize: 15,
       letterSpacing: 1.5,
       textAlign: 'center'
    },
    btn:{
      backgroundColor: colors.tint,
      paddingVertical: 10,
      alignItems: 'center',
      marginHorizontal: 20,
      borderRadius: 8
    },
    btnTxt:{
       color: colors.white,
       fontSize: 15,
       fontWeight: 700,
       letterSpacing: 1.2
    }
})