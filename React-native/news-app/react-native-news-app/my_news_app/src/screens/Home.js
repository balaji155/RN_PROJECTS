import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '../components/HomeScreenComponents/Header'
import SearchBar from '../components/HomeScreenComponents/SearchBar'
import useGetBreakingNews from '../hooks/useGetBreakingNews'
import BreakingNews from '../components/HomeScreenComponents/BreakingNews'
import HomeCategories from '../components/HomeScreenComponents/HomeCategories'
import NewsList from '../components/HomeScreenComponents/NewsList'
import Loader from './Loader'
import useGetCategoriesNewsList from '../hooks/useGetCategoriesNewsList'


const Home = () => {
  const { breakingNewsData,isError,isFetched,error ,isLoading} = useGetBreakingNews()
  const {top: safeTop}= useSafeAreaInsets()
  const [breakingNews,setBreakingNews] = useState([])
  const [category,setCatogery] = useState('')
  const {newsListData,isLoading: catLoading} = useGetCategoriesNewsList(category)
  const [newsList,setNewsList] = useState([])
  useEffect(() => {
      if(breakingNewsData && breakingNewsData?.results){
          setBreakingNews(breakingNewsData?.results)
      }
  },[breakingNewsData])

  useEffect(() => {
    if(newsListData && newsListData?.results){
      setNewsList(newsListData?.results)
     }
  },[newsListData])

  const onCategorySelected =(category) =>{
    setNewsList([])
    setCatogery(category)
  }
  return (
    <ScrollView style={{flex:1,paddingTop:safeTop}} showsVerticalScrollIndicator={false}>
      <Header />
      <SearchBar />
      {isLoading && <Loader size={'small'}/>}
      {breakingNews && breakingNews?.length >0 && <BreakingNews breakingNews={breakingNews}/>}
       <HomeCategories onCategorySelected={onCategorySelected}/>
      <NewsList newsList={newsList} isLoading={catLoading}/>
    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({})