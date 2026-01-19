import { Card } from "@/components/cards/Cards";
import FeautureGrid from "@/components/grids/FeautureGrid";
import RecommendationsGrid from "@/components/grids/RecommendationsGrid";
import Header from "@/components/Header/Header";
import GridNoResult from "@/components/NoResults/GridNoResult";
import SearchBar from "@/components/Search/SearchBar";
import { getProperties } from "@/services/appwrite";
import { useAppwrite } from "@/services/hooks/useAppwrite";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import {  ActivityIndicator, FlatList, KeyboardAvoidingView, Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
   const { top } = useSafeAreaInsets()
   const params = useLocalSearchParams<{query: string | undefined ,filter?: string}>()
   const { data: properties,loading: propertiesLoading,refetch}  = useAppwrite({
     fn: getProperties,
     params: {
       query: params.query || '',
       filter: params.filter || '',
       limit: 6
     },
     skip: true
   })

   useEffect(() => {
      refetch({
        query: params.query || '',
        filter: params.filter || '',
        limit: 6
      })
   },[params.query,params.filter])

  const handleOnpress = (id: string) => router.push(`/property/${id}`)

  return (
    <KeyboardAvoidingView
    style={{ paddingTop: top }}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    className="flex-1 px-4"
  >
         <FlatList 
            data={properties}
            renderItem={({item}) => <Card item={item} onPress={() => handleOnpress(item.$id)}/>}
            keyExtractor={(item) => item.$id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
               propertiesLoading ? <ActivityIndicator size={"large"} className="mt-10 text-primary-300"/> : <GridNoResult />
            }
            ListHeaderComponent={() => (
              <>
                    <Header />
                    <SearchBar />
                    <FeautureGrid />
                    <RecommendationsGrid />
              </>
            )}
            columnWrapperStyle={{
               paddingBottom: 20
            }}
            className=""
         />
    </KeyboardAvoidingView>
  );
}
