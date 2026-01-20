import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenTypeAndPrice from './ScreenTypeAndPrice'
import SeatRow from './SeatRow'
import { rowDetails, TicketRow } from '@/mock-data/ticketsMockData'
import EmptySeat from './EmptySeat'


const SeatTypeAndRowsSection = (ticketSectionDetails: TicketRow) => {
    const renderRow = (rowDetails: rowDetails,index: number) => {
        if(rowDetails.row == 'blank'){
            return <EmptySeat key={index}/>
        }

        return <SeatRow {...rowDetails} key={index}/>
    }
  return (
    <View style={styles.container}>
         <ScreenTypeAndPrice />
         {ticketSectionDetails.rows.map((row, index) => renderRow(row,index))}
    </View>
  )
}

export default SeatTypeAndRowsSection

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
    }
})