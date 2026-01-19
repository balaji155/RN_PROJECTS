import { View, Text, Platform, FlatList, ActivityIndicator, KeyboardAvoidingView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { router, useLocalSearchParams } from 'expo-router'
import { useAppwrite } from '@/services/hooks/useAppwrite'
import { getProperties } from '@/services/appwrite'
import { Card } from '@/components/cards/Cards'
import GridNoResult from '@/components/NoResults/GridNoResult'
import SearchBar from '@/components/Search/SearchBar'
import Categories from '@/components/grids/Categories'
import icons from '@/constants/icons'
import Notifications from '@/components/Header/Notifications'

const explore = () => {
  const { top } = useSafeAreaInsets()
   const params = useLocalSearchParams<{query: string | undefined ,filter?: string}>()
   const { data: properties,loading: propertiesLoading,refetch}  = useAppwrite({
     fn: getProperties,
     params: {
       query: params.query || '',
       filter: params.filter || '',
       limit: 20
     },
     skip: true
   })

   useEffect(() => {
      refetch({
        query: params.query || '',
        filter: params.filter || '',
        limit: 20
      })
   },[params.query,params.filter])

  const handleOnpress = (id: string) => router.push(`/property/${id}`)

  return (
    <KeyboardAvoidingView
    style={{ paddingTop: top }}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    className="flex-1 px-4"
  >
         <FlatList 
            data={properties}
            renderItem={({item}) => <Card item={item} onPress={() => handleOnpress(item.$id)}/>}
            keyExtractor={(item) => item.$id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
               propertiesLoading ? <ActivityIndicator size={"large"} className="mt-10 text-primary-300"/> : <GridNoResult />
            }
            ListHeaderComponent={() => (
              <>
                    <View className='flex flex-row justify-between items-center'>
                        <TouchableOpacity className='flex flex-row justify-center items-center px-2 py-2 rounded-full bg-primary-200' onPress={() => router.back()}>
                             <Image source={icons.backArrow} className='size-6'/>
                        </TouchableOpacity>
                        <Text className='text-lg font-semiBoldFont text-dark-300'>Search for Your Ideal Home</Text>
                        <Notifications />
                    </View>
                    <SearchBar />
                    <Categories />
              </>
            )}
            columnWrapperStyle={{
               paddingBottom: 20
            }}
           keyboardShouldPersistTaps="always"
         />
    </KeyboardAvoidingView>
  );
}

export default explore