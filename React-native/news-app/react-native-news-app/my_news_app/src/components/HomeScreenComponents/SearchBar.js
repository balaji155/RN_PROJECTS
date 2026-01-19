import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { colors } from '../../../constants/colors'
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const SearchBar = ({setSearchQuery}) => {
  return (
    <View style={styles.conatiner}>
        <MagnifyingGlassIcon size={hp(2.2)} color={colors.lightGrey} />
        <TextInput 
           placeholder='search news'
           placeholderTextColor={colors.lightGrey}
           style={styles.searchTxt}
           onChangeText={(txt) => setSearchQuery(txt)}
        />
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
    conatiner:{
        backgroundColor: '#E4E4E4',
        paddingHorizontal: 10,
        paddingVertical: 12,
        marginHorizontal: 10,
        marginVertical: 15,
        borderRadius:8,
        flexDirection: 'row',
        alignItems: 'center',
        gap:10
    },
    searchTxt:{
        flex: 1,
        fontSize: hp(1.7),
        color: colors.darkGrey
    }
})