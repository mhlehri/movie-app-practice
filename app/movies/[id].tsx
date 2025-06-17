import { icons } from '@/constants/icons'
import { fetchMovieDetails } from '@/services/api'
import useFetch from '@/services/useFetch'
import { router, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { ActivityIndicator, Image, Pressable, ScrollView, Text, View } from 'react-native'

const Details = () => {
  const {id} = useLocalSearchParams( )
  const {data: movie, loading, error} = useFetch(() => fetchMovieDetails(id as string))
  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }
  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerClassName="pb-20">
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[550px] rounded-b"
            resizeMode="stretch"
          />
        </View>
        <View className="flex-col items-start justify-center px-5 mt-5">
          <Text className="text-white text-xl font-bold mb-2">
            {movie?.title}
          </Text>
          <Text className="text-[#A8B5DB] text-sm mb-2">
            {movie?.release_date.split("-")[0]} .{" "}
            {movie?.genres.map((genre) => genre.name).join(", ")} .{" "}
            {movie?.runtime
              ? `${Math.floor(movie?.runtime / 60)}h ${movie?.runtime % 60}m`
              : ""}
          </Text>
          <View className="px-2 py-1 bg-[#221F3D] rounded flex-row items-center justify-between">
            <Image source={icons.star} className="size-4" />
            <Text className="text-[#A8B5DB] text-xs font-bold ml-2">
              <Text className="text-white">
                {movie?.vote_average.toFixed(1)}
              </Text>{" "}
              / 10{" "}
              {movie?.popularity ? `(${movie?.popularity.toFixed(0)}k)` : ""}
            </Text>
          </View>
          {movie?.overview && (
            <View className="mt-5">
              <Text className="text-[#A8B5DB] font-medium text-sm mb-2">
                Overview
              </Text>
              <Text className="text-white text-sm">{movie?.overview}</Text>
            </View>
          )}
          {movie?.release_date && movie?.status && (
            <View className="mt-5 w-full">
              <View className="flex-row items-center justify-between">
                <Text className="text-[#A8B5DB] text-sm font-medium">
                  Release date{" "}
                </Text>
                <Text className="text-[#A8B5DB] text-sm font-medium ">
                  Status
                </Text>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-accent text-sm font-bold">
                  {movie?.release_date}
                </Text>
                <Text className="text-accent text-sm font-bold ">
                  {movie?.status}
                </Text>
              </View>
            </View>
          )}
          {movie?.genres && (
            <View className="mt-5">
              <Text className="text-[#A8B5DB] text-sm font-medium mb-2">
                Genres
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {movie?.genres.map((genre) => (
                  <View
                    key={genre.id}
                    className="px-3 py-1 bg-[#221F3D] rounded"
                  >
                    <Text className="text-white text-xs font-medium">
                      {genre.name}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
          {movie?.production_countries && (
            <View className="mt-5">
              <Text className="text-[#A8B5DB] text-sm font-medium mb-2">
                Countries
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {movie?.production_countries.map((country) => (
                  <View
                    key={country.iso_3166_1}
                    className="px-3 py-1 bg-[#221F3D] rounded"
                  >
                    <Text className="text-white text-xs font-medium">
                      {country.name}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
          {movie?.budget && movie?.revenue && (
            <View className="mt-5 flex-row gap-8">
              <View className="flex-col">
                <Text className="text-[#A8B5DB] text-sm font-medium">
                  Budget
                </Text>
                <Text className="text-accent text-sm font-medium">
                  ${movie?.budget.toLocaleString()}
                </Text>
              </View>
              <View className="flex-col">
                <Text className="text-[#A8B5DB] text-sm font-medium">
                  Revenue
                </Text>
                <Text className="text-accent text-sm font-medium">
                  ${movie?.revenue.toLocaleString()}
                </Text>
              </View>
            </View>
          )}
          {movie?.tagline && (
            <View className="mt-5">
              <Text className="text-[#A8B5DB] text-sm font-medium mb-2">
                Tagline
              </Text>
              <Text className="text-accent text-sm">{movie?.tagline}</Text>
            </View>
          )}
          {movie?.spoken_languages && (
            <View className="mt-5">
              <Text className="text-[#A8B5DB] text-sm font-medium mb-2">
                Spoken Languages
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {movie?.spoken_languages.map((language) => (
                  <View
                    key={language.iso_639_1}
                    className="px-3 py-1 bg-[#221F3D] rounded"
                  >
                    <Text className="text-white text-xs font-medium">
                      {language.name}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
          {movie?.production_companies && (
            <View className="mt-5">
              <Text className="text-[#A8B5DB] text-sm font-medium mb-2">
                Production Companies
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {movie?.production_companies.map((company) => (
                  <View
                    key={company.id}
                    className="px-3 py-1 bg-[#221F3D] rounded"
                  >
                    <Text className="text-white text-xs font-medium">
                      {company.name}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
          <Pressable
            onPress={() => router.back()}
            className="p-4 mt-5 w-full bg-[#AB8BFF] rounded-lg items-center justify-center flex-row gap-4"
          >
            <Text className="text-sm text-white">Go Back</Text>
            <Image
              source={icons.arrow}
              className="w-6 h-6 mb-1"
              tintColor="#fff"
            />
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

export default Details