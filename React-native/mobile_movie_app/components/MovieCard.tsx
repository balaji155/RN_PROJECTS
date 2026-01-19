import { icons } from '@/constants/icons'
import { Link } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const MovieCard = ({id,title,poster_path,vote_average,release_date}: Movie) => {
  return (
    <Link href={`/movies/${id}`} asChild>
       <TouchableOpacity className='w-[31%]'>
            <Image 
              source={{
                 uri: poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}`: 'https://placehold.co/600x400/1a1a1a/ffffff.png'
              }}
              className='w-full h-56 rounded-lg'
            />
            <Text className='text-sm mt-2 text-white' numberOfLines={1}>{title}</Text>
            <View className='flex-row flex-start items-center gap-x-1'>
                <Image source={icons.star} className='size-4'/>
                <Text className='text-xs text-white font-bold uppercase'>{Math.round(vote_average/2)}</Text>
            </View>
            <View className='flex-row items-center justify-between mt-1'>
                 <Text className='text-xs text-light-300 font-medium'>{release_date.split('-')?.[0]}</Text>
                 <Text className='text-xs text-light-300 font-medium'>Movie</Text>
            </View>
       </TouchableOpacity>
    </Link>
  )
}

export default MovieCard