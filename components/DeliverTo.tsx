import { images } from '@/constants'
import * as Location from 'expo-location'
import React, { useEffect, useRef, useState } from 'react'
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import MapView, { Marker } from 'react-native-maps'

const DeliverTo = () => {
  const [address, setAddress] = useState('Fetching location...')
  const [loading, setLoading] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [search, setSearch] = useState('')
  const [predictions, setPredictions] = useState<any[]>([])
  const [region, setRegion] = useState<any>(null)
  const [markerCoords, setMarkerCoords] = useState<any>(null)
  const mapRef = useRef<MapView>(null)

  useEffect(() => {
    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
          Alert.alert('Permission denied', 'Enable location to use this feature.')
          setAddress('Location permission denied')
          setLoading(false)
          return
        }

        const loc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
        })
        const [geo] = await Location.reverseGeocodeAsync({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        })

        setAddress(`${geo.name || ''}, ${geo.street || ''}, ${geo.city || ''}`)
        const initialRegion = {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }
        setRegion(initialRegion)
        setMarkerCoords({ latitude: loc.coords.latitude, longitude: loc.coords.longitude })
      } catch {
        setAddress('Unable to fetch location')
      } finally {
        setLoading(false)
      }
    }
    getLocation()
  }, [])

  const openModal = () => {
    setSearch('')
    setPredictions([])
    setModalVisible(true)
  }

  const fetchPredictions = async (text: string) => {
    setSearch(text)
    if (!text) {
      setPredictions([])
      return
    }
    try {
      const resp = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          text,
        )}&format=json&addressdetails=1&limit=5`,
        { headers: { 'User-Agent': 'YourAppName/1.0' } }, // Required by Nominatim
      )
      const data = await resp.json()
      setPredictions(data)
    } catch {
      setPredictions([])
    }
  }

  const handleSelect = async (place: any) => {
    const lat = parseFloat(place.lat)
    const lon = parseFloat(place.lon)
    setRegion({
      latitude: lat,
      longitude: lon,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    })
    setMarkerCoords({ latitude: lat, longitude: lon })
    setAddress(place.display_name)
    mapRef.current?.animateToRegion(
      {
        latitude: lat,
        longitude: lon,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      500,
    )
    setModalVisible(false)
  }

  const onMarkerDragEnd = async (e: any) => {
    const { latitude, longitude } = e.nativeEvent.coordinate
    setMarkerCoords({ latitude, longitude })
    try {
      const resp = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`,
        { headers: { 'User-Agent': 'YourAppName/1.0' } },
      )
      const data = await resp.json()
      setAddress(data.display_name)
      setRegion({ ...region, latitude, longitude })
    } catch {
      setAddress(`${latitude.toFixed(5)}, ${longitude.toFixed(5)}`)
    }
  }

  return (
    <View className="flex-start">
      <Text className="small-bold text-primary">DELIVER TO</Text>
      <TouchableOpacity
        onPress={openModal}
        className="flex-center flex-row gap-x-1 mt-0.5"
      >
        <Text className="paragraph-bold text-dark-100">
          {loading ? 'Fetching...' : address}
        </Text>
        <Image
          source={images.arrowDown}
          className="size-3"
          resizeMode="contain"
        />
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide">
        <View className="flex-1 bg-white">
          {region && markerCoords && (
            <MapView
              ref={mapRef}
              style={{
                width: '100%',
                height: Dimensions.get('window').height * 0.5,
              }}
              region={region}
            >
              <Marker
                coordinate={markerCoords}
                draggable
                onDragEnd={onMarkerDragEnd}
              />
            </MapView>
          )}

          <TextInput
            placeholder="Search location"
            value={search}
            onChangeText={fetchPredictions}
            className="border p-2 rounded m-4"
          />

          <FlatList
            data={predictions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleSelect(item)}
                className="p-3 border-b"
              >
                <Text>{item.display_name}</Text>
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            className="m-4 p-3 bg-gray-200 rounded items-center"
          >
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
}

export default DeliverTo