import MovieCard from '@/components/MovieCard'
import SearchBar from '@/components/SearchBar'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { fetchMovies } from '@/services/api'
import { updateSearchCount } from '@/services/appwrite'
import useFetch from '@/services/useFetch'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native'

export default function Search () {

  const [searchQuery, setSearchQuery] = useState<string>("")

  const {
    data: movies,
    loading,
    error,
    refetch: fetchMoviesData,
    reset
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  useEffect(()=>{
    const timeoutId = setTimeout(async () => {
      if( searchQuery.trim()) {
        await fetchMoviesData();
    } else {
      reset();
    }
  }, 500)

    return () => clearTimeout(timeoutId);

  }, [searchQuery])

  useEffect(() => {
    if (searchQuery.trim() && movies?.length > 0) {
        updateSearchCount(searchQuery, movies[0]);
    }
  }, [movies]);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute flex-1 w-full z-0"
        resizeMode="cover"
      />
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperClassName="justify-center gap-4 my-4"
        contentContainerClassName="pb-32"
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>
            <View className="my-5">
              <SearchBar
                placeholder="Search movies..."
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>

            {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}
            {error && (
              <Text className="text-red-500 px-5 my-3">
                Error: {error.message}
              </Text>
            )}
            {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
              <Text className="text-white text-xl font-bold mt-5 mb-3">
                Search Results for{" "}
                <Text className="text-[#D1C0FF] ">{searchQuery}</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !loading && !error && searchQuery.trim() ? (
            <Text className="text-accent text-center mt-5">
                  No results found
            </Text>
          ) : null
        }
      />
    </View>
  );
}
