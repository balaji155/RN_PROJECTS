import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Loader = (props) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator {...props}/>
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center'
    }
})