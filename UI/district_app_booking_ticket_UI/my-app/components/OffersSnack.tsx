import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const OffersSnack = () => {
  return (
    <View style={styles.container}>
       <Text style={styles.giftText}>Gifts</Text>
       <View style={styles.middleCon}>
           <Text style={styles.middleFirstTxt}>Get free snack voucher</Text>
           <Text style={styles.middleSecondTxt}>Add min 2 ticket worth $150 to unlock</Text>
       </View>
       <View style={styles.lastCon}>
          <Text style={styles.lastText}>24 offers</Text>
          <Text style={[styles.lastText,{color: '#8E8E93FF'}]}>{'>'}</Text>
       </View>
    </View>
  )
}

export default OffersSnack

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1C1C1E',
        borderTopEndRadius: 15,
        borderTopStartRadius: 15,
    },
    giftText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#00CFFF',
        marginLeft: 10,
    },
    middleCon:{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
    },
    middleFirstTxt: {
        fontSize: 12,
        fontWeight: '700',
        color: 'white',
    },
    middleSecondTxt: {
        fontSize: 10,
        fontWeight: '700',
        color: '#8E8E93FF',
    },
    lastCon:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        flexDirection: 'row',
        gap: 6,
    },
    lastText:{
        fontSize: 14,
        fontWeight: '700',
        color: 'white',
    }
})