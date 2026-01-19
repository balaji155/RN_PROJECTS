import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { categories } from '@/constants/data'
import { colors } from '@/constants/colors'
import { router, useLocalSearchParams } from 'expo-router'

interface itemProps {
    title: string,
    category: string
    isSelected: boolean
}

const Categories = () => {
    const params = useLocalSearchParams<{filter?: string}>()
    const [selectedFilter,setSelectedfilter] = useState(params.filter || 'All')


    const handleCategory = (category: string) => {
         if(selectedFilter === category){
            setSelectedfilter('All')
            router.setParams({filter: 'All'}) 
            return  
         }
            setSelectedfilter(category)
            router.setParams({filter: category})
    }

    const Item = ({title,category,isSelected}: itemProps) => {
         return (
            <TouchableOpacity className='px-4 py-3 rounded-[30px] mx-2' style={{backgroundColor: isSelected ? colors.primary : colors.primaryOne}} onPress={() => handleCategory(category)}>
                <Text className={`text-sm ${isSelected ? 'text-white font-semiBoldFont' : 'text-dark-300 font-regularFont'}`}>{title}</Text>
            </TouchableOpacity>
         )
    }
  return (
     <FlatList 
        data={categories}
        renderItem={({item}) => (
             <Item isSelected={selectedFilter === item.category} title={item.title} category={item.category}/>)}
        horizontal
        showsHorizontalScrollIndicator={false}
        className='mt-6'
        keyExtractor={(item,index) => index.toString()}
     />
  )
}

export default Categories