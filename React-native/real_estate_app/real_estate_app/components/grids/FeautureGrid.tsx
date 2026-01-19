import { View, FlatList, ActivityIndicator } from 'react-native'
import React from 'react'
import GridHeader from './GridHeader'
import { FeauturedCard } from '../cards/Cards'
import { getLatestProperties } from '@/services/appwrite'
import { router } from 'expo-router'
import { useAppwrite } from '@/services/hooks/useAppwrite'
import GridNoResult from '../NoResults/GridNoResult'

const FeautureGrid = () => {
    const { data: latestProperties,loading} = useAppwrite({
        fn: getLatestProperties
      })
      if(loading) return <ActivityIndicator size={"large"} className="mt-10 text-primary-300"/>

      if(!loading && latestProperties && latestProperties.length === 0) return <GridNoResult />
  return (
    <View>
       <GridHeader title='Featured'/>
       <FlatList 
          data={latestProperties}
          renderItem={({item}) => <FeauturedCard item={item} onPress={() => router.push(`/property/${item.$id}`)}/>}
          keyExtractor={(item) => item.$id}
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={true}
       />
    </View>
  )
}

export default FeautureGrid