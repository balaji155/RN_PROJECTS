import { View, Text, Image, TouchableNativeFeedback } from 'react-native'
import React from 'react'
import images from '@/constants/images'
import icons from '@/constants/icons'
import { useGlobalContext } from '@/services/global-provider'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'
import { Link } from 'expo-router'
import Notifications from './Notifications'

const Header = () => {
    const { user } = useGlobalContext()

    const getGreetingText = () => {
        const currentHour = new Date().getHours()
        if(currentHour < 12) return 'Good Morning'
        if(currentHour < 18) return 'Good Afternoon'
        return 'Good Evening'
    }
  return (
    <View className='flex flex-row justify-between items-center'>
         <View className='flex flex-row justify-between items-center gap-4'>
              <Link href={'/account'} asChild>
                <TouchableNativeFeedback>
                  <Image source={images.avatar} className='size-14 rounded-full'/>
                </TouchableNativeFeedback>
              </Link>
              <View className='flex flex-col justify-between'>
                  <Text className='text-[14px] font-[400] font-regularFont text-dark-100'>{getGreetingText()}</Text>
                  <Text className='text-xl  font-semiBoldFont text-dark-300 flex-wrap '>{user ?  user?.name?.length > 20 ? user.name.slice(0,20) + "..." : user.name : ''}</Text>
              </View>
         </View>
         <Notifications customStyles={'mr-3'}/>
    </View>
  )
}

export default Header