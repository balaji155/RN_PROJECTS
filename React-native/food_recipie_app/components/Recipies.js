import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen'
import RecImg from '../assets/rounded_image.png'
import MasonryList from '@react-native-seoul/masonry-list'
import Animated,{FadeInDown} from 'react-native-reanimated'
import Loader from './Loader'
import CachedImage from '../helpers/cachedImage'
import { useNavigation } from '@react-navigation/native'

const Recipies = ({catagories,meals}) => {
  const navigation = useNavigation()
  return (
    <View style={styles.conatiner}>
      <Text style={styles.heading}>Recipies</Text>
      <View>
        {catagories?.length === 0 || meals.length === 0  ? <Loader size="large" color='rgb(251 191 36)'/> : (
          <FlatList
            data={meals}
            keyExtractor={(item) => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({item,index}) => <RecipeItem item={item} index={index} navigation={navigation}/>}
            // refreshing={isLoadingNext}
            // onRefresh={() => refetch({first: ITEM_CNT})}
            onEndReachedThreshold={0.1}
            // onEndReached={() => loadNext(ITEM_CNT)}
        />)}
      </View>
    </View>
  )
}



export default Recipies

const RecipeItem = ({item ,index,navigation}) =>{
    const isEven = index%2 === 0
    console.log(index,isEven,'isEven')
return(
    <Animated.View entering={FadeInDown.delay(index*100).duration(500).springify().damping()}>
        <Pressable onPress={() => navigation.navigate('RecipieDescription',{...item})} style={[styles.recipeConatiner,{paddingLeft: isEven ? 0: 8,paddingRight: isEven? 8: 0}]}>
            <CachedImage uri={item.strMealThumb} style={styles.image} sharedTransitionTag={item.strMeal}/>
            <Text style={styles.txt}>{item.strMeal.length > 20 ? item.strMeal.slice(0,20)+'...' : item.strMeal}</Text>
        </Pressable>
     </Animated.View>
    )
}

const styles = StyleSheet.create({
    conatiner:{
        marginVertical: 15,
        marginHorizontal: 10,
        gap: 10
    },
    heading:{
        fontSize: hp(3),
        color: 'rgb(82 82 82)',
        fontWeight: '600'
    },
    recipeConatiner:{
        flex: 1,
        width: wp(45),
        alignItems: 'center',
        gap: 10,
        marginBottom: 10,
    },
    txt:{
       fontSize: hp(1.5),
       fontWeight: '600',
       color: 'rgb(82 82 82)',
    },
    image: {
        width: '100%', 
        height: hp(35),// Set a consistent height to maintain aspect ratio
        resizeMode: 'cover', // Crop the image to fit dimensions if needed
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 25
      },
})