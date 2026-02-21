import { useCartStore } from '@/store/cart.store'
import { CartItemType } from '@/type'
import { Image, Text, TouchableOpacity, View, Platform } from 'react-native'
import { images } from '@/constants'

const CartItem = ({ item }: { item: CartItemType }) => {
  const { increaseQty, decreaseQty, removeItem } = useCartStore()

  return (
    <View
      className="flex-row items-center justify-between bg-white rounded-[28px] p-4 mb-5 border border-primary/10"
      style={
        Platform.OS === 'android'
          ? { elevation: 4 }
          : {
              shadowColor: '#000',
              shadowOpacity: 0.06,
              shadowRadius: 12,
              shadowOffset: { width: 0, height: 6 },
            }
      }
    >
      <View className="flex-row items-center flex-1">
        <View className="w-20 h-20 bg-primary/5 rounded-2xl items-center justify-center mr-4">
          <Image
            source={{ uri: item.image_url }}
            className="w-16 h-16 rounded-xl"
            resizeMode="cover"
          />
        </View>

        <View className="flex-1">
          <Text
            className="text-dark-100 font-quicksand-bold text-base"
            numberOfLines={1}
          >
            {item.name}
          </Text>

          <Text className="text-primary font-quicksand-semibold mt-1">
            ৳ {item.price}
          </Text>

          <View className="flex-row items-center mt-3">
            <View className="flex-row items-center bg-bg-light rounded-full px-3 py-1.5 border border-primary/10">
              <TouchableOpacity
                onPress={() =>
                  decreaseQty(item.id, item.customizations!)
                }
                className="w-7 h-7 items-center justify-center"
              >
                <Image
                  source={images.minus}
                  className="w-3 h-3"
                  resizeMode="contain"
                  tintColor="#16A34A"
                />
              </TouchableOpacity>

              <Text className="mx-3 font-quicksand-bold text-dark-100">
                {item.quantity}
              </Text>

              <TouchableOpacity
                onPress={() =>
                  increaseQty(item.id, item.customizations!)
                }
                className="w-7 h-7 items-center justify-center"
              >
                <Image
                  source={images.plus}
                  className="w-3 h-3"
                  resizeMode="contain"
                  tintColor="#16A34A"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => removeItem(item.id, item.customizations!)}
        className="ml-3 w-10 h-10 bg-primary/10 rounded-full items-center justify-center"
      >
        <Image
          source={images.trash}
          className="w-4 h-4"
          resizeMode="contain"
          tintColor="#F14141"
        />
      </TouchableOpacity>
    </View>
  )
}

export default CartItem