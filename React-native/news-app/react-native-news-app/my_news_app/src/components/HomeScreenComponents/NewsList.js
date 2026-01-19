import { Image, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { colors } from '../../../constants/colors'
import Loader from '../../screens/Loader'
import { useNavigation } from '@react-navigation/native'
import { ROUTES } from '../../../Routes/RouteNames'

const NewsList = ({newsList}) => {
  return (
    <View style={styles.container}>
      {newsList && newsList?.length ===0 ? <Loader size={'large'}/>:
       newsList.map((news,index) => {
          return(
             <NewsItem news={news} index={index}/>
          )
       })}
    </View>
  )
}

export default NewsList

export const NewsItem = ({news,index}) => {
  const navigation = useNavigation()
  return(
    <TouchableWithoutFeedback onPress={() => navigation.navigate(ROUTES.NEWSDETAILSSCREEN,{news : news})} key={index}>
    <View key={index} style={styles.newsContainer}>
       <Image source={{uri : news?.image_url}} style={styles.image} resizeMode='stretch'/>
       <View style={styles.detailsContainer}>
         {news?.category?.length >0 && <Text style={styles.categoryName}>{news?.category[0]}</Text>}
         <Text style={styles.title}>{news.title}</Text>
         <View style={styles.source}>
            <Image source={{uri : news?.source_icon}} style={styles.sourceImg}/>
            <Text style={styles.sourceTxt}>{news?.source_name}</Text>
         </View>
       </View>
    </View>
    </TouchableWithoutFeedback> 
  )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20
    },
    image:{
        width: 120,
        height: 100,
        borderRadius: 10
    },
    newsContainer:{
       display: 'flex',
       flexDirection: 'row',
       marginVertical: 10,
       gap: 10,
       alignItems: 'center'
    },
    detailsContainer:{
      justifyContent: 'space-between',
      gap: 10,
      flex: 1
    },
    categoryName:{
       color: colors.darkGrey,
       fontSize: 12,
       fontWeight: '600',
       textTransform: 'capitalize'
    },
    title:{
        color: colors.black,
       fontSize: 12,
       fontWeight: '400'  
    },
    source:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap:10
    },
    sourceImg:{
        width: 20,
        height: 20,
        borderRadius: 20
    },
    sourceTxt:{
        color: colors.darkGrey,
        fontSize: 10,
        fontWeight: '400',
        textTransform: 'capitalize'
    }
})