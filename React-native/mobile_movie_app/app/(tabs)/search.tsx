import MovieCard from '@/components/MovieCard'
import SearchBar from '@/components/SearchBar'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { fetchMovies } from '@/services/api'
import { updateSearchTerm } from '@/services/appwrite'
import useFetch from '@/services/useFetch'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native'

const search = () => {
  const router = useRouter()
  const [searchQuery,setSearchQuery] = useState<string>('')
  const {data: moviesData,loading ,error,refetch: loadMovies,reset} = useFetch(() => fetchMovies({
    query: searchQuery
  }),false)

  useEffect(() => {
     const setTimeOutID = setTimeout(async () => {
         if(searchQuery.trim()){
            await loadMovies()
         }else{
            reset()
         }
     },500)

     return () => clearTimeout(setTimeOutID)
  },[searchQuery])

  useEffect(() => {
   if(moviesData?.length > 0 && moviesData[0]){
      updateSearchTerm(searchQuery,moviesData?.[0])
   }
  },[moviesData])


  return (
    <View className='bg-primary flex-1 px-2'>
       <Image source={images.bg} className='absolute w-full flex-1 z-0'/>
       <FlatList 
         data={moviesData}
         renderItem={({item}) => (
            <MovieCard {...item}/>
         )}
         numColumns={3}
         columnWrapperStyle={{
            justifyContent: 'flex-start',
            gap: 10,
            // padding:10,
         }}
         contentContainerStyle={{
           paddingBottom: 100,
         }}
         className='mt-10'
         keyExtractor={(item) => item.id?.toString()}
         showsVerticalScrollIndicator={false}
         ListHeaderComponent={
           <>
              <View className='flex-1 w-full justify-center items-center my-10'>
                 <Image source={icons.logo} className='w-12 h-10'/>
              </View>
              <View className='my-2'>
                <SearchBar placeHolder='Search for movie...' value={searchQuery} onChangeText={(text) => setSearchQuery(text)}/>
              </View>
              {loading && (
                <ActivityIndicator size="large" color="#0000ff" className="mt-4 self-center"/>
              )}
              {error && (
                 <Text className='text-red-500'>Error: ${error?.message}</Text>
              )}
              {!loading && !error && searchQuery.trim().length > 0 && moviesData?.length > 0 && (
                 <Text className='text-xl text-white font-bold my-2'>Search Results for{' '}
                  <Text className='text-accent'>{searchQuery}</Text>
                 </Text>
              )}
           </>
         }
         ListEmptyComponent={
           (!loading && !error ? 
            <Text className='text-gray-600 text-center px-4 mt-4'>{searchQuery.trim() ? "No movies found" : 'Search for movies'}</Text>
           : null)
         }
       />
    </View>
  )
}

export default search