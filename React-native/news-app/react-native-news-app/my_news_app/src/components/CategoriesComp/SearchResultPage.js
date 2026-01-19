import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import useGetSearchResults from '../../hooks/useGetSearchResults';
import NewsList, { NewsItem } from '../HomeScreenComponents/NewsList';
import Loader from '../../screens/Loader';

const SearchResultPage = ({route}) => {
    const { params } = route;
    const {query,category,country} = params
    const {newsListData,isLoading,isError} = useGetSearchResults(query,category,country)
    const [newsList,setNewsList] = useState([])
    useEffect(() => {
        if(newsListData && newsListData?.results){
          setNewsList(newsListData?.results)
         }
      },[newsListData])
  return (
    <View>
        {isLoading ? <Loader size={'large'}/> :
        <FlatList 
           data={newsList}
           renderItem={({index,item}) => <NewsItem index={index} news={item}/>}
        />}
    </View>
  )
}

export default SearchResultPage

const styles = StyleSheet.create({})