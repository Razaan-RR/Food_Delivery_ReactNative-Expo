import { Text, View } from 'react-native'
import './global.css'

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text
        style={{ fontFamily: 'QuickSand-Bold', fontSize: 20, color: 'red' }}
      >
        Welcome to Nativewind Razaan!
      </Text>
    </View>
  )
}
