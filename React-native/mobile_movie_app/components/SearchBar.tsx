import { icons } from '@/constants/icons';
import React from 'react';
import { Image, StyleSheet, TextInput, View } from 'react-native';

interface Props {
  onPress?: () => void;
  placeHolder: string;
  value?: string;
  onChangeText?: (text: string) => void
}

const SearchBar = ({onPress,placeHolder,value,onChangeText}: Props) => {
  return (
    <View style={styles.container}>
         <Image source={icons.search} className='size-5' tintColor="#AB8BFF"/>
         <TextInput 
            placeholder={placeHolder}
            style={styles.input}
            placeholderTextColor= "#A8B5DB"
            onChangeText={onChangeText}
            onPress={onPress}
            value={value}
         />
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F0D23',
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 16
  },
  input:{
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    fontWeight: "400",
    color: '#ffff'
  }
})