import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const EmptySeat = () => {
  return (
    <View style={styles.seat}/>
  )
}

export default EmptySeat

const styles = StyleSheet.create({
    seat: {
        width: 15,
        height: 15,
        display: 'flex',
    }
})