import { View, Text, ActivityIndicator, ScrollView, Image, Dimensions, ImageSourcePropType, TouchableOpacity } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useAppwrite } from '@/services/hooks/useAppwrite'
import { getPropertyByID } from '@/services/appwrite'
import images from '@/constants/images'
import icons from '@/constants/icons'
import { colors } from '@/constants/colors'
import FilterModal from '@/components/Filter/FilterModal'

export default function Property(){
    const { id } = useLocalSearchParams<{id: string}>()
    const { height } = Dimensions.get('window')
    const { data: property,loading} = useAppwrite({
      fn: getPropertyByID,
      params: {
        id
      }
    })
    if(loading) return <ActivityIndicator size={"large"} className="flex-1 justify-center items-center text-primary-300"/>
 

  const FaclityItem = ({image,text}: {image: ImageSourcePropType,text: string}) => {
      return (
        <View className='flex flex-row items-center  justify-between gap-2'>
            <View className='flex flex-col items-center justify-center rounded-full bg-primary-200 p-2'>
               <Image source={image} className='size-6'/>
            </View>
            <Text className='text-[16px] font-semiBoldFont text-dark-300'>{text}</Text>
        </View>
      )
  }

  const Section = ({headerTxt,childern}: {headerTxt: string,childern: React.ReactNode}) => {
     return (
        <View className='flex flex-col gap-4 mb-4'>
            <Text className='text-xl font-boldFont text-dark-300'>{headerTxt}</Text>
            {childern}
        </View>
     )
  }

  const Facilites = [
      {id: 1,image: icons.carPark,title: 'Car Parking'},
      {id: 2,image: icons.swim,title: 'Swimming Pool'},
      {id: 3,image: icons.dumbell,title: 'Gym & Fitness'},
      {id: 4,image: icons.cutlery,title: 'Resturant'},
      {id: 5,image: icons.wifi,title: 'Wifi & Network'},
      {id: 6,image: icons.dog,title: 'Pet Center'},
      {id: 7,image: icons.run,title: 'Sport Center'},
      {id: 8,image: icons.laundry,title: 'Laundry'},
  ]

  const FaciltyCard = ({image,title}: {image: ImageSourcePropType,title: string}) => {
      return (
        <View className='flex flex-col items-center gap-2 w-1/4 aspect-square p-2'>
            <View className='flex flex-col items-center justify-center rounded-full bg-primary-200 p-2'>
               <Image source={image} className='size-6'/>
            </View>
            <Text className='text-[14px] font-regularFont text-dark-300'>{title.length > 10 ? title.slice(0,8) + '...': title}</Text>
        </View>
      )
  }

  const ReviewCard = ({image,name,review,likes,date}: {image?: ImageSourcePropType,name: string,review: string,likes: number,date: string}) => {
    return (
      <View className='flex flex-col gap-3'>
         <View className='flex flex-row items-center gap-2'>
             <Image source={images.avatar} className='size-10 rounded-full' resizeMode='cover'/>
             <Text className='text-base font-semiBoldFont text-dark-300'>{name}</Text>
         </View>
         <Text className='text-base font-regularFont text-dark-200'>{review}</Text>
         <View className='flex flex-row justify-between items-center'>
             <View className='flex flex-row items-center gap-2'>
                 <Image source={icons.heart} className='size-3' />
                 <Text className='text-[14px] font-semiBoldFont text-dark-300'>{likes}</Text>
             </View>
             <Text className='text-[14px] font-regularFont text-dark-100'>{date}</Text>
         </View>
      </View>
    )
  }
  return (
       <View>
           <ScrollView contentContainerClassName='pb-32'>
             <View className='relative'>
               <Image source={{uri: property?.image}} style={{height: height * 0.4,width: '100%'}} resizeMode='stretch'/>
               <View className='absolute flex flex-row justify-between items-center mx-4 top-12 right-0 left-0'>
                    <Image source={icons.backArrow} className='size-6' tintColor={colors.dark}/>
                    <View className='flex flex-row items-center gap-4'>
                        <Image source={icons.heart} className='size-6' tintColor={colors.dark}/>
                        <Image source={icons.send} className='size-6' tintColor={colors.dark}/>
                    </View>
               </View>
             </View>
             <View className='px-4'>
                 <View className='w-[90%] flex flex-col gap-4 my-4'>
                 <Text className='text-2xl font-boldFont text-dark-300'>{property?.name}</Text>
                  <View className='flex flex-row gap-5'>
                      <Text className='p-2 bg-primary-200 text-primary-300 text-[14px] font-semiBoldFont rounded-full'>{property?.type}</Text>
                      <View className='flex flex-row items-center gap-2'>
                          <Image source={icons.star}/>
                          <Text className='text-[14px] font-regularFont text-dark-200'>{property?.rating} (1,275 reviews)</Text>
                      </View>
                  </View>
                  <View className='flex flex-row justify-between items-center gap-2'>
                       <FaclityItem image={icons.bed} text={`${property?.bedrooms} ${property?.bedrooms > 1 ? 'Beds' : 'Bed'}`}/>
                       <FaclityItem image={icons.bath} text={`${property?.bathrooms} ${property?.bathrooms > 1 ? 'Baths' : 'Bath'}`}/>
                       <FaclityItem image={icons.area} text={`${property?.area} sqft`}/>
                  </View>
                 </View>
                 <View className='w-full border-[0.5px] border-primary-200 my-2'></View>
                 <Section headerTxt='Agent'
                   childern={
                      <View className='flex flex-row justify-between items-center'>
                            <View className='flex flex-row justify-between items-center gap-4'>
                              <Image source={images.avatar} className='size-16 rounded-full'/>
                              <View className='flex flex-col gap-2'>
                                 <Text className='text-lg  font-semiBoldFont text-dark-300'>Agent Name</Text>
                                 <Text className='text-[14px]  font-semiBoldFont text-dark-200'>Owner</Text>
                              </View>
                              </View>
                              <View className='flex flex-row justify-between items-center gap-4'>
                                <Image source={icons.chat} className='size-6'/>
                                <Image source={icons.phone} className='size-6'/>
                              </View>
                      </View>
                   }
                 />
                 <Section 
                    headerTxt='Overview'
                    childern={
                       <Text className='text-base font-regularFont text-dark-200'>
                          {property?.description}
                       </Text>
                    }
                 />
                  <Section 
                    headerTxt='Facilities'
                    childern={
                      <View className='flex flex-row flex-wrap'>
                          {Facilites.map((item) => <FaciltyCard key={item.id} {...item}/>)}
                      </View>
                    }
                 />
                  <Section 
                    headerTxt='Location'
                    childern={
                      <View className='flex flex-col gap-2'>
                          <View className='flex flex-row items-center gap-2'>
                             <Image source={icons.location} className='size-4'/>
                             <Text className='text-[14px] font-mediumFont text-dark-200'>{property?.address}</Text>
                          </View>
                          <Image source={images.map} style={{height: height * 0.2,width: '100%'}}/>
                      </View>
                    }
                 />
                 <View className='flex flex-row justify-between items-center mb-3'>
                    <View className='flex flex-row justify-between items-center'>
                         <Image source={icons.star} className='size-6'/>
                         <Text className='text-xl font-boldFont text-dark-300'>4.8 (1,275 reviews)</Text>
                    </View>
                    <Text className='text-base font-semiBoldFont text-primary-300'>See All</Text>
                 </View>
                 <ReviewCard name='Balaji' date='6 days ago' likes={600} review="The apartment is very clean and modern. I really like the interior design. Looks like I'll feel at home 😍" />
             </View>
          </ScrollView>
          <View className='absolute bottom-0 right-0 left-0 w-full bg-white flex flex-row px-4 pb-4 pt-8 border border-primary-200 rounded-t-[36px] justify-between items-center'>
             <View className='w-1/3 flex flex-col gap-2'>
                 <Text className='text-xs font-semiBoldFont text-dark-200 tracking-wide uppercase'>Price</Text>
                 <Text className='text-2xl font-boldFont text-primary-300'>${property?.price}</Text>
             </View>
             <TouchableOpacity className='flex flex-row justify-center items-center rounded-full bg-primary-300 p-4 w-[60%]'>
                    <Text className='text-base font-semiBoldFont text-white'>Booking Now</Text>
             </TouchableOpacity>
          </View>
          <FilterModal />
       </View>
  )
}

