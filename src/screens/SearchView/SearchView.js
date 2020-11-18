import React, { useState, useEffect, useReducer } from 'react'
import {
  Text,
  View,
  ScrollView,
  Button,
  Banner,
  ProgressBar,
  Appbar,
  Searchbar,
  IconButton,
} from '../../components'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import { useQuery, useLazyQuery } from '@apollo/client'
import { GET_PROVIDERS } from './queries'
import SearchTable from './SearchTable'
import { Dimensions } from 'react-native'
import { BlurView } from 'expo-blur'
import * as Location from 'expo-location'
import styles from './styles'
import MapViewContainer from './MapView'
import ListView from './ListView'

const SearchView = ({ navigation }) => {
  const [viewState, setViewState] = useState(0) //terrible way to do this
  const [location, setLocation] = useState(null)
  const [lockOverlay, setLockOverlay] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchInput, setSearchInput] = useState(null)
  const [providerData, setProviderData] = useState(null)
  const [getData, { loading, data }] = useLazyQuery(GET_PROVIDERS, {
    variables: searchInput,
    fetchPolicy: 'network-only',
    onError: (err) => console.log(err.message),
    onCompleted: (res) => setProviderData(res.providers),
  })

  useEffect(() => {
    ;(async () => {
      const { status } = await Location.requestPermissionsAsync()
      if (status !== 'granted') {
        setLockOverlay(true)
      } else {
        const userLocation = await Location.getCurrentPositionAsync({})
        const inputs = {
          filters: {},
          within: {
            longitude: userLocation.coords.longitude,
            latitude: userLocation.coords.latitude,
            distance: 5,
          },
        }
        setLocation({
          longitude: userLocation.coords.longitude,
          latitude: userLocation.coords.latitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        })
        setSearchInput(inputs)
        getData()
      }
    })()
  }, [])

  const onChangeSearch = (query) => setSearchQuery(query)

  return (
    <View style={styles.container}>
      <View style={{ height: 130, backgroundColor: '#54b17d' }}>
        <Searchbar
          placeholder={'Search'}
          onChangeText={onChangeSearch}
          value={searchQuery}
          iconColor={'#54b17d'}
          style={{
            marginTop: 32,
            width: '95%',
            alignSelf: 'center',
            height: 40,
            //borderRadius: 20,
          }}
        />
        <View
          style={{
            marginTop: 10,
            width: '95%',
            alignContent: 'space-between',
            alignSelf: 'center',
            flexDirection: 'row',
          }}
        >
          <Button
            mode="outlined"
            style={{
              width: '30%',
              marginRight: 10,
              backgroundColor: '#fafafa',
              borderColor: '#ececec',
            }}
            onPress={() => setViewState(1)}
          >
            Map
          </Button>
          <Button
            mode="outlined"
            style={{
              width: '30%',
              backgroundColor: '#fafafa',
              borderColor: '#ececec',
            }}
            onPress={() => setViewState(0)}
          >
            List
          </Button>
          <Button
            mode="outlined"
            style={{
              marginLeft: 'auto',
              backgroundColor: '#fafafa',
              borderColor: '#ececec',
            }}
            onPress={() => console.log('Pressed')}
          >
            <FontAwesome name="list" size={18} />
          </Button>
        </View>
      </View>
      {viewState ? (
        <MapViewContainer
          navigation={navigation}
          location={location}
          providerData={providerData}
        />
      ) : (
        <ListView navigation={navigation} />
      )}
      {lockOverlay && (
        <BlurView intensity={100} style={StyleSheet.absoluteFill}></BlurView>
      )}
    </View>
  )
}

export default SearchView
