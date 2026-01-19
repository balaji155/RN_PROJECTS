import React from 'react'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import FirstScreen from './Screens/FirstScreen'
import TopBar from './Screens/TobBar'

const TopBarNavigator = () => {
    const TobBar = createMaterialTopTabNavigator()
  return (
    <TobBar.Navigator>
        <TobBar.Screen name='main' component={FirstScreen}/>
        <TobBar.Screen name='topbar' component={TopBar}/>
    </TobBar.Navigator>
  )
}

export default TopBarNavigator