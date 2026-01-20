import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.backBtn}>{"<-"}</Text>
      <View style={styles.titleCon}>
         <Text style={styles.titleText}>Movie Title</Text>
         <Text style={styles.subText}>Movie Address</Text>
      </View>
      <Pressable style={styles.shareBtn}>
        <Text style={styles.shareTxt}>||</Text>
        <Text style={styles.shareTxt}>share</Text>
      </Pressable>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        height: 50,
        gap: 10,
        paddingHorizontal: 10,
    },
    backBtn:{
        fontSize: 18,
        color: 'white',
        alignSelf: 'center',
    },
    titleCon: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    titleText:{
        fontSize: 14,
        fontWeight: '700',
        color: 'white',
    },
    subText:{
        fontSize: 12,
        fontWeight: '700',
        color: '#818181',
    },
    shareBtn:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    shareTxt:{
        fontSize: 12,
        fontWeight: '700',
        color: '#8E8E93FF',
    },
})