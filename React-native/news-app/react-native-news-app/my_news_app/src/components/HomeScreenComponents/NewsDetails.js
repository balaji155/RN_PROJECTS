import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useRoute } from '@react-navigation/native'
import { colors } from '../../../constants/colors'
import moment from 'moment'
import { ArrowLeftIcon, HeartIcon } from 'react-native-heroicons/solid'
import { HeartIcon as HeartIconOutline } from 'react-native-heroicons/outline'
import AsyncStorage from '@react-native-async-storage/async-storage'

const NewsDetails = () => {
    const route = useRoute()
    const { news } = route?.params
    const [whishlisted,setWhishlisted] = useState(false)
    const navigation = useNavigation()

    const addedToFavourites = async (newsID) => {
        console.log('coming');
        setWhishlisted(true);
    
        try {
            const token = await AsyncStorage.getItem('Favourites');
            let res = JSON.parse(token);
            if (res !== null) {
                let data = res.find(value => value === newsID);
                if (!data) { // Check if data is undefined
                    res.push(newsID);
                    await AsyncStorage.setItem('Favourites', JSON.stringify(res));
                    Alert.alert('Saved');
                } else {
                    Alert.alert('Already in Favourites');
                }
            } else {
                res = [];
                res.push(newsID);
                await AsyncStorage.setItem('Favourites', JSON.stringify(res));
                Alert.alert('Saved');
            }
        } catch (error) {
            console.error('Error saving to favourites:', error);
            Alert.alert('Error saving to favourites');
        }
    };
    
 console.log(AsyncStorage.getItem('Favourites').then(),'Favourites')
  
 const removeFromFavourites = async (newsID) => {
    setWhishlisted(false);

    try {
        const token = await AsyncStorage.getItem('Favourites');
        let res = JSON.parse(token); // Parse the stored JSON string into an array

        if (res && Array.isArray(res)) {
            const filteredRes = res.filter(value => value !== newsID); // Filter out the specific newsID
            await AsyncStorage.setItem('Favourites', JSON.stringify(filteredRes)); // Save the updated array
            Alert.alert('Unsaved');
        } else {
            Alert.alert('No favourites found to remove.');
        }
    } catch (error) {
        console.error('Error removing from favourites:', error);
        Alert.alert('Error removing from favourites');
    }
};

const checkIsAlreadyFavourite = async (newsID) => {
    try {
        const token = await AsyncStorage.getItem('Favourites');
        const res = JSON.parse(token); // Parse the stored JSON string into an array

        if (res && Array.isArray(res)) {
            const foundItem = res.find(value => value === newsID); // Check if newsID exists in the array
            return !!foundItem; // Return true if found, otherwise false
        }
        return false; // Return false if res is not an array or is null
    } catch (error) {
        console.error('Error checking favourites:', error);
        return false; // Return false in case of an error
    }
};



useEffect(() =>{
  const retainFavourites = async () =>{
    const isPresent = await checkIsAlreadyFavourite(news?.article_id)
    setWhishlisted(isPresent)
  }
  if(news?.article_id){
     retainFavourites()
  }
},[news?.article_id])


console.log(whishlisted,'whishlisted')
    useEffect(() =>{
        if(whishlisted){
            navigation.setOptions({
                headerLeft : () => {
                    return(
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                           <ArrowLeftIcon color={colors.darkGrey}/>
                         </TouchableOpacity>
                    )
                 },
                headerRight : () => {
                    return(
                        <TouchableOpacity onPress={() => removeFromFavourites(news?.article_id)}>
                           <HeartIcon color={colors.tint}/>
                         </TouchableOpacity>
                    )
                }
            })
        }else{
            navigation.setOptions({
                headerLeft : () => {
                    return(
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                           <ArrowLeftIcon color={colors.darkGrey}/>
                         </TouchableOpacity>
                    )
                 },
                headerRight : () => {
                    return(
                        <TouchableOpacity onPress={() => addedToFavourites(news?.article_id)}>
                           <HeartIconOutline color={colors.darkGrey}/>
                         </TouchableOpacity>
                    )
                }
            })
        }
    },[whishlisted])
  return (
    <ScrollView contentContainerStyle={styles.container} style={{backgroundColor: colors.white}}>
      <Text style={styles.title}>{news?.title}</Text>
      <View style={styles.dateContainer}>
         <Text style={styles.dateInfo}>{moment(news?.pubDate).format('MMMM DD, hh:mm a')}</Text>
         <Text style={styles.dateInfo}>{news?.source_name}</Text>
      </View>
      <Image source={{uri: news?.image_url}} style={styles.img}/>
      {news?.content != undefined ? <Text>{news?.content}</Text> :
          <Text>{news?.description}</Text>
       }
    </ScrollView>
  )
}

export default NewsDetails

const styles = StyleSheet.create({
    dateContainer:{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginVertical: 10
    },
    container:{
        flex: 1,
        padding: 10,
    },
    title:{
        fontSize: 14,
        color: colors.black,
        fontWeight: '600',
    },
    dateInfo:{
        fontSize: 12,
        color: colors.lightGrey,
        fontWeight: '400',
    },
    img:{
        width: '100%',
        height: 200
    }
})