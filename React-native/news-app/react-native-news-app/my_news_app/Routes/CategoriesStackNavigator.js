import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ROUTES } from './RouteNames'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import { HeartIcon } from 'react-native-heroicons/outline'
import { colors } from '../constants/colors'
import Categories from '../src/screens/Categories'
import SearchResultPage from '../src/components/CategoriesComp/SearchResultPage'
import NewsDetails from '../src/components/HomeScreenComponents/NewsDetails'


export default function CategoriesStackNavigator() {
    const Stack = createNativeStackNavigator()
  return (
     <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen component={Categories} name={ROUTES.CATAGORIES} />
        <Stack.Screen 
           component={SearchResultPage} 
           name={ROUTES.SEARCHRESULTPAGE}
           options={({navigation}) =>({
             headerLeft : () => {
                return(
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                       <ArrowLeftIcon color={colors.darkGrey}/>
                     </TouchableOpacity>
                )
             },
             headerShown: true,
             title:'Search'
           })}/>
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