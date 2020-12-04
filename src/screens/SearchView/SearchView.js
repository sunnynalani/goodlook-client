import React, { useState, useEffect, useReducer } from 'react'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import { useLazyQuery } from '@apollo/client'
import { GET_PROVIDERS } from './queries'
import { Dimensions } from 'react-native'
import * as Location from 'expo-location'
import MapViewContainer from './MapView'
import ListView from './ListView'
import Slider from '@react-native-community/slider'
import styled from 'styled-components/native'
import { distance as getDistance } from '../../utils'
import {
  Button,
  Checkbox,
  Paragraph,
  View,
  Dialog,
  Portal,
} from '../../components'

const Body = styled.View`
  align-items: center;
  background-color: white;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-start;
  width: 100%;
`

const Tab = styled.View`
  background-color: white;
  height: 125px;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
  shadow-color: black;
  shadow-opacity: 0.8;
  elevation: 2;
`

const Title = styled.Text`
  color: black;
  height: auto;
  margin-top: 10%;
  margin-left: 10%;
  letter-spacing: -0.54px;
  font-size: 36px;
  font-family: Comfortaa_500Medium;
`
const ErrorText = styled.Text`
  color: red;
  height: auto;
  font-size: 12px;
  font-family: Comfortaa_500Medium;
  margin-bottom: 20px;
`

const InputContainer = styled.View`
  background-color: white;
  height: 52px;
  width: 90%;
  border: 2px solid black;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding-left: 15px;
  padding-right: 15px;
  shadow-color: black;
  shadow-opacity: 0.8;
  elevation: 2;
`

const Input = styled.TextInput`
  color: black;
  height: 52px;
  width: ${Dimensions.get('window').width * 0.65}px;
  text-align: left;
  font-size: 15px;
  font-family: Comfortaa_500Medium;
`

const TabButtonContainer = styled.View`
  background-color: white;
  height: auto;
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 10px;
  align-items: center;
  justify-content: center;
  width: 90%;
`

const TabButton = styled.Pressable`
  background-color: black;
  height: 24px;
  border-radius: 6px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 30%;
  ${({ mr }) => mr && `margin-right: 16px;`}
`

const TabButtonText = styled.Text`
  text-align: center;
  color: white;
  width: auto;
  margin-bottom: 5px;
  font-size: 16px;
  font-family: Comfortaa_500Medium;
`

const InnerDialogContainer = styled.ScrollView`
  background-color: transparent;
  height: 50%;
  width: 100%;
`

const IconButton = styled.TouchableOpacity`
  background-color: transparent;
  height: auto;
  justify-content: center;
  align-items: center;
  width: auto;
`

//react native paper has a string value for unchecked...
//not sure why they have it like that...

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

const SearchView = ({ navigation }) => {
  const [viewState, setViewState] = useState(false) //terrible way to do this
  const [location, setLocation] = useState(null)
  const [lockOverlay, setLockOverlay] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchInput, setSearchInput] = useState(null)
  const [within, setWithin] = useState(null)
  const [providerData, setProviderData] = useState(null)
  const [checkBoxes, setCheckBoxes] = useState(CHECKBOX_INITIAL_STATE) //maybe use reducer
  const [distance, setDistance] = useState(5)
  const [rating, setRating] = useState(0)
  const [sort, setSort] = useState('distance,-1')
  const [modal, setModal] = useState({
    visible: false,
    sortVisible: false,
  })

  const [getData] = useLazyQuery(GET_PROVIDERS, {
    variables: searchInput,
    fetchPolicy: 'network-only',
    onError: (err) => console.log(err.message),
    onCompleted: (res) => {
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
        const withinInput = {
          longitude: userLocation.coords.longitude,
          latitude: userLocation.coords.latitude,
          distance: 5,
        }
        const inputs = {
          filters: {},
          within: withinInput,
        }
        setWithin(withinInput)
        setLocation({
          longitude: userLocation.coords.longitude,
          latitude: userLocation.coords.latitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
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

  const openFilterModal = (_) => {
    setModal({ visible: true, sortVisible: false })
  }

  const distanceFromCurrent = (latitude, longitude) => {
    return getDistance(
      location.latitude,
      location.longitude,
      latitude,
      longitude
    )
  }

  const handleSort = () => {
    const parsedSort = sort.split(',')
    if (parsedSort[0] === 'distance') {
      if (parsedSort[1] > 0) {
        providerData.providers.sort((a, b) => {
          distanceFromCurrent(a.latitude, a.longitude) -
            distanceFromCurrent(b.latitude, b.longitude)
        })
      } else {
        providerData.providers.sort((a, b) => {
          distanceFromCurrent(b.latitude, b.longitude) -
            distanceFromCurrent(a.latitude, a.longitude)
        })
      }
    } else {
      if (parsedSort[1] > 0) {
        providerData.providers.sort((a, b) => {
          a.rating - b.rating
        })
      } else {
        providerData.providers.sort((a, b) => {
          b.rating - a.rating
        })
      }
    }
    console.log(providerData)
    //setProviderData(...providerData)
  }

  const handleNearMe = (_) => {
    setSearchInput({
      within: within,
    })
    getData()
  }

  /**
   * this is a pretty rudamentary searching functionality
   * a better and more effective way would be to implement this search on the backend
   * by passing in a query string to the api
   * implementing a good and in-depth searching function onto a resolver
   * although, creating this function would probably be a project on its own
   *
   * this search just uses a query string then uses postgresql "like" to find matches
   * its not bad, but not great either
   */

  const onSubmit = (_) => {
    if (searchQuery === '') {
      handleNearMe()
    } else {
      const filters = {
        OR: [
          {
            name: {
              like: searchQuery,
            },
          },
          {
            country: {
              eq: searchQuery,
            },
          },
          {
            state: {
              eq: searchQuery,
            },
          },
          {
            city: {
              eq: searchQuery,
            },
          },
          {
            street: {
              like: searchQuery,
            },
          },
          {
            zipcode: {
              eq: isNaN(searchQuery) ? null : Number(searchQuery),
            },
          },
        ],
      }
      setSearchInput({
        filters: filters,
      })
      getData()
    }
  }

  const applyFilter = (_) => {}

  return (
    <Body>
      <Tab>
        <InputContainer>
          <IconButton onPress={onSubmit}>
            <FontAwesome
              name="search"
              size={Dimensions.get('window').width * 0.06}
              color={'black'}
              style={{
                paddingLeft: '4%',
                paddingRight: '4%',
              }}
            />
          </IconButton>
          <Input
            placeholder={'search'}
            onChangeText={(searchQuery) => setSearchQuery(searchQuery)}
            onSubmitEditing={onSubmit}
            value={searchQuery}
          />
          <IconButton onPress={() => setViewState(!viewState)}>
            <FontAwesome
              name={viewState ? 'list' : 'globe'}
              size={
                viewState
                  ? Dimensions.get('window').width * 0.06
                  : Dimensions.get('window').width * 0.07
              }
              color={'black'}
              style={{
                paddingLeft: '4%',
                paddingRight: '4%',
              }}
            />
          </IconButton>
        </InputContainer>
        <TabButtonContainer>
          <TabButton
            mr
            android_ripple={{ color: 'white' }}
            onPress={openFilterModal}
          >
            <TabButtonText>filter</TabButtonText>
          </TabButton>
          <TabButton
            mr
            android_ripple={{ color: 'white' }}
            onPress={handleNearMe}
          >
            <TabButtonText>near me</TabButtonText>
          </TabButton>
          <TabButton android_ripple={{ color: 'white' }} onPress={handleSort}>
            <TabButtonText>distance -</TabButtonText>
          </TabButton>
        </TabButtonContainer>
      </Tab>
      {viewState ? (
        <MapViewContainer
          navigation={navigation}
          location={location}
          providerData={providerData}
        />
      ) : (
        <ListView
          navigation={navigation}
          providerData={providerData}
          location={location}
        />
      )}
      <Portal>
        <FilterDialog
          modal={modal}
          rating={rating}
          distance={distance}
          setRating={setRating}
          setDistance={setDistance}
          checkBoxes={checkBoxes}
          setCheckBoxes={setCheckBoxes}
          closeModal={closeModal}
        />
      </Portal>
    </Body>
  )
}

const FilterDialog = ({
  modal,
  rating,
  distance,
  setRating,
  setDistance,
  checkBoxes,
  setCheckBoxes,
  closeModal,
}) => {
  return (
    <Dialog visible={modal.visible} onDismiss={closeModal}>
      <Dialog.Content>
        <View>
          <Paragraph>Rating: {rating}</Paragraph>
          <Slider
            style={{ width: '100%', height: 20 }}
            step={1}
            minimumValue={0}
            maximumValue={5}
            minimumTrackTintColor="gray"
            maximumTrackTintColor="gray"
            value={rating}
            onSlidingComplete={(v) => setRating(v)}
          />
        </View>
        <View>
          <Paragraph>Distance within: {distance} miles</Paragraph>
          <Slider
            style={{ width: '100%', height: 20 }}
            step={5}
            minimumValue={0}
            maximumValue={30}
            minimumTrackTintColor="gray"
            maximumTrackTintColor="gray"
            value={distance}
            onSlidingComplete={(v) => setDistance(v)}
          />
        </View>
        <InnerDialogContainer>
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
        </InnerDialogContainer>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={closeModal}>Cancel</Button>
        <Button onPress={closeModal}>Apply</Button>
      </Dialog.Actions>
    </Dialog>
  )
}

export default SearchView
