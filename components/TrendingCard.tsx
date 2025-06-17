import { images } from '@/constants/images';
import MaskedView from '@react-native-masked-view/masked-view';
import { Link } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export default function TrendingCard({
  movie_id,
  title, 
  poster_url,
  index
}: { movie_id: number; title: string; poster_url: string; index: number }) {
  return (
    <Link href={`/movies/${movie_id}`} asChild>
      <TouchableOpacity className="w-32 relative pl-5">
        <Image
          source={{ uri: poster_url }}
          className="w-full h-40 rounded-lg"
          resizeMode="cover"
        />
        <View className="absolute bottom-9 -left-3 px-2">
          <MaskedView
            maskElement={
                <Text className="font-bold text-white text-6xl">
                  {index + 1}
                </Text>
            }
          >
            <Image
              source={images.rankingGradient}
              className="size-14"
              resizeMode="cover"
            />
          </MaskedView>
        </View>
        <Text className="font-bold text-white mt-2 text-sm" numberOfLines={1}>{title}</Text>
      </TouchableOpacity>
    </Link>
  );
}