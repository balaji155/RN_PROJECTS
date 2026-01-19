import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FirstScreen from './Screens/FirstScreen'
import SecondScreen from './Screens/SecondScreen'
import ThirdScreen from './Screens/ThirdScreen'
import HomeIcon from '../Assets/Inicio.svg'
import HomeIconFilled from '../Assets/ActiveHome.svg'
import CategoriesIcon from '../Assets/categories.svg'
import CategoriesIconFilled from '../Assets/CategoriesIconFilled.svg'
import ProfileIcon from '../Assets/Profile.svg'
import ProfileIconFilled from '../Assets/ProfileIcon.svg'
import StackNavigator from './StackNavigator'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import DrawerNavigation from './DrawerNavigation'


export default function BottomTabNavigator() {
    const Tab = createBottomTabNavigator()
  return (
     <Tab.Navigator
        screenOptions={({route}) =>({
            headerShown: false,
            tabBarIcon: ({focused,color,size}) => {
               let Icon;
               if(route.name === 'DrawerNavigation'){
                  Icon = !focused ? <HomeIcon color={color} size={size}/> : <HomeIconFilled color={color} size={size}/>
               }else if(route.name === 'Second'){
                  Icon = !focused ? <CategoriesIcon color={color} size={size}/> : <CategoriesIconFilled color={color} size={size}/>
               }else if(route.name === 'Third'){
                   Icon = !focused ? <ProfileIcon color={color} size={size}/> : <ProfileIconFilled color={color} size={size}/>
               }
               return Icon;
            },
        })}
     >
        <Tab.Screen name='DrawerNavigation' component={DrawerNavigation} 
         //  options={({route})=> ({
         //    tabBarStyle: ((route) => {
         //        const currentScreen = getFocusedRouteNameFromRoute(route) ?? ''
         //        if(currentScreen === 'StackNavigator'){
         //          console.log(route,'nestedCurrentScreen')
         //          const nestedCurrentScreen = getFocusedRouteNameFromRoute(route?.state?.routes?.[0]) ?? ''
         //          console.log(nestedCurrentScreen,route?.state?.routes,'nestedCurrentScreen')
         //          return {display : nestedCurrentScreen === 'HomeStackScreen' ? 'none' : 'flex'}
         //        }
         //        return {display: 'flex'}
         //    })(route)
         //  })}
        />
        <Tab.Screen name='Second' component={SecondScreen}/>
        <Tab.Screen name='Third' component={ThirdScreen}/>
     </Tab.Navigator>
  )
}