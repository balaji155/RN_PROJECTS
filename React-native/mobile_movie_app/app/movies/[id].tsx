import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from "react-native";
const screenHeight = Dimensions.get("window").height;

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id as string)
  );
  const releaseYear = new Date(movie?.release_date || '')
  const durationHrs = (movie?.runtime || 0) / 60
  const durationMin = (movie?.runtime || 0) % 60
  const duration = `${Math.floor(durationHrs)}h ${durationMin}m`

  return (
    <View className="bg-primary flex-1 pb-10">
      <StatusBar hidden={false} />
      {loading && (
        <ActivityIndicator
          size={"large"}
          className="flex-1 justify-center items-center"
          color="#AB8BFF"
        />
      )}
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            style={{ width: "100%", height: screenHeight * 0.5 }}
            resizeMode="stretch"
          />
        </View>
        <View className="px-2">
            <Text className="text-xl text-white font-bold my-3">{movie?.title}</Text>
            <Text className="text-[14px] color-[#A8B5DB] font-[400]">{`${releaseYear.getFullYear()} . PG-13 . ${duration}`}</Text>
            <View className="flex-row items-center my-3">
                <View className="flex-row justify-between items-center bg-dark-100 px-4 py-2 rounded-lg gap-2">
                      <Image source={icons.star} className="size-4"/>
                      <Text className="text-xs text-white font-semibold">{movie?.vote_average}<Text className="text-light-200">/10 ({movie?.vote_count})</Text></Text>
                </View>
            </View>
            <Text className="text-light-200 text-xs font-[400]">Overview</Text>
            <Text className="text-[14px] text-white font-[400] my-2">{movie?.overview}</Text>
            <View className="flex-row justify-between items-center w-[80%] my-3">
            <View className="flex-col gap-2">
                <Text className="text-light-200 text-xs font-[400]">Release date</Text>
                <Text className="text-light-100 text-[14px] font-semibold">{releaseYear.toLocaleDateString('en-US',{
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}</Text>
            </View>
            <View className="flex-col gap-2">
                <Text className="text-light-200 text-xs font-[400]">Status</Text>
                <Text className="text-light-100 text-[14px] font-semibold">{movie?.status}</Text>
            </View>
            </View>
            {movie?.genres?.length  && <>
            <Text className="text-light-200 text-xs font-[400]">Generes</Text>
            <View className="flex-row flex-wrap gap-2 items-center my-2">
              {movie.genres.map((genre, index) => (
                  <View className="bg-dark-100 px-3 py-1" key={genre.id}>
                       <Text className="text-xs text-white font-semibold text-center">{genre.name}</Text>
                  </View>   
              ))}
            </View>
            </>}
            {movie?.production_countries.length && <>
              <Text className="text-light-200 text-xs font-[400]">Countries</Text>
              <View className="flex-row flex-wrap gap-2 items-center my-2">
                 {movie.production_countries.map((country, index) => (
                      <Text className="font-[14px] text-light-100">{country.name}</Text>
                 ))}
              </View>
            </>}
            <View className="flex-row justify-between items-center w-[60%] my-3">
            {movie?.budget && <View className="flex-col gap-2">
                <Text className="text-light-200 text-xs font-[400]">Budget</Text>
                <Text className="text-light-100 text-[14px] font-semibold">{movie.budget}</Text>
            </View>}
            {movie?.revenue && <View className="flex-col gap-2">
                <Text className="text-light-200 text-xs font-[400]">Revenue</Text>
                <Text className="text-light-100 text-[14px] font-semibold">{movie.revenue}</Text>
            </View>}
            </View>
            {!!movie?.tagline && <>
              <Text className="text-light-200 text-xs font-[400]">Tagline</Text>
              <Text className="font-[14px] text-light-100 my-2">{movie.tagline}</Text>
              </>
            }
            {movie?.production_companies.length && <>
              <Text className="text-light-200 text-xs font-[400]">Countries</Text>
              <View className="flex-row flex-wrap gap-2 items-center my-2">
                 {movie.production_companies.map((company, index) => (
                      <Text className="font-[14px] text-light-100">{company.name}</Text>
                 ))}
              </View>
            </>}
        </View>
      </ScrollView>
      <TouchableOpacity className="absolute flex-row justify-center items-center bg-accent bottom-8 left-0 right-0 mx-5 rounded-lg py-3.5 z-50"
        onPress={() => router.back()}
       >
            <Text className="text-sm font-semibold text-[#121212]">Go To HomePage</Text>
            <Image source={icons.arrow} className="size-4  mx-1" tintColor={"#121212"}/>
        </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;
