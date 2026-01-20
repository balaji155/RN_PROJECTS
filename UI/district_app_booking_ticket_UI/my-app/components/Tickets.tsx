import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SeatRow from './SeatRow'
import ScreenTypeAndPrice from './ScreenTypeAndPrice'
import SeatTypeAndRowsSection from './SeatTypeAndRowsSection'
import { mock_data } from '@/mock-data/ticketsMockData'

const Tickets = () => {
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingHorizontal: 10,paddingBottom: 10}}>
       <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{display: 'flex',gap: 10,flexDirection: 'column'}}>
           {mock_data.tickets.map((ticketSection, index) => ( <SeatTypeAndRowsSection  {...ticketSection} key={index}/>))}
       </ScrollView>
    </ScrollView>
  )
}

export default Tickets

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})