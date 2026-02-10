import { Text, View } from 'react-native'
import './global.css'

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text
        className="text-2xl text-primary"
        style={{ fontFamily: 'QuickSand-Bold' }}
      >
        Welcome to Nativewind Razaan!
      </Text>
    </View>
  )
}
