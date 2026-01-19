import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const HomeStackScreen = () => {
    const {goBack} = useNavigation()
  return (
    <View>
      <Text onPress={()=> goBack()}>HomeStackScreen</Text>
    </View>
  )
}

export default HomeStackScreen