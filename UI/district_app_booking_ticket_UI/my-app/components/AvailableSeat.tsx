import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AvailableSeat = ({seatNo}:{seatNo: number}) => {
  return (
    <View style={styles.seat}>
         <Text style={styles.seatNo}>{seatNo}</Text>
    </View>
  )
}

export default AvailableSeat

const styles = StyleSheet.create({
    seat: {
        width: 15,
        height: 15,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    seatNo: {
        fontSize: 8,
        fontWeight: '700',
        color: '#8E8E93FF',
    }
})