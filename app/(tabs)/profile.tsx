import React, { useEffect, useState } from 'react'
import { View, Text, Image, ActivityIndicator, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { account, appwriteConfig } from '@/lib/appwrite'

const Profile = () => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await account.get()
        setUser(res)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-bg-light">
        <ActivityIndicator size="large" color="#16A34A" />
      </View>
    )
  }

  const avatarUrl = `https://fra.cloud.appwrite.io/v1/avatars/initials?name=${encodeURIComponent(
    user.name
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

          <Text className="text-2xl font-bold mt-4 text-dark-100">{user.name}</Text>
          <Text className="text-gray-400 mt-1 text-base">{user.email}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile