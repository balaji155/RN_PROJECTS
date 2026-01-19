import { View, Text, Image, Touchable, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import icons from '@/constants/icons'
import images from '@/constants/images'
import { login } from '@/services/appwrite'
import { useGlobalContext } from '@/services/global-provider'
import { Redirect } from 'expo-router'

const OnBoarding = () => {
  const { loading ,refetch,isLoggedIn} = useGlobalContext()

  if(!loading && isLoggedIn) return <Redirect href={'/'}/>

  const handlelogin = async () => {
      const result = await login()
      if(result){
         await refetch({})
      }else{
         Alert.alert("Error","Failed to Login")
      }
      console.log(result)
  }
  return (
    <View className='flex-1'>
        <View className='px-4 py-20 h-[100%]'>
          <Image source={images.onboarding} className='w-[100%] h-[60%] mt-2'/>
          <View className='px-10 my-8 flex-col gap-2'>
            <Text className='text-center text-dark-200 text-base font-regularFont uppercase tracking-[2]'>Welcome to Real Scout</Text>
            <Text className='text-[32px] font-regularFont font-semibold text-dark-300 text-center'>Let's Get You Closer To <Text className='text-primary-300'>Your Ideal Home</Text></Text>
            <Text className='text-center font-regularFont font-normal text-[18px] text-dark-200'>Login to Real Scout with Google</Text>
          </View>
          <TouchableOpacity className='rounded-[30px] flex-row justify-center items-center gap-2 bg-white py-5' onPress={handlelogin}>
              <Image source={icons.google} className='size-5'/>
              <Text className='font-regularFont font-[500] text-dark-300 text-[18px]'>Sign Up with Google</Text>
          </TouchableOpacity>
        </View>
    </View>
  )
}

export default OnBoarding