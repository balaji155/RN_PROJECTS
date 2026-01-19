import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { Models } from 'react-native-appwrite'

interface FeauturedCardProps {
    item: Models.Document;
    onPress: () => void;
}

export const FeauturedCard = ({item,onPress}:FeauturedCardProps) => {
  return (
    <TouchableOpacity className="relative bg-black w-60 h-80 rounded-2xl my-4 mx-2" onPress={onPress}>
      <Image source={images.japan} className="w-full h-80 rounded-2xl" />
      <Image
        source={{uri: item.image}}
        className="absolute w-full h-80 rounded-2xl"
      />
      <View className="bg-white absolute top-3 right-3 px-2 flex flex-row justify-between py-2 rounded-2xl gap-1">
        <Image source={icons.star} className="size-4" />
        <Text className="text-xs font-semiBoldFont text-primary-300">{item.rating}</Text>
      </View>
      <View className="flex fle-col gap-3  px-4 absolute bottom-3 w-full">
        <Text className="text-white text-xl font-boldFont">{item.name}</Text>
        <Text className="text-white text-base font-regularFont">
           {item.address}
        </Text>
        <View className="flex flex-row justify-between items-center">
          <Text className="text-white text-xl font-boldFont">{item.price}</Text>
          <TouchableOpacity>
            <Image source={icons.heart} className="size-6" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const Card = ({ item,onPress}: FeauturedCardProps) => {
  return (
    <TouchableOpacity className="w-[47%] mt-4 px-3 py-4 mx-2 rounded-lg bg-white shadow-lg shadow-black-100/70 relative" onPress={onPress}>
      <View className="flex flex-row items-center absolute px-2 top-5 right-5 bg-white/90 p-1 rounded-full z-50">
        <Image source={icons.star} className="size-2.5" />
        <Text className="text-xs font-rubik-bold text-primary-300 ml-0.5">
          {item.rating}
        </Text>
      </View>

      <Image source={{uri: item.image}} className="w-full h-40 rounded-lg" />

      <View className="flex flex-col mt-2 gap-2">
        <Text className="text-base font-boldFont text-black-300">
          {item.name}
        </Text>
        <Text className="text-xs font-regularFont text-black-100">
          {item.address}
        </Text>
        <Text className="text-base font-boldFont text-primary-300">{item.price}</Text>
      </View>
      <TouchableOpacity className="absolute h-10 right-2 bottom-2 flex flex-col justify-center items-center">
        <Image source={icons.heart} className="w-6 h-6" tintColor="#191D31" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
