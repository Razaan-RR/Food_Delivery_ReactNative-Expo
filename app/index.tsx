import cn from 'clsx'
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

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-bg-light">
      <FlatList
        data={offers}
        keyExtractor={(item) => item.id.toString()}
        contentContainerClassName="pb-28 px-5"
        renderItem={({ item, index }) => {
          const isEven = index % 2 === 0

          return (
            <Pressable android_ripple={{ color: '#ffffff22' }} className="mb-5">
              <LinearGradient
                colors={item.gradient as [string, string]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className={cn(
                  'offer-card',
                  isEven ? 'flex-row-reverse' : 'flex-row',
                )}
              >
                <View className="h-full w-1/2">
                  <Image
                    source={item.image}
                    className="size-full"
                    resizeMode="contain"
                  />
                </View>

                <View
                  className={cn('offer-card__info', isEven ? 'pl-10' : 'pr-10')}
                >
                  <Text className="h1-bold text-white leading-tight">
                    {item.title}
                  </Text>

                  <Image
                    source={images.arrowRight}
                    className="size-10"
                    resizeMode="contain"
                    tintColor="#ffffff"
                  />
                </View>
              </LinearGradient>
            </Pressable>
          )
        }}
        ListHeaderComponent={() => (
          <View className="flex-between flex-row w-full my-5">
            <View className="flex-start">
              <Text className="small-bold text-primary">DELIVER TO</Text>

              <TouchableOpacity className="flex-center flex-row gap-x-1 mt-0.5">
                <Text className="paragraph-bold text-dark-100">Croatia</Text>
                <Image
                  source={images.arrowDown}
                  className="size-3"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            <CartButton />
          </View>
        )}
      />
    </SafeAreaView>
  )
}
