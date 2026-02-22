import { LinearGradient } from 'expo-linear-gradient'
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import CartButton from '@/components/CartButton'
import { images, offers } from '@/constants'
import useAuthStore from '@/store/auth.store'
import DeliverTo from '@/components/DeliverTo'

export default function Index() {
  const { user } = useAuthStore()
  return (
    <SafeAreaView className="flex-1 bg-bg-light">
      <FlatList
        data={offers}
        keyExtractor={(item) => item.id.toString()}
        contentContainerClassName="pb-28 px-5"
        renderItem={({ item, index }) => {
          const isEven = index % 2 === 0
          return (
            <Pressable android_ripple={{ color: '#ffffff22' }} className="mb-6">
              <LinearGradient
                colors={item.gradient as [string, string]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  borderRadius: 24,
                  flexDirection: 'row',
                  padding: 20,
                  minHeight: 180,
                }}
              >
                {isEven ? (
                  <>
                    <View className="w-1/2 justify-center items-start pr-3">
                      <Image
                        source={item.image}
                        className="w-full h-full"
                        style={{ maxHeight: '100%', flex: 1 }}
                        resizeMode="contain"
                      />
                    </View>
                    <View className="w-1/2 justify-center items-end pl-3">
                      <Text className="text-4xl font-quicksand-bold text-white mb-2 text-right">
                        {item.title}
                      </Text>
                      <TouchableOpacity className="bg-white/30 px-5 py-2 rounded-full">
                        <Text className="text-lg font-quicksand-bold text-white">
                          Order Now
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                ) : (
                  <>
                    <View className="w-1/2 justify-center items-start pr-3">
                      <Text className="text-4xl font-quicksand-bold text-white mb-2 text-left">
                        {item.title}
                      </Text>
                      <TouchableOpacity className="bg-white/30 px-5 py-2 rounded-full">
                        <Text className="text-lg font-quicksand-bold text-white">
                          Order Now
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View className="w-1/2 justify-center items-end pl-3">
                      <Image
                        source={item.image}
                        className="w-full h-full"
                        style={{ maxHeight: '100%', flex: 1 }}
                        resizeMode="contain"
                      />
                    </View>
                  </>
                )}
              </LinearGradient>
            </Pressable>
          )
        }}
        ListHeaderComponent={() => (
          <View className="flex-between flex-row w-full my-5">
            <DeliverTo />
            <CartButton />
          </View>
        )}
      />
    </SafeAreaView>
  )
}