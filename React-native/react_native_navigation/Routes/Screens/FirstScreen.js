import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const FirstScreen = () => {
  const  { navigate } = useNavigation()
  return (
    <SafeAreaView>
      <Text onPress={() => navigate('HomeStackScreen')}>FirstScreen</Text>
    </SafeAreaView>
  )
}

export default FirstScreen

const styles = StyleSheet.create({})