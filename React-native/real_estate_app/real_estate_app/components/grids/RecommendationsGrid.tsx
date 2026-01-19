import { View, Text } from 'react-native'
import React from 'react'
import GridHeader from './GridHeader'
import Categories from './Categories'

const RecommendationsGrid = () => {
  return (
    <View>
        <GridHeader title='Our Recomendations'/>
        <Categories />
    </View>
  )
}

export default RecommendationsGrid