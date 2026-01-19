import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CachedImage from '../helpers/cachedImage'
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { ChevronLeftIcon, ClockIcon, FireIcon, Square3Stack3DIcon, UserIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import Loader from './Loader'
import axios from 'axios'
import YoutubeIframe from 'react-native-youtube-iframe'
import Animated,{FadeIn, FadeInDown} from 'react-native-reanimated'

const RecipieDescription = (props) => {
    const { route } = props;
    const item = route?.params
    console.log(route?.params,item,
     'item'
    )
    const [isAddedToFavourite,setIsAddedToFavourite] = useState(false)
    const navigation = useNavigation()
    const [meals,setMeals] = useState(null)
    const [isLoading,setIsLoading] = useState(true)

    useEffect(()=>{
        getRescipies(item?.idMeal)
    },[])
    
    const getRescipies = async (id) => {
        try{
          const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
          console.log(response.data.meals[0],'response-meal-data')
          if(response && response.data){
            setMeals(response.data.meals[0])
            setIsLoading(false)
          }
        }catch(err){
          console.log(err,'error')
        }
    }

    const getIngrediantsIndexs = () => {
        if(!meals) return []
        let indexes = []
        for(i=1;i<=20;i++){
            if(meals['strIngredient'+i]){
                indexes.push(i)
            }
        }
        return indexes
    }

const getYoutubeVideoId = (url) =>{
    const regx= /[?&]v=([^&]+)/
    const match = url.match(regx)
    if(match && match[1]){
        return match[1]
    }
    return null
}

  return (
    <ScrollView style={{paddingBottom: 20,backgroundColor: 'white'}}>
      <StatusBar barStyle='light-content' />
      <View style={styles.imageConatiner}>
        <CachedImage uri={item.strMealThumb} style={styles.image} sharedTransitionTag={item.strMeal}/>
      </View>
      <Animated.View entering={FadeIn.delay(200)} style={styles.buttonConatiner}> 
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btn}>
              <ChevronLeftIcon color='rgb(251 191 36)' size={hp(3.5)} strokeWidth={4.5}/>
           </TouchableOpacity>
           <TouchableOpacity onPress={() => setIsAddedToFavourite(prev => !prev)} style={styles.btn}>
              <HeartIcon color={isAddedToFavourite ? 'red' : 'gray'} size={hp(3.5)} strokeWidth={4.5}/>
           </TouchableOpacity>
        </Animated.View>
        {isLoading ? <Loader size='Large' color='rgb(251 191 36)' /> : ( 
            <View style={styles.mealConatiner}>
                <Animated.View entering={FadeInDown.delay(100).duration(1000).springify().damping(12)} style={{marginVertical: 20 }}>
                    <Text style={styles.mealHeading}>{meals?.strMeal}</Text>
                    <Text style={styles.mealSubHeading}>{meals?.strArea}</Text>
                </Animated.View>
               <Animated.View entering={FadeInDown.delay(200).duration(1000).springify().damping(12)} style={styles.tagConatainer}>
                    <View style={styles.tag}>
                         <View style={styles.imageContainer}>
                            <ClockIcon color='#525252' strokeWidth={2.5} size={hp(4)} />
                         </View>
                         <View style={styles.tagTextConatiner}>
                              <Text style={[styles.tagText,{fontSize: hp(2)}]}>35</Text>
                              <Text style={[styles.tagText,{fontSize: hp(1.3)}]}>mins</Text>
                         </View>
                    </View>
                    <View style={styles.tag}>
                         <View style={styles.imageContainer}>
                            <UserIcon color='#525252' strokeWidth={2.5} size={hp(4)} />
                         </View>
                         <View style={styles.tagTextConatiner}>
                              <Text style={[styles.tagText,{fontSize: hp(2)}]}>3</Text>
                              <Text style={[styles.tagText,{fontSize: hp(1.3)}]}>servings</Text>
                         </View>
                    </View>
                    <View style={styles.tag}>
                         <View style={styles.imageContainer}>
                            <FireIcon color='#525252' strokeWidth={2.5} size={hp(4)} />
                         </View>
                         <View style={styles.tagTextConatiner}>
                              <Text style={[styles.tagText,{fontSize: hp(2)}]}>103</Text>
                              <Text style={[styles.tagText,{fontSize: hp(1.3)}]}>cal</Text>
                         </View>
                    </View>
                    <View style={styles.tag}>
                         <View style={styles.imageContainer}>
                            <Square3Stack3DIcon color='#525252' strokeWidth={2.5} size={hp(4)} />
                         </View>
                         <View style={styles.tagTextConatiner}>
                              <Text style={[styles.tagText,{fontSize: hp(1.3)}]}>Easy</Text>
                         </View>
                    </View>
               </Animated.View>
               <Animated.View entering={FadeInDown.delay(300).duration(1000).springify().damping(12)} style={styles.ingredientContainer}>
                   <Text style={styles.heading}>Ingrediants</Text>
                   <View style={styles.ingredeints}>
                        {getIngrediantsIndexs().map(i => {
                            return(
                                <View key={i} style={{display: 'flex',flexDirection: 'row', alignItems: 'center',gap: 10}}>
                                   <View style={styles.dot}></View>
                                   <View style={{display: 'flex',flexDirection: 'row', alignItems: 'center',gap: 10}}>
                                      <Text style={{fontWeight: 800,color:'rgb(38, 38 ,38)'}}>{meals['strMeasure'+i]}</Text>
                                      <Text style={{fontWeight: 700,color:'rgb(64, 64 ,64)'}}>{meals['strIngredient'+i]}</Text>
                                   </View>
                                </View>
                            )
                        })}
                   </View>
               </Animated.View>
               <Animated.View entering={FadeInDown.delay(400).duration(1000).springify().damping(12)} style={styles.ingredientContainer}>
                   <Text style={styles.heading}>Instructions</Text>
                   <Text style={{fontSize: hp(1.6),color: 'rgb(64, 64 ,64)'}}>{meals?.strInstructions}</Text>
               </Animated.View>
               {meals?.strYoutube && 
               <Animated.View entering={FadeInDown.delay(500).duration(1000).springify().damping(12)} style={styles.ingredientContainer}>
                   <Text style={styles.heading}>Recipie Video</Text>
                   <YoutubeIframe 
                      videoId={getYoutubeVideoId(meals.strYoutube)}
                      height={hp(30)}
                   />
               </Animated.View>}
            </View>
        )}
    </ScrollView>
  )
}

export default RecipieDescription

const styles = StyleSheet.create({
    conatiner:{
        flex: 1,
        backgroundColor: 'white',
        paddingBottom: 30
    },
    image:{
       width: wp(98),
       height: hp(50),
       backgroundColor: 'rgba(0,0,0,0.05)',
       borderRadius: 53,
       borderBottomLeftRadius: 40,
       borderBottomRightRadius: 40,
       marginTop: 5
    },
    imageConatiner:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonConatiner: {
        width: '100%',
        position: 'absolute',
        // backgroundColor: 'red',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 50,
        paddingHorizontal: 10
    },
    btn:{
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 9999,
        // marginLeft: 10
    },
    mealConatiner:{
         display: 'flex',
        //  backgroundColor: 'red',
         justifyContent: 'space-between',
         paddingHorizontal: 10,
         paddingTop: 10,
         gap: 5
     },
     mealHeading:{
        // flex: 1,
        fontSize: hp(3),
        fontWeight: '700',
        color: 'rgb(64 ,64 ,64)'
     },
     mealSubHeading:{
        // flex: 1,
        fontSize: hp(2),
        fontWeight: '500',
         color: 'rgb(115 ,115 ,115)'
     },
     tagConatainer:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
     },
     tag:{
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: 'rgb(251 ,191 ,36)',
        borderRadius: 9999,
        alignItems: 'center',
        padding: 10
     },
     imageContainer:{
         display: 'flex',
         justifyContent: 'center',
         borderRadius: 9999,
         alignItems: 'center',
         height: hp(6.5),
         width: hp(6.5),
         backgroundColor: 'white'
     },
     tagTextConatiner: {
        display: 'flex',
        alignItems: 'center',
        marginVertical: 4,
        paddingHorizontal: 4
     },
     tagText:{
        fontWeight: '700',
        color: 'rgb(64 ,64 ,64)'
     },
     ingredientContainer:{
        display: 'flex',
        marginTop: 16
     },
     heading:{
        fontSize: hp(3),
        fontWeight: '700',
        color: 'rgb(64 ,64 ,64)'
     },
     ingredeints:{
        marginTop: 4,
        marginLeft: 4,
        gap: 4
     },
     dot:{
        width: hp(1.3),
        height: hp(1.3),
        borderRadius: 9999,
        backgroundColor: 'rgb(251 ,191 ,36)',
     },

})