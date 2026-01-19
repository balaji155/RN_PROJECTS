import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import FirstScreen from './Screens/FirstScreen'
import HomeStackScreen from './Screens/HomeStackScreen'
import TopBarNavigator from './TopBarNavigator'

const StackNavigator = () => {
  const HomeStack = createNativeStackNavigator()
  return (
    <HomeStack.Navigator screenOptions={{
        headerShown: false,
        presentation: 'modal'
    }}>
        <HomeStack.Screen name='First' component={TopBarNavigator}/>
        <HomeStack.Screen name='HomeStackScreen' component={HomeStackScreen}/>
    </HomeStack.Navigator>
  )
}

export default StackNavigator