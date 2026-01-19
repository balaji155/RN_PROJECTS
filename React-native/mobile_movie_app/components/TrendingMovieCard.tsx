import { images } from '@/constants/images'
import MaskedView from '@react-native-masked-view/masked-view'
import { Link } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const TrendingMovieCard = ({movie: { movie_id,count,poster_url,searchTerm,title},index}: TrendingCardProps) => {
  return (
     <Link href={`/movies/${movie_id}`} asChild>
         <TouchableOpacity className='w-32 relative'>
              <Image  source={{
                 uri: poster_url ? poster_url : 'https://placehold.co/600x400/1a1a1a/ffffff.png'
              }}
              className='w-32 h-48 rounded-lg'
              />
              <View className='absolute bottom-5 -left-1 px-2 py-1'>
                  <MaskedView 
                     maskElement={
                        <Text className='font-bold text-white text-6xl'>{index + 1}</Text>
                     }>
                     <Image source={images.rankingGradient} className='size-14'/>
                  </MaskedView>
              </View>
              <Text className='font-bold text-sm text-light-300 mt-2' numberOfLines={2}>{title}</Text>
         </TouchableOpacity>
     </Link>
  )
}

export default TrendingMovieCard