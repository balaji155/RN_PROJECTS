import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Notifications from '../Header/Notifications';

interface GridHeaderProps {
    title: string;
    btnText?: string;
    onPress?: () => void;
}

const GridHeader = ({ title,btnText = 'See All', onPress = () => {}}: GridHeaderProps) => {
  return (
    <View className='flex flex-row justify-between items-center'>
      <Text className='text-xl font-semiBoldFont text-dark-300'>{title}</Text>
      <TouchableOpacity onPress={onPress}>
          <Text className='text-base text-primary-300 font-semiBoldFont'>{btnText}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default GridHeader