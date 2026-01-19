import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchBar from '../components/HomeScreenComponents/SearchBar'
import { colors } from '../../constants/colors'
import CheckBox from '../components/CategoriesComp/CheckBox'
import useCategories from '../hooks/useCategories'
import useCountries from '../hooks/useCountries'
import { useNavigation } from '@react-navigation/native'
import { ROUTES } from '../../Routes/RouteNames'

const Categories = () => {
  const {categories,toggleCategory} = useCategories()
  const { countries, toggleCountries} = useCountries()
  const [searchQuery,setSearchQuery] = useState('')
  const [country,setCountry] = useState('')
  const [category,setCategory] = useState('')
  const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.container}>
       <SearchBar setSearchQuery={setSearchQuery}/>
        <Text style={styles.heading}>Categories</Text>
        <View style={styles.tagsConatainer}>
       {categories.map((item,index)=>{
          return(
            <CheckBox label={item.title} isChecked={item.selected} onPress={() => {
              toggleCategory(item.id)
              setCategory(item.slug)
            }} key={index}/>
          )
       })}
       </View>
       <Text style={styles.heading}>Countries</Text>
        <View style={styles.tagsConatainer}>
       {countries.map((item,index)=>{
          return(
            <CheckBox label={item.title} isChecked={item.selected} onPress={() => {
              toggleCountries(item.id)
              setCountry(item.code)
            }} key={index}/>
          )
       })}
       </View>
       <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate(ROUTES.SEARCHRESULTPAGE,{query: searchQuery,category,country})}>
         <Text style={styles.btnTxt}>Search</Text>
       </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Categories

const styles = StyleSheet.create({
  container:{
     flex: 1,
     backgroundColor: colors.white
  },
  heading:{
    fontSize: 16,
    fontWeight: 600,
    letterSpacing: 0.5,
    marginLeft: 10
},
tagsConatainer:{
  paddingHorizontal:10,
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 15,
  marginTop:10,
  marginBottom: 15
},
btn:{
  alignItems: 'center',
  padding: 15,
  backgroundColor: colors.tint,
  marginHorizontal: 10,
  borderRadius: 8,
  marginVertical: 8
},
btnTxt:{
  fontSize:16,
  color: colors.white,
  fontWeight: '600'
}
})