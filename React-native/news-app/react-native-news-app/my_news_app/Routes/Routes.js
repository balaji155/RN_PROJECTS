import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import WelcomeScreen from '../src/screens/WelcomeScreen'
import BottomTabNavigator from './BottomTabNavigator'
import { ROUTES } from './RouteNames'

const Routes = () => {
 const Stack = createNativeStackNavigator()
  return (
    <NavigationContainer>
     <Stack.Navigator screenOptions={{ headerShown: false}} initialRouteName={ROUTES.WELCOMESCREEN}>
        <Stack.Screen component={WelcomeScreen} name={ROUTES.WELCOMESCREEN}/>
        <Stack.Screen component={BottomTabNavigator} name={ROUTES.BOTTOMTABNAVIGATOR}/>
     </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes