import { NativeModules, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const App = () => {
  const NATIVE_MODULE_LINKIN_ERROR = 'Native module "LinkingError" does not exist. Make sure to import it from the correct package and that it is properly linked.'

  const HelloModule = NativeModules.HelloModule ?
    NativeModules.HelloModule :
     new Proxy({}, {
        get() {
           throw new Error(NATIVE_MODULE_LINKIN_ERROR)
        }
     })
  const handlePress = async () => {
     try {
         const result = await HelloModule.greet("Balaji")
         console.log(result)
     }catch (error) {
        console.error(error)
     }
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity onPress={handlePress}>
            <Text>Click me</Text>
        </TouchableOpacity>
    </View>
  )
}

export default App

const styles = StyleSheet.create({})