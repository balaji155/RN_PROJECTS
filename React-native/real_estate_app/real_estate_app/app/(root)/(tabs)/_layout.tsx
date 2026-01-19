import { Redirect, Tabs } from 'expo-router'
import React from 'react'
import { Image } from 'react-native'
import icons from '@/constants/icons'
import { colors } from '@/constants/colors'
import { useGlobalContext } from '@/services/global-provider'

interface TabBarIconProps {
  focused: boolean
  image: any
}

export default function TabsLayout() {
  const { isLoggedIn, loading } = useGlobalContext()

  // ⛔ IMPORTANT: wait until auth is resolved
  if (loading) return null

  // 🔐 Auth guard
  if (!isLoggedIn) {
    return <Redirect href="/(root)/onboarding" />
  }

  const TabBarIcon = ({ focused, image }: TabBarIconProps) => (
    <Image
      source={image}
      className="size-6"
      tintColor={focused ? colors.primary : colors.darkTwo}
    />
  )

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} image={icons.home} />
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} image={icons.search} />
          ),
        }}
      />

      <Tabs.Screen
        name="account"
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} image={icons.person} />
          ),
        }}
      />
    </Tabs>
  )
}
