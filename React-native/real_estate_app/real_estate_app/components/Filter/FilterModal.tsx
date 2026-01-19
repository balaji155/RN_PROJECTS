import { View, Text, Modal, Pressable, StyleSheet, Image, ImageBackground } from 'react-native'
import React from 'react'
import icons from '@/constants/icons'
import images from '@/constants/images'
import RangeSlider from './RangeSlider'

const FilterModal = () => {
  return (
    <Modal
    animationType="slide"
    visible={true}
    onRequestClose={() => {
    
    }}>
      <View style={styles.modalView}>
           <View className='flex flex-row justify-between items-center mb-6'>
                 <View className='flex flex-row justify-center items-center p-2 rounded-full bg-primary-200'>
                     <Image source={icons.backArrow} className='size-6'/>
                 </View>
                 <Text className='text-base font-semiBoldFont text-dark-300'>Filter</Text>
                 <Pressable>
                     <Text className='text-[14px] font-semiBoldFont text-primary-300'> Reset</Text>
                 </Pressable>
           </View>
           <Text className='text-base font-semiBoldFont text-dark-300 mb-4'>Price Range</Text>
           <ImageBackground source={images.barChart} className='w-full h-32' resizeMode='contain'>
               <View className='flex-1 justify-center items-center flex-col'>
                   <RangeSlider />
               </View>
           </ImageBackground>
      </View>
  </Modal>
  )
}

export default FilterModal

const styles = StyleSheet.create({
    modalView: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 30,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    }
  });
  