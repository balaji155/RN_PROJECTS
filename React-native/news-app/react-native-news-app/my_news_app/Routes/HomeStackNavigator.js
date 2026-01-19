import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ROUTES } from './RouteNames'
import Home from '../src/screens/Home'
import NewsDetails from '../src/components/HomeScreenComponents/NewsDetails'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import { HeartIcon } from 'react-native-heroicons/outline'
import { colors } from '../constants/colors'


export default function HomeStackNavigator() {
    const Stack = createNativeStackNavigator()
  return (
     <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen component={Home} name={ROUTES.HOME} />
        <Stack.Screen 
           component={NewsDetails} 
           name={ROUTES.NEWSDETAILSSCREEN}
           options={({navigation}) =>({
             headerLeft : () => {
                return(
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                       <ArrowLeftIcon color={colors.darkGrey}/>
                     </TouchableOpacity>
                )
             },
             headerRight : () => {
                return(
                    <HeartIcon color={colors.darkGrey}/>
                )
             },
             headerShown: true,
             title:'News'
           })}/>
     </Stack.Navigator>
  )
}