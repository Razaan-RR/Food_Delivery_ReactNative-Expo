import { account, appwriteConfig } from '@/lib/appwrite'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAuthStore from '@/store/auth.store'

const Profile = () => {
  const router = useRouter()
  const { user, isLoading, fetchAuthenticatedUser } = useAuthStore()
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            setLoggingOut(true)
            await account.deleteSession('current')
            await fetchAuthenticatedUser()
            router.replace('/(auth)/sign-in')
          } catch (error) {
            console.log(error)
          } finally {
            setLoggingOut(false)
          }
        },
      },
    ])
  }

  if (isLoading || !user) {
    return (
      <View className="flex-1 items-center justify-center bg-bg-light">
        <ActivityIndicator size="large" color="#16A34A" />
      </View>
    )
  }

  const avatarUrl = `https://fra.cloud.appwrite.io/v1/avatars/initials?name=${encodeURIComponent(
    user.name,
  )}&project=${appwriteConfig.projectId}`

  return (
    <SafeAreaView className="flex-1 bg-bg-light">
      <ScrollView contentContainerStyle={{ padding: 20, alignItems: 'center' }}>
        <View className="bg-white w-full rounded-2xl p-6 items-center shadow-lg shadow-black/10">
          <View className="w-32 h-32 rounded-full overflow-hidden shadow-md shadow-black/20">
            <Image
              source={{ uri: avatarUrl }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>

          <Text className="text-2xl font-bold mt-4 text-dark-100">
            {user.name}
          </Text>
          <Text className="text-gray-400 mt-1 text-base">{user.email}</Text>

          <TouchableOpacity
            onPress={handleLogout}
            disabled={loggingOut}
            className="mt-6 bg-red-500 px-6 py-3 rounded-full w-full items-center"
          >
            {loggingOut ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white font-semibold text-base">
                Logout
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile