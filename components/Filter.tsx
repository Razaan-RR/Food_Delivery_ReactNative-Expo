import { Category } from '@/type'
import cn from 'clsx'
import { router, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { FlatList, Platform, Text, TouchableOpacity, View } from 'react-native'

const Filter = ({ categories }: { categories: Category[] }) => {
  const searchParams = useLocalSearchParams()
  const [active, setActive] = useState(searchParams.category || '')

  const handlePress = (id: string) => {
    setActive(id)

    if (id === 'all') router.setParams({ category: undefined })
    else router.setParams({ category: id })
  }

  const filterData: (Category | { $id: string; name: string })[] = categories
    ? [{ $id: 'all', name: 'All' }, ...categories]
    : [{ $id: 'all', name: 'All' }]

  return (
    <FlatList
      data={filterData}
      keyExtractor={(item) => item.$id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-x-3 pb-2"
      renderItem={({ item }) => {
        const isActive = active === item.$id

        return (
          <TouchableOpacity
            onPress={() => handlePress(item.$id)}
            className={cn(
              'px-5 py-2.5 rounded-full border',
              isActive
                ? 'bg-primary border-primary'
                : 'bg-white border-primary/20'
            )}
            style={
              Platform.OS === 'android'
                ? { elevation: isActive ? 6 : 3 }
                : {
                    shadowColor: '#000',
                    shadowOpacity: 0.08,
                    shadowRadius: 8,
                    shadowOffset: { width: 0, height: 4 },
                  }
            }
          >
            <View className="flex-row items-center gap-x-2">
              {isActive && (
                <View className="w-2 h-2 bg-white rounded-full" />
              )}
              <Text
                className={cn(
                  'font-quicksand-semibold text-sm',
                  isActive ? 'text-white' : 'text-dark-100'
                )}
              >
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        )
      }}
    />
  )
}

export default Filter