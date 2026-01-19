import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Account from '../src/screens/Account'
import { TabBar } from '../src/components/TabBar'
import { ROUTES } from './RouteNames'
import HomeStackNavigator from './HomeStackNavigator'
import CategoriesStackNavigator from './CategoriesStackNavigator'
import FavouritesStackNavigator from './FavouritesStackNavigator'

const BottomTabNavigator = () => {
    const Tab = createBottomTabNavigator()
  return (
     <Tab.Navigator tabBar={(props) => <TabBar {...props}/> } initialRouteName={ROUTES.HOME} screenOptions={{headerShown: false}}>
          <Tab.Screen component={HomeStackNavigator} name={ROUTES.HOME}/>
          <Tab.Screen component={CategoriesStackNavigator} name={ROUTES.CATAGORIES}/>
          <Tab.Screen component={FavouritesStackNavigator} name={ROUTES.FAVOURITES}/>
          <Tab.Screen component={Account} name={ROUTES.ACCOUNT}/>
     </Tab.Navigator>
  )
}

export default BottomTabNavigator