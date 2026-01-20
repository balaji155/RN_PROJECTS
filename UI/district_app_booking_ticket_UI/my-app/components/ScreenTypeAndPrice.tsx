import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ScreenTypeAndPrice = () => {
  return (
    <View style={styles.container}>
        <View style={styles.line}/>
        <Text style={styles.txt}>Gold:$220</Text>
        <View style={styles.line}/>
    </View>
  )
}

export default ScreenTypeAndPrice

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        flexDirection: 'row',
    },
    line: {
        width: 70,
        height: 1,
        backgroundColor: 'white',
        opacity: 0.5,
    },
    txt: {
        fontSize: 8,
        fontWeight: '700',
        color: 'white',
    }
})