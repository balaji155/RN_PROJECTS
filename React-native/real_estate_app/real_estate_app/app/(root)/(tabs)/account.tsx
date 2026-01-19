import { View, Text, ScrollView, Image, TouchableOpacity, ImageSourcePropType, Alert } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import icons from '@/constants/icons'
import images from '@/constants/images'
import { settings } from '@/constants/data'
import { logout } from '@/services/appwrite'
import { useGlobalContext } from '@/services/global-provider'

interface SettingsIconAndTitleProps {
   title: string,
   icon: ImageSourcePropType,
   onPress?: () => void,
   showArrow?: boolean,
   textStyles?: any,
}


const account = () => {
   const {top,bottom} = useSafeAreaInsets()
   const { user,refetch} = useGlobalContext()

   const SettingsIconAndTitle = ({title,icon,onPress,showArrow = true,textStyles}: SettingsIconAndTitleProps) => {
      return (
          <TouchableOpacity className='flex flex-row justify-between items-center my-2' onPress={onPress}>
              <View className='flex flex-row items-center gap-4'>
                  <Image source={icon} className='size-8'/>
                  <Text className={` text-dark-300 text-lg font-mediumFont ${textStyles}`}>{title}</Text>
              </View>
              {showArrow && <Image source={icons.rightArrow} className='size-6' tintColor={"#191D31"}/>}
          </TouchableOpacity>
      )
   }

   const logoutHandler = async () => {
       const result = await logout()
       if(result){
          Alert.alert("Logged out","You have successfully logged out")
          refetch()
       }else{
          Alert.alert("Error","Something went wrong")
       }
   }
   
  return (
     <View style={{paddingTop: top,paddingBottom: bottom}} className='h-full bg-white'>
       <ScrollView showsVerticalScrollIndicator={false} className='pb-32 px-7'>
           <View className='flex flex-row justify-between items-center'>
               <Text className='text-xl font-semiBoldFont text-dark-300'>Profile</Text>
               <View className='relative flex-col'>
                  <Image source={icons.bell} className='size-6'/>
                  <View className='absolute size-2 bg-primary-300 rounded-full right-[0.9] top-1'></View>
               </View>
           </View>
           <View className='mt-10 flex-row justify-center items-center mb-4'>
                <View className='flex flex-col items-center'>
                    <Image source={images.avatar}  className="size-44 relative rounded-full" />
                    <Image source={icons.edit} className='absolute w-[29.17px] h-[29.17px] bottom-11 right-2 rounded-xl'/>
                    <Text className='font-boldFont text-2xl text-dark-300 mt-2'>{user?.name}</Text>
                </View>
           </View>
           <View className='flex flex-col border-t border-primary-200 gap-2 py-2'>
               <SettingsIconAndTitle icon={icons.calendar} title="My Bookings" />
               <SettingsIconAndTitle icon={icons.calendar} title="My Bookings" />
           </View>
           <View className='flex flex-col border-t border-primary-200 gap-2 py-2'>
               {settings.slice(2).map((item,index) => (
                    <SettingsIconAndTitle key={index} {...item} />
                ))
              }
               <SettingsIconAndTitle icon={icons.logout} title="Logout"  textStyles={'text-danger'} showArrow={false} onPress={logoutHandler}/>
           </View>
       </ScrollView>
     </View>
  )
}

export default account