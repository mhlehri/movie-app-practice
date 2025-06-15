import { icons } from '@/constants/icons'
import React from 'react'
import { Image, TextInput, View } from 'react-native'

type Props = {
  onPress?: () => void
  placeholder: string
  value?: string
  onChangeText?: (text: string) => void
}

const SearchBar = ({
    onPress,
    placeholder,
    value,
    onChangeText  
}: Props) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-3xl px-5 py-2 bg-[#0F0D23]">
      <Image
        source={icons.search}
        className="size-5 mr-3"
        resizeMode="contain"
        tintColor="#AB8BFF"
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#A8B5DB"
        className="flex-1 text-white"
      />
    </View>
  );
}

export default SearchBar