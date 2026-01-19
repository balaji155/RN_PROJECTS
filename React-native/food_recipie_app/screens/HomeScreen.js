import { View, Text, SafeAreaView, StyleSheet, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import Categories from '../components/Categories'
import axios from 'axios'
import Recipies from '../components/Recipies'


const HomeScreen = () => {

  const [catagories,setCategories] = useState([])
  const [activeCatagory,setActiveCatogery] = useState('')
  const [meals,setMeals] = useState([])
  useEffect(()=>{
    if(catagories && catagories?.length >0 ){
      setActiveCatogery(catagories[0]?.strCategory)
      getRescipies(catagories[0]?.strCategory)
    }
  },[catagories])

  useEffect(() =>{
    getCategories()
  },[])
  const getCategories = async () => {
      try{
        const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php')
        console.log(response,'response')
        if(response && response.data){
          setCategories(response.data.categories)
        }
      }catch(err){
        console.log(err,'error')
      }
  }
  const getRescipies = async (catagory) => {
    try{
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${catagory}`)
      console.log(response,'response')
      if(response && response.data){
        setMeals(response.data.meals)
      }
    }catch(err){
      console.log(err,'error')
    }
}

const handleCateogaryChange = (category) => {
    setActiveCatogery(category)
    getRescipies(category)
    setMeals([])
}
  return (
    <SafeAreaView style={styles.container}>
       <View style={styles.headerContainer}>
          <Image source={require('../assets/user.png')} style={{width: hp(5), height: hp(5) }}/>
          <BellIcon width={hp(5)} height={hp(4.5)} color={'grey'}/>
       </View>
       <View style={styles.headingsContainer}>
           <Text style={styles.name}>Hello Balaji!</Text>
           <Text style={styles.firstHeading}>Make your own food</Text>
           <Text style={styles.firstHeading}>Stay at <Text style={{color: 'rgb(251 191 36)'}}>Home</Text></Text>
       </View>
       <View style={styles.searchBarContainer}>
          <TextInput 
             placeholder='Search any recipe here'
             placeholderTextColor={'gray'}
             style={styles.searchTxt}
          />
          <View style={{backgroundColor: 'white',borderRadius: 9999,padding: 12}}>
             <MagnifyingGlassIcon color={'grey'} strokeWidth={3}/>
          </View>
         
       </View>
      <View>
         {catagories?.length > 0 && <Categories catagories={catagories}  activeCatagory={activeCatagory} handleCateogaryChange={handleCateogaryChange}/>}
      </View>
      <View>
         <Recipies catagories={catagories} meals={meals}/>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

export const styles = StyleSheet.create({
   container:{
     flex:1,
     backgroundColor: 'white',
   },
   headerContainer:{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: 10,
      marginBottom: 10
   },
   headingsContainer:{
    display: 'flex',
    gap: 10,
    marginHorizontal: 10,
    marginBottom: 10
   },
   name:{
     color: 'rgb(82 82 82)',
     fontSize: hp(1.8)
   },
   firstHeading:{
    color: 'rgb(82 82 82)',
    fontSize: hp(3.8),
    fontWeight: '600'
   },
   searchBarContainer:{
     display: 'flex',
     flexDirection: 'row',
     alignItems: 'center',
     marginHorizontal: 10,
     borderRadius: 9999,
     backgroundColor: 'rgba(0,0,0,0.05)',
     padding: 6,
     marginBottom: 10
   },
   searchTxt:{
     flex: 1,
     marginBottom: 4,
     paddingLeft: 12,
     fontSize: hp(1.7),
     letterSpacing: 0.8
   }
})