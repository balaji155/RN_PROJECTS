import { View, Text } from 'react-native'
import React, { useCallback, useState } from 'react'
import countriesList from '../../constants/countries'

const useCountries = () => {
    const [countries,setCountries] = useState(countriesList)
    
    const toggleCountries= useCallback((id) => {
        console.log(id,'id')
        setCountries(prevCat => {
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
     countries,
     toggleCountries
  }
}

export default useCountries