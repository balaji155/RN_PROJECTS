import { View, Text } from 'react-native'
import React, { useCallback, useState } from 'react'
import newsCategoryList from '../../constants/Categories'

const useCategories = () => {
    const [categories,setCategories] = useState(newsCategoryList)
    
    const toggleCategory = useCallback((id) => {
        console.log(id,'id')
        setCategories(prevCat => {
            const newCat = prevCat.map(cat => {
                if(cat.id === id){
                    return {
                        ...cat,
                        selected: !cat.selected,
                    }
                }
                return {...cat}
            })
            return newCat
        })
    },[])
  return {
     categories,
     toggleCategory
  }
}

export default useCategories