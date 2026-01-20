import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AvailableSeat from './AvailableSeat'
import { rowDetails } from '@/mock-data/ticketsMockData'
import OccupiedSeat from './OccupiedSeat'

const SeatRow = (rowDetails: rowDetails) => {
  return (
    <View style={styles.container}>
     <View style={styles.seat}>
      <Text style={styles.rowText}>{rowDetails.row}</Text>
     </View>
      <View style={styles.seatContainer}>
            {rowDetails?.seats?.map((seat, index) => {
                 return seat.available ? <AvailableSeat key={seat.id} seatNo={seat.seatNumber} /> : <OccupiedSeat key={seat.id}/>
            })}
      </View>
    </View>
  )
}

export default SeatRow

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 30
    },
    rowText:{
        fontSize: 6,
        fontWeight: '700',
        color: 'white',
    },
    seatContainer:{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 5,
    },
    seat: {
        width: 15,
        height: 15,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
})