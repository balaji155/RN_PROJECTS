import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Slider from './Slider'
import Animated, { scrollTo, useAnimatedRef, useAnimatedScrollHandler, useDerivedValue, useSharedValue } from 'react-native-reanimated'
import Pagination from './Pagination'


const BreakingNews = ({breakingNews}) => {
    const scrollX = useSharedValue(0)
    const [paginationIndex,setPaginationIndex] = useState(0)
    const [breakingNewsData,setBreakingNewsData] = useState(breakingNews)
    const flatRef = useAnimatedRef()
    const offset = useSharedValue(0)
    const interval = useRef()
    const [isAutoPlayOn,setIsAutoPlayOn] = useState(true)
    const {width} = Dimensions.get('screen')
    useEffect(() => {
       if(isAutoPlayOn){
            interval.current = setInterval(() => {
            offset.value = offset.value+width
          },[2000])
       }else{
         clearInterval(interval.current)
       }
      return () => {
         clearInterval(interval.current)
      }
    },[offset,width,isAutoPlayOn])

    useDerivedValue(() =>{
      scrollTo(flatRef,offset.value,0,true)
    })

    const onScrollHandler = useAnimatedScrollHandler({
       onScroll : (e) => {
          console.log(e.contentOffset.x,'contentOffset')
          scrollX.value = e.contentOffset.x
       },
       onMomentumEnd: (e) => {
         offset.value = e.contentOffset.x
       }
    })

    const onViewableItemsChanged = ({viewableItems}) => {
       if(viewableItems[0].index !== undefined && viewableItems[0].index !== null){
          setPaginationIndex(viewableItems[0]?.index % breakingNews.length)
       }
    }

    const viewabilityConfig = {
      itemVisiblePercentThreshold: 50
    }

    const viewabilityConfigCallbackPairs = useRef([{
      viewabilityConfig, onViewableItemsChanged
    }])

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Breaking News</Text>
      <Animated.FlatList 
       ref={flatRef}
       data={breakingNewsData} 
       renderItem={({item,index}) => (<Slider news={item} index={index} scrollX={scrollX}/>)}
       horizontal={true}
       showsHorizontalScrollIndicator={false}
       pagingEnabled={true}
       onScroll={onScrollHandler}
       scrollEventThrottle={16}
       contentContainerStyle={{
        paddingHorizontal: 0, // No extra padding
      }}
      viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      onEndReached={() => setBreakingNewsData([...breakingNewsData,...breakingNews])}
      onScrollBeginDrag={() => setIsAutoPlayOn(false)}
      onScrollEndDrag={() => setIsAutoPlayOn(true)}
    
      />
      <Pagination breakingNews={breakingNews} scrollX={scrollX} paginationIndex={paginationIndex}/>
    </View>
  )
}

export default BreakingNews

const styles = StyleSheet.create({
    container: {
        // paddingHorizontal: 10,
        gap: 10,
    },
    heading:{
        fontSize: 16,
        fontWeight: 600,
        letterSpacing: 0.5,
        marginLeft: 10
    }
})