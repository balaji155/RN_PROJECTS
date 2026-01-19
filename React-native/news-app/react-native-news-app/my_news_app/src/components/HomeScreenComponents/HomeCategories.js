import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { colors } from '../../../constants/colors'
import newsCategoryList from '../../../constants/Categories'

const HomeCategories = ({onCategorySelected}) => {
  const scrollRef = useRef()
  const buttonRef = useRef([])
  const [activeIndex,setActiveIndex] = useState(0)
  const handleCategoriesHandler = (index) => {
     const selected = buttonRef.current[index]
     setActiveIndex(index)
     selected?.measure((x)=>{
        scrollRef.current?.scrollTo({x: x-20,y: 0,animated: true})
     })

    onCategorySelected(newsCategoryList[index].slug)
  }
  return (
    <View>
      <Text style={styles.heading}>Trending Right Now</Text>
      <ScrollView  ref={scrollRef} horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
         {newsCategoryList.map((cat,index)=>{
            return(
                <TouchableOpacity
                  key={index}
                  ref={ (el) => (buttonRef.current[index] = el)}
                  style={[styles.buttton,activeIndex===index && styles.activeBtn]}
                  onPress={() => handleCategoriesHandler(index)}
                >
                    <Text style={[styles.buttonTxt,activeIndex===index && styles.activeBtnTxt]}>{cat.title}</Text>
                </TouchableOpacity>
            )
         })}
      </ScrollView>
    </View>
  )
}

export default HomeCategories

const styles = StyleSheet.create({
    heading:{
        fontSize: 16,
        fontWeight: 600,
        letterSpacing: 0.5,
        marginLeft: 10,
        color: colors.black
    },
    container:{
        paddingHorizontal: 10,
        paddingVertical: 15,
        gap: 15
    },
    buttton:{
        borderWidth: 1,
        borderColor: colors.darkGrey,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 8
    },
    activeBtn:{
        backgroundColor: colors.tint,
        borderColor: colors.tint
    },
    buttonTxt:{
        color: colors.lightGrey,
        fontSize: 12,
        fontWeight: '600',
        letterSpacing:1
    },
    activeBtnTxt:{
        color: colors.white,
        fontSize: 12,
        fontWeight: '600',
        letterSpacing:1
    }
})