import { View, Text, Image } from 'react-native'
import React from 'react'
import images from '@/constants/images'

const GridNoResult = () => {
  return (
    <View className='flex items-center my-5'>
          <Image source={images.noResult} className='w-11/12 h-80' resizeMode='contain'/>
          <Text className='text-2xl font-boldFont text-dark-300'>No results found</Text>
          <Text className='text-base font-semiBoldFont text-dark-300'>Opps! we coudn't find anything you are looking for</Text>
    </View>
  )
}

export default GridNoResult