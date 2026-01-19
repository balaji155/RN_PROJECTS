import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { colors } from '../../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../../Routes/RouteNames';

const { width }= Dimensions.get('screen')
const Slider = ({news,index,scrollX}) => {
    const navigation = useNavigation()
    const rnAninamtedStyle = useAnimatedStyle(() => {
        return {
            transform:[
                {
                    translateX: interpolate(
                        scrollX.value,
                        [(index-1)* width,index * width,(index+1) * width],
                        [-width*0.20,0,width*0.20 ],
                        Extrapolation.CLAMP
                    )
                },{
                    scale: interpolate(
                        scrollX.value,
                        [(index-1)* width,index * width,(index+1) * width],
                        [0.9,1,0.9],
                        Extrapolation.CLAMP
                    )
                }
            ]
        }
    })
  return (
    <TouchableOpacity onPress={() => navigation.navigate(ROUTES.NEWSDETAILSSCREEN,{news: news})}>
    <Animated.View style={[styles.imageConatiner,rnAninamtedStyle]}>
      <Image source={{uri : news?.image_url}} style={{width: (width*80)/100, height: hp('20%') ,borderRadius: 10}}/>
      <LinearGradient colors={["transparent","rgba(0,0,0,0.8)"]} style={styles.backGround}>
        <View style={styles.sourceInfo}>
           {news?.source_icon && <Image source={{uri : news?.source_icon}} style={styles.sourceImg}/>}
           <Text style={styles.sourceTxt}>{news?.source_name}</Text>
        </View>
        <Text style={styles.title}>{news?.title}</Text>
      </LinearGradient>
    </Animated.View>
    </TouchableOpacity>
  )
}

export default Slider

const styles = StyleSheet.create({
    imageConatiner:{
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        width: width,
        marginHorizontal: 0, // No unwanted margins
        padding: 0,
    },
    backGround:{
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.05)',
        width: (width*80)/100,
        height: hp('20%'),
        justifyContent: 'flex-end',
        borderRadius: 10
    },
    title:{
        color: 'white',
        padding: 10,
        fontSize: 12,
        fontWeight: '600',
        letterSpacing: 1.2
    },
    sourceImg:{
        width: 25,
        height: 25,
        borderRadius: 20
    },
    sourceInfo:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        gap: 10
    },
    sourceTxt:{
        color: colors.white,
        fontFamily: 14,
        fontWeight: '600',
        letterSpacing: 1.2
    }
})