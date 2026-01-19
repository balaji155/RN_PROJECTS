import { View, Text, Image } from 'react-native'
import React from 'react'
import icons from '@/constants/icons'

const Notifications = ({customStyles = ''}:{customStyles?: any}) => {
  return (
    <View className={`relative ${customStyles}`}>
         <Image source={icons.bell} className='size-6'/>
         <View className='absolute size-2 right-0 top-1 rounded-full bg-primary-300'></View>
     </View>
  )
}

export default Notifications