import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const MovieDateAndTimings = () => {
  return (
    <View style={styles.container}>
        <View style={styles.coumnFlex}>
            <Text style={styles.dayTxt}>Mon</Text>
            <Text style={styles.dateTxt}>24 Jan</Text>
        </View>
        <View style={[styles.coumnFlex,styles.timimgCon]}>
            <Text style={styles.timingTxt}>{'09: 40 PM'}</Text>
            <Text style={styles.screenName}>Screen 1</Text>
        </View>
    </View>
  )
}

export default MovieDateAndTimings

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 20,
        marginVertical: 15,
        marginHorizontal: 10,
    },
    coumnFlex: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 5
    },
    dayTxt: {
        fontSize: 12,
        fontWeight: '400',
        color: "#818181"
    },
    dateTxt: {
        fontSize: 14,
        fontWeight: '700',
        color: "white"
    },
    timimgCon:{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 7,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderRadius: 12,
        borderColor: 'white',
        backgroundColor: '#1E1E1EFF',
    },
    timingTxt: {
        fontSize: 14,
        fontWeight: '700',
        color: "white",
    },
    screenName: {
        fontSize: 12,
        fontWeight: '400',
        color: "#818181"
    }
})