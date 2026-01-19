import { View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import icons from '@/constants/icons'
import { colors } from '@/constants/colors'
import { router, useLocalSearchParams } from 'expo-router'
import { useDebouncedCallback } from "use-debounce";


const SearchBar = () => {
  const params = useLocalSearchParams<{ query?: string }>()
  const [searchQuery, setSearchQuery] = useState(params?.query || '')
  
  const debouneSearch = useDebouncedCallback((query: string) => {
       router.setParams({query})
  },500)

  const handleSearch = (text: string) => {
      setSearchQuery(text)
      debouneSearch(text)
  }

  return (
    <View className="px-3 py-4 bg-primary-100 flex flex-row justify-between items-center my-4 rounded-lg">
      <View className="flex-row items-center gap-4 flex-1">
        <Image source={icons.search} className="size-6" />

        <TextInput
          placeholder="Search something"
          placeholderTextColor={colors.darkOne}
          value={searchQuery}
          onChangeText={handleSearch}
          className="text-[14px] text-dark-300 font-regularFont flex-1"
        />
      </View>

      <TouchableOpacity>
        <Image source={icons.filter} className="size-6 ml-1" />
      </TouchableOpacity>
    </View>
  )
}

export default SearchBar
