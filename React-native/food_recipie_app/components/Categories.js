import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ImageCat from '../assets/rounded_image.png'
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen'
import Animated ,{ FadeInDown } from 'react-native-reanimated';
import CachedImage from '../helpers/cachedImage';




const Categories = ({catagories,activeCatagory,handleCateogaryChange}) => {
  return (
    <Animated.ScrollView entering={FadeInDown.duration(500).springify()}
       horizontal={true}
       showsHorizontalScrollIndicator={false}
       contentContainerStyle={styles.container}>
         {catagories.map((cat,index) => {
            const isActive = cat.strCategory === activeCatagory
            return(
                <TouchableOpacity
                  onPress={() => handleCateogaryChange(cat.strCategory)}
                  key={index}
                  style={styles.catConatiner}
                >
                   <View style={[styles.imgConatiner,{backgroundColor : isActive ? 'rgb(251 191 36)' : 'rgba(0,0,0,0.1)'}]}>
                       <CachedImage uri={cat.strCategoryThumb} style={{width: hp(7),height: hp(7),borderRadius: 9999}} />
                   </View>
                   <Text style={styles.catTxt}>{cat.strCategory}</Text>
                </TouchableOpacity>
            )
         })}
       </Animated.ScrollView>
  )
}

export default Categories

const styles = StyleSheet.create({
    container:{
       gap: 10,
       paddingHorizontal: 15
    },
    catConatiner:{
        display: 'flex',
        gap: 10,
        alignItems: 'center'
    },
    imgConatiner:{
        padding: 6,
        borderRadius: 9999,
    },
    catTxt:{
        fontSize: hp(1.6),
        color: 'rgb(82 82 82)'
    }
})