import { images } from '@/constants'
import useAuthStore from '@/store/auth.store'
import { TabBarIconProps } from '@/type'
import cn from 'clsx'
import { Redirect, Tabs } from 'expo-router'
import { Image, Text, View } from 'react-native'

const TabBarIcon = ({ focused, icon, title }: TabBarIconProps) => (
  <View
    className={cn(
      'flex items-center justify-center w-20 h-14 rounded-2xl mt-6',
      focused ? 'bg-primary/10' : ''
    )}
  >
    <Image
      source={icon}
      className="size-6"
      resizeMode="contain"
      tintColor={focused ? '#16A34A' : '#9CA3AF'}
    />
    <Text
      className={cn(
        'text-xs mt-1 font-quicksand-semibold',
        focused ? 'text-primary' : 'text-gray-400'
      )}
    >
      {title}
    </Text>
  </View>
)

export default function TabLayout() {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) return <Redirect href="/sign-in" />

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderRadius: 35,
          marginHorizontal: 25,
          height: 70,
          position: 'absolute',
          bottom: 30,
          backgroundColor: '#ffffff',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.08,
          shadowRadius: 20,
          elevation: 10,
        },
        tabBarItemStyle: {
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon title="Home" icon={images.home} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon title="Search" icon={images.search} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon title="Cart" icon={images.bag} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              title="Profile"
              icon={images.person}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  )
}