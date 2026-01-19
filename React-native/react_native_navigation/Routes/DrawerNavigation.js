import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import FirstScreen from './Screens/FirstScreen'
import Settings from './Screens/Settings'
import StackNavigator from './StackNavigator'

const DrawerNavigation = () => {
    const Drawer = createDrawerNavigator()
  return (
    <Drawer.Navigator>
        <Drawer.Screen name='StackNavigator' component={StackNavigator}/>
        <Drawer.Screen name='SettingsDrawerScreen' component={Settings}/>
    </Drawer.Navigator>
  )
}

export default DrawerNavigation