import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import OccupiedSeat from './OccupiedSeat'
import OffersSnack from './OffersSnack'
import Tickets from './Tickets'

const Footer = () => {
    const {height: screenHeight} = Dimensions.get('window')
  return (
    <View style={[styles.container,{minHeight: screenHeight * 0.18}]}>
      <OffersSnack />
      <Text style={styles.textSt}>SCREEN THIS WAY</Text>
      <View style={styles.seatsCont}>
        <View style={{width: 15, height: 15, borderRadius: 4,borderColor: 'white',borderWidth: 1}}></View>
        <Text style={styles.textSeat}>Available</Text>
        <OccupiedSeat />
        <Text style={styles.textSeat}>Occupied</Text>
        <View style={{width: 15, height: 15, borderRadius: 4,borderColor: '#8E8E93FF',borderWidth: 1,backgroundColor: "#007aff"}}></View>
        <Text style={styles.textSeat}>Selected</Text>
      </View>
    </View>
  )
}

export default Footer

const styles = StyleSheet.create({
   container: {
     display: 'flex',
     flexDirection: 'column',
     justifyContent: 'space-between',
   },
   textSt:{
        fontSize: 12,
        fontWeight: '700',
        color: '#007aff',
        letterSpacing: 1.2,
        textAlign: 'center',
   },
   seatsCont: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 8
   },
   textSeat: {
        fontSize: 10,
        fontWeight: '700',
        color: 'white',
   }
})