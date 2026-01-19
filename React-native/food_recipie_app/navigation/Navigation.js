import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen'
import WelcomeScreen from '../screens/WelcomeScreen'
import RecipieDescription from '../components/RecipieDescription'

const Navigation = () => {
  const Stack = createNativeStackNavigator()
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='WelcomeScreen' screenOptions={{ headerShown: false}}>
            <Stack.Screen name='home' component={HomeScreen}/>
            <Stack.Screen name='WelcomeScreen' component={WelcomeScreen}/>
            <Stack.Screen name='RecipieDescription' component={RecipieDescription}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation