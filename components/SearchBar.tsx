import { images } from '@/constants'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { Image, TextInput, TouchableOpacity, View, Platform } from 'react-native'

const Searchbar = () => {
  const params = useLocalSearchParams<{ query: string }>()
  const [query, setQuery] = useState(params.query || '');

  const handleSearch = (text: string) => {
    setQuery(text)
    if (!text) router.setParams({ query: undefined })
  }

  const handleSubmit = () => {
    if (query.trim()) router.setParams({ query })
  }

  return (
    <View
      className="flex-row items-center bg-white rounded-full px-4 py-2 border border-primary/10"
      style={
        Platform.OS === 'android'
          ? { elevation: 4 }
          : {
              shadowColor: '#000',
              shadowOpacity: 0.06,
              shadowRadius: 10,
              shadowOffset: { width: 0, height: 5 },
            }
      }
    >
      <Image
        source={images.search}
        className="w-5 h-5 mr-3"
        resizeMode="contain"
        tintColor="#878787"
      />

      <TextInput
        className="flex-1 py-3 text-dark-100 font-quicksand-medium"
        placeholder="Search for pizzas, burgers..."
        value={query}
        onChangeText={handleSearch}
        onSubmitEditing={handleSubmit}
        placeholderTextColor="#A0A0A0"
        returnKeyType="search"
      />

      {query.length > 0 && (
        <TouchableOpacity
          onPress={() => {
            setQuery('')
            router.setParams({ query: undefined })
          }}
          className="ml-2 bg-primary/10 px-3 py-1 rounded-full"
        >
          <Image
            source={images.close}
            className="w-4 h-4"
            resizeMode="contain"
            tintColor="#16A34A"
          />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default Searchbar