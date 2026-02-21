import CartButton from '@/components/CartButton'
import Filter from '@/components/Filter'
import MenuCard from '@/components/MenuCard'
import Searchbar from '@/components/SearchBar'
import { getCategories, getMenu } from '@/lib/appwrite'
import useAppwrite from '@/lib/useAppwrite'
import { MenuItem } from '@/type'
import cn from 'clsx'
import { useLocalSearchParams } from 'expo-router'
import { useEffect } from 'react'
import { FlatList, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Search = () => {
  const { category, query } = useLocalSearchParams<{
    query: string
    category: string
  }>()

  const { data, refetch, loading } = useAppwrite({
    fn: getMenu,
    params: { category, query, limit: 6 },
  })
  const { data: categories } = useAppwrite({ fn: getCategories })

  useEffect(() => {
    refetch({ category, query, limit: 6 })
  }, [category, query])

  return (
    <SafeAreaView className="flex-1 bg-bg-light">
      <FlatList
        data={data}
        renderItem={({ item, index }) => {
          const isEven = index % 2 === 0
          return (
            <View
              className={cn(
                'flex-1 max-w-[48%]',
                isEven ? 'mt-0' : 'mt-12',
              )}
            >
              <View className="bg-white rounded-[35px] p-4 border-2 border-primary/10 shadow-xl shadow-black/10">
                <MenuCard item={item as MenuItem} />
              </View>
            </View>
          )
        }}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        columnWrapperClassName="justify-between px-5"
        contentContainerClassName="pb-40"
        ListHeaderComponent={() => (
          <View className="pb-10">
            <View className="bg-primary rounded-b-[80px] px-6 pt-10 pb-16">
              <View className="flex-row justify-between items-start">
                <View className="flex-1 pr-5">
                  <Text className="text-white text-xs uppercase tracking-widest font-quicksand-semibold">
                    Food Explorer
                  </Text>
                  <Text className="text-white text-4xl font-quicksand-bold mt-2 leading-tight">
                    What are you craving today?
                  </Text>
                </View>
                <View className="bg-white rounded-full p-3 shadow-md shadow-black/20">
                  <CartButton />
                </View>
              </View>
            </View>

            <View className="px-5 -mt-10 gap-6">
              <View className="bg-white rounded-[30px] p-2 shadow-lg shadow-black/10">
                <Searchbar />
              </View>

              <View className="bg-white rounded-[30px] p-3 shadow-lg shadow-black/10">
                <Filter categories={categories!} />
              </View>

              <View className="flex-row items-center justify-between mt-2">
                <Text className="text-dark-100 text-lg font-quicksand-bold">
                  Popular Picks
                </Text>
                <View className="h-2 w-2 bg-primary rounded-full" />
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={() =>
          !loading && (
            <View className="items-center mt-24 px-10">
              <View className="bg-white border-2 border-primary/20 rounded-[40px] px-10 py-12 items-center shadow-lg shadow-black/10">
                <View className="w-12 h-12 bg-primary rounded-full mb-4" />
                <Text className="text-dark-100 text-xl font-quicksand-bold">
                  Nothing Here Yet
                </Text>
                <Text className="text-gray-100 text-sm font-quicksand-medium mt-2 text-center">
                  Try adjusting your search or explore other categories
                </Text>
              </View>
            </View>
          )
        }
      />
    </SafeAreaView>
  )
}

export default Search