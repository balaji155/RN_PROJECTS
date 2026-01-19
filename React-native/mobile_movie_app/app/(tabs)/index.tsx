import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingMovieCard from "@/components/TrendingMovieCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";

export default function Index() {
  const router = useRouter()

  const { data: trendnngMovies,loading: trendingLoading,error: trendingError} = useFetch(getTrendingMovies)

  const {data: moviesData,loading:moviesLoading,error: moviesError} = useFetch(() => fetchMovies({
    query: ''
  }))

  return (
    <View
      className="flex-1 bg-primary"
    >
      <Image source={images.bg} className="absolute w-full z-0"/>
      <ScrollView className="flex-1 px-2" contentContainerStyle={{minHeight: '100%',paddingBottom: 10}} showsVerticalScrollIndicator={false}>
         <Image source={icons.logo} className="mt-20 mx-auto mb-5 w-12 h-10"/>
         {moviesLoading || trendingLoading ? 
           <ActivityIndicator 
             size={'large'}
             color={"#0000ff"}
             className="mt-10 self-center"
           /> : moviesError || trendingError ? <Text>Error: ${moviesError?.message || trendingError?.message}</Text> : 
           <View className="flex-1 mt-4 ">
           <SearchBar 
              onPress={() => router.push('/search')}
              placeHolder="Search through 300+ movies online"
           />
          {trendnngMovies &&trendnngMovies.length > 0 && 
          (<>
          <Text className="text-[18px] text-white font-bold mt-10 mb-4">Popular Movies</Text>
          <FlatList 
             data={trendnngMovies}
             renderItem={({item,index}) => <TrendingMovieCard movie={item} index={index}/>}
             keyExtractor={(item) => item.movie_id.toString()}
             horizontal
             showsHorizontalScrollIndicator={false}
             className="mb-4 mt-3 px-2"
             ItemSeparatorComponent={ () => <View className="w-5" />}
           />
          </>)}
          <Text className="text-[18px] text-white font-bold mt-14 mb-4">Latest Movies</Text>
          <FlatList 
             data={moviesData}
             renderItem={({item}) => (
                <MovieCard {...item}/>
             )}
             keyExtractor={(item) => item.id?.toString()}
             numColumns={3}
             scrollEnabled={false}
             className="pb-32"
             columnWrapperStyle= {{
                 alignItems: 'flex-start',
                 gap: 10,
                 margin: 5,
                 flexWrap: 'wrap'
             }}
          />
          </View>
        }
      </ScrollView>
    </View>
  );
}
