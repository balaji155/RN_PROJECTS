import React from 'react'
import { useQuery } from 'react-query'
import { getBreakingNews } from '../Servises/NewsApi'

const useGetBreakingNews = () => {
  const {data,isError,isFetched,error,isLoading} = useQuery(
    ['breaking-news'],
    () => getBreakingNews()
  )
  console.log(data,'raw-response')
  return { 
    breakingNewsData: data,
    isError,
    isFetched,
    error,
    isLoading
  }
}

export default useGetBreakingNews