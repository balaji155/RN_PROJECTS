import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const OccupiedSeat = () => {
  return (
    <View style={styles.seat}>
        <Text style={styles.cross}>x</Text>
    </View>
  )
}

export default OccupiedSeat

const styles = StyleSheet.create({
    seat: {
      width: 15,
      height: 15,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#8E8E93FF',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    cross: {
        fontSize: 7,
        fontWeight: '700',
        color: '#8E8E93FF',
    }
})