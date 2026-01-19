import React from 'react'
import { useQuery } from 'react-query'
import { getSearchNewsList } from '../Servises/NewsApi'

const useGetSearchResults = (query,category,country) => {
  const {data,isError,isFetched,error,isLoading} = useQuery(
    ['search-news',category,query,country],
    () => getSearchNewsList(query,category,country)
  )
  console.log(data,'raw-response-search')
  return { 
    newsListData: data,
    isError,
    isFetched,
    error,
    isLoading
  }
}

export default useGetSearchResults