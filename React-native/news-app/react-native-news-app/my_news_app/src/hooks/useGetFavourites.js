import React from 'react'
import { useQuery } from 'react-query'
import { getFavourtitesNewsList } from '../Servises/NewsApi'

const useGetFavourites = (query) => {
  const {data,isError,isFetched,error,isLoading} = useQuery(
    ['search-news',query],
    () => getFavourtitesNewsList(query),
    {
        enabled: !!query, // Disable query if `query` is empty
      }
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

export default useGetFavourites