import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import useGetFavourites from '../hooks/useGetFavourites'
import Loader from './Loader'
import { NewsItem } from '../components/HomeScreenComponents/NewsList'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useIsFocused } from '@react-navigation/native'

const Favourites = () => {
  const [query,setQuery] = useState('')
  const {newsListData,isLoading,isError} = useGetFavourites(query)
  const [newsList,setNewsList] = useState([])
  const isFocused = useIsFocused()
  // Update newsList when newsListData changes
  useEffect(() => {
    if (newsListData && newsListData.results) {
      setNewsList(newsListData.results);
    } else {
      setNewsList([]); // Clear list if no results
    }
  }, [newsListData]);

  // Fetch favourites from AsyncStorage and construct the query
  useEffect(() => {
    const getFavouritesIDs = async () => {
      try {
        const token = await AsyncStorage.getItem('Favourites');
        const res = JSON.parse(token);

        if (res && Array.isArray(res)) {
          setQuery(res.join(',')); // Convert array to comma-separated string
        } else {
          setQuery(''); // Set to empty string if no favourites
        }
      } catch (error) {
        console.error('Error fetching favourites:', error);
        setQuery(''); // Handle error gracefully
      }
    };

    getFavouritesIDs();
  }, [isFocused]); // Run once on mount

 console.log(newsList,newsListData,'sreedevi')
  return (
    <SafeAreaView>
     {isLoading ? <Loader size={'large'}/> :
        <FlatList 
           data={newsList}
           renderItem={({index,item}) => <NewsItem index={index} news={item}/>}
        />}
    </SafeAreaView>
  )
}

export default Favourites

const styles = StyleSheet.create({})