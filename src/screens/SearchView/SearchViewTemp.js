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
  Portal,
  Modal,
  Dialog,
  Paragraph,
  Checkbox,
} from '../../components'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import { useLazyQuery } from '@apollo/client'
import { GET_PROVIDERS } from './queries'
import SearchTable from './SearchTable'
import { Dimensions } from 'react-native'
import { BlurView } from 'expo-blur'
import * as Location from 'expo-location'
import styles from './styles'
import MapViewContainer from './MapView'
import ListView from './ListView'
import Slider from '@react-native-community/slider'

const CHECKBOX_INITIAL_STATE = {
  licensed: { name: 'Licensed', value: 'unchecked' },
  bike_parking: { name: 'Bike Parking', value: 'unchecked' },
  accepts_bitcoin: { name: 'Accepts Bitcoin', value: 'unchecked' },
  accepts_credit_cards: { name: 'Accepts CreditCard', value: 'unchecked' },
  garage_parking: { name: 'Garage Parking', value: 'unchecked' },
  street_parking: { name: 'Street Parking', value: 'unchecked' },
  dogs_allowed: { name: 'Dogs Allowed', value: 'unchecked' },
  wheelchair_accessible: { name: 'Wheelchair Accessible', value: 'unchecked' },
  valet_parking: { name: 'Valet Parking', value: 'unchecked' },
  flexible_timing: { name: 'Flexible Timing', value: 'unchecked' },
}

/**
 *
 *  first iteration of the search view
 *  should be scrapped
 *
 */
const SearchView = ({ navigation }) => {
  const [viewState, setViewState] = useState(0) //terrible way to do this
  const [location, setLocation] = useState(null)
  const [lockOverlay, setLockOverlay] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchInput, setSearchInput] = useState(null)
  const [providerData, setProviderData] = useState(null)
  const [checkBoxes, setCheckBoxes] = useState(CHECKBOX_INITIAL_STATE)
  const [distance, setDistance] = useState(5)
  const [rating, setRating] = useState(0)
  const [modal, setModal] = useState({
    visible: false,
    sortVisible: false,
  })

  const [getData] = useLazyQuery(GET_PROVIDERS, {
    variables: searchInput,
    fetchPolicy: 'network-only',
    onError: (err) => console.log(err.message),
    onCompleted: (res) => {
      console.log(res)
      setProviderData(res.providers)
    },
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

  const closeModal = (_) => {
    setCheckBoxes(CHECKBOX_INITIAL_STATE)
    setDistance(5)
    setModal({ visible: false, sortVisible: false })
  }

  const closeSortModal = (_) => {
    setModal({ visible: false, sortVisible: false })
  }

  const openModal = (_) => {
    setModal({ visible: true, sortVisible: false })
  }

  const openSortModal = (_) => {
    setModal({ visible: false, sortVisible: true })
  }

  const onChangeSearch = (query) => {
    setSearchQuery(query)
    setSearchInput({
      ...searchInput,
      filters: {
        OR: [
          {
            name: {
              like: query + '%',
            },
          },
          {
            country: {
              eq: query,
            },
          },
          {
            state: {
              eq: query,
            },
          },
          {
            city: {
              eq: query,
            },
          },
          {
            street: {
              like: query + '%',
            },
          },
          {
            zipcode: {
              eq: query,
            },
          },
        ],
      },
    })
  }

  const onConfirmSearch = (_) => {
    getData()
  }

  return (
    <View style={styles.container}>
      <View style={{ height: 134, backgroundColor: 'white' }}>
        <Searchbar
          placeholder={'Search'}
          onChangeText={onChangeSearch}
          //onIconPress={onConfirmSearch}
          value={searchQuery}
          iconColor={'black'}
          style={{
            marginTop: 32,
            width: '95%',
            alignSelf: 'center',
            height: 40,
            textColor: 'black',
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
              width: 50,
              backgroundColor: '#fafafa',
              borderColor: '#ececec',
            }}
            onPress={() => setViewState(1)}
          >
            <FontAwesome name="globe" size={22} color={'black'} />
          </Button>
          <Button
            mode="outlined"
            style={{
              width: 50,
              marginLeft: 'auto',
              marginLeft: 'auto',
              backgroundColor: '#fafafa',
              borderColor: '#ececec',
            }}
            onPress={() => setViewState(0)}
          >
            <FontAwesome name="list" size={22} color={'black'} />
          </Button>
          <Button
            mode="outlined"
            style={{
              width: 50,
              marginLeft: 'auto',
              marginRight: 'auto',
              backgroundColor: '#fafafa',
              borderColor: '#ececec',
            }}
            onPress={openSortModal}
          >
            <FontAwesome name="sort" size={22} color={'black'} />
          </Button>
          <Button
            mode="outlined"
            style={{
              width: 50,
              backgroundColor: '#fafafa',
              borderColor: '#ececec',
            }}
            onPress={openModal}
          >
            <FontAwesome name="filter" size={22} color={'black'} />
          </Button>
        </View>
      </View>
      <Portal>
        <Dialog visible={modal.visible} onDismiss={closeModal}>
          <Dialog.Content>
            <View>
              <Paragraph>Rating: {rating}</Paragraph>
              <Slider
                style={{ width: '100%', height: 40 }}
                step={1}
                minimumValue={0}
                maximumValue={5}
                minimumTrackTintColor="gray"
                maximumTrackTintColor="gray"
                value={rating}
                onValueChange={(v) => setRating(v)}
              />
            </View>
            <View>
              <Paragraph>Distance within: {distance} miles</Paragraph>
              <Slider
                style={{ width: '100%', height: 40 }}
                step={5}
                minimumValue={0}
                maximumValue={30}
                minimumTrackTintColor="gray"
                maximumTrackTintColor="gray"
                value={distance}
                onValueChange={(v) => setDistance(v)}
              />
            </View>
            {Object.keys(checkBoxes).map((key, index) => {
              return (
                <View
                  key={index}
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                >
                  <Checkbox
                    key={index}
                    status={checkBoxes[key].value}
                    onPress={() => {
                      checkBoxes[key].value === 'unchecked'
                        ? (checkBoxes[key].value = 'checked')
                        : (checkBoxes[key].value = 'unchecked')
                      setCheckBoxes({ ...checkBoxes })
                    }}
                  />
                  <Paragraph>{checkBoxes[key].name}</Paragraph>
                </View>
              )
            })}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={closeModal}>Cancel</Button>
            <Button onPress={closeModal}>Apply</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Portal>
        <Dialog visible={modal.sortVisible} onDismiss={closeSortModal}>
          <Dialog.Content></Dialog.Content>
          <Dialog.Actions>
            <Button onPress={closeSortModal}>Cancel</Button>
            <Button onPress={closeSortModal}>Apply</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      {viewState ? (
        <MapViewContainer
          navigation={navigation}
          location={location}
          providerData={providerData}
        />
      ) : (
        <ListView navigation={navigation} providerData={providerData} />
      )}
      {lockOverlay && (
        <BlurView intensity={100} style={StyleSheet.absoluteFill}></BlurView>
      )}
    </View>
  )
}

export default SearchView
