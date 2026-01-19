import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BottomTabNavigator from './BottomTabNavigator'

const Navigation = () => {
    const Stack = createNativeStackNavigator()
  return (
    <NavigationContainer>
       <BottomTabNavigator />
    </NavigationContainer>
  )
}

export default Navigation