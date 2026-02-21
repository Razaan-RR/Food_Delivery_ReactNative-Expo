import { View, Text, FlatList, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useCartStore } from '@/store/cart.store'
import CustomHeader from '@/components/CustomHeader'
import cn from 'clsx'
import CustomButton from '@/components/CustomButton'
import CartItem from '@/components/CartItem'
import { PaymentInfoStripeProps } from '@/type'

const PaymentInfoStripe = ({
  label,
  value,
  labelStyle,
  valueStyle,
}: PaymentInfoStripeProps) => (
  <View className="flex-row justify-between items-center my-2">
    <Text className={cn('text-gray-100 font-quicksand-medium', labelStyle)}>
      {label}
    </Text>
    <Text className={cn('text-dark-100 font-quicksand-semibold', valueStyle)}>
      {value}
    </Text>
  </View>
)

const Cart = () => {
  const { items, getTotalItems, getTotalPrice } = useCartStore()

  const totalItems = getTotalItems()
  const totalPrice = getTotalPrice()
  const deliveryFee = 50
  const discount = 0
  const finalTotal = totalPrice + deliveryFee - discount

  return (
    <SafeAreaView className="flex-1 bg-bg-light">
      <FlatList
        data={items}
        renderItem={({ item }) => <CartItem item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerClassName="pb-32 px-5 pt-5"
        ListHeaderComponent={() => (
          <View className="mb-4">
            <CustomHeader title="Your Cart" />
            <Text className="text-gray-100 mt-2 font-quicksand-medium">
              {totalItems > 0
                ? `${totalItems} item${totalItems > 1 ? 's' : ''} in your cart`
                : 'Your cart is empty'}
            </Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <View className="items-center mt-20">
            <View className="w-20 h-20 bg-primary/10 rounded-full mb-6" />
            <Text className="text-dark-100 text-xl font-quicksand-bold mb-2">
              Your Cart is Empty
            </Text>
            <Text className="text-gray-100 font-quicksand-medium text-center px-10">
              Looks like you haven’t added anything yet.
            </Text>
          </View>
        )}
        ListFooterComponent={() =>
          totalItems > 0 && (
            <View className="mt-8 gap-6">
              <View
                className="bg-white rounded-[30px] p-6 border border-primary/10"
                style={
                  Platform.OS === 'android'
                    ? { elevation: 6 }
                    : {
                        shadowColor: '#000',
                        shadowOpacity: 0.08,
                        shadowRadius: 15,
                        shadowOffset: { width: 0, height: 10 },
                      }
                }
              >
                <Text className="text-dark-100 text-xl font-quicksand-bold mb-5">
                  Payment Summary
                </Text>

                <PaymentInfoStripe
                  label={`Subtotal (${totalItems})`}
                  value={`৳ ${totalPrice.toFixed(2)}`}
                />
                <PaymentInfoStripe
                  label="Delivery Fee"
                  value={`৳ ${deliveryFee.toFixed(2)}`}
                />
                <PaymentInfoStripe
                  label="Discount"
                  value={`- ৳ ${discount.toFixed(2)}`}
                  valueStyle="!text-success"
                />

                <View className="border-t border-primary/10 my-4" />

                <PaymentInfoStripe
                  label="Total"
                  value={`৳ ${finalTotal.toFixed(2)}`}
                  labelStyle="text-lg font-quicksand-bold !text-dark-100"
                  valueStyle="text-lg font-quicksand-bold !text-primary"
                />
              </View>

              <View className="mb-5">
                <CustomButton title="Proceed to Checkout" />
              </View>
            </View>
          )
        }
      />
    </SafeAreaView>
  )
}

export default Cart