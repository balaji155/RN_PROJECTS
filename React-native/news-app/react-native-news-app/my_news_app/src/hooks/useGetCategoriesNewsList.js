import React from 'react'
import { useQuery } from 'react-query'
import { getCategoriesNewsList } from '../Servises/NewsApi'

const useGetCategoriesNewsList = (category) => {
  const {data,isError,isFetched,error,isLoading} = useQuery(
    ['breaking-news',category],
    () => getCategoriesNewsList(category)
  )
  console.log(data,'raw-response')
  return { 
    newsListData: data,
    isError,
    isFetched,
    error,
    isLoading
  }
}

export default useGetCategoriesNewsList