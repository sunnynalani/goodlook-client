import React, { useState, useEffect, useReducer } from 'react'
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
import Slider from '@react-native-community/slider'
import styled from 'styled-components/native'
import { Text, View } from '../../components'
import { Pressable, TextInput, Platform, TouchableOpacity } from 'react-native'

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
  justify-content: flex-end;
  width: 90%;
`

const TabButton = styled.Pressable`
  background-color: black;
  height: 20px;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  width: 20%;
  ${({ mr }) => mr && `margin-right: 16px;`}
`

const TabButtonText = styled.Text`
  text-align: center;
  color: white;
  width: 100px;
  margin-bottom: 5px;
  font-size: 16px;
  font-family: Comfortaa_500Medium;
`

const ButtonContainer = styled.View`
  background-color: white;
  height: auto;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const MainButton = styled.Pressable`
  background-color: black;
  height: 52px;
  border-radius: 6px;
  margin-top: 10px;
  margin-bottom: 10px;
  align-items: center;
  justify-content: center;
  width: 90%;
`

const MainText = styled.Text`
  text-align: center;
  color: white;
  width: 100px;
  text-align: center;
  font-size: 18px;
  font-family: Comfortaa_500Medium;
`

const TermsContainer = styled.View`
  background-color: white;
  height: auto;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const Terms = styled.Text`
  color: black;
  margin-left: 5%;
  width: 95%;
  font-size: 13px;
  font-family: Comfortaa_500Medium;
`

const IconButton = styled.TouchableOpacity`
  background-color: transparent;
  height: auto;
  justify-content: center;
  align-items: center;
  width: auto;
`

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
    <Body>
      <Tab>
        <InputContainer>
          <IconButton onPress={() => console.log('search')}>
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
          <Input placeholder={'search'} />
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
            onPress={() => console.log('filter')}
          >
            <TabButtonText>filter</TabButtonText>
          </TabButton>
          <TabButton
            android_ripple={{ color: 'white' }}
            onPress={() => console.log('sort')}
          >
            <TabButtonText>sort</TabButtonText>
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
        <ListView navigation={navigation} providerData={providerData} />
      )}
      {/* <ButtonContainer>
        <MainButton android_ripple={{ color: 'white' }}>
          <MainText>sign up</MainText>
        </MainButton>
      </ButtonContainer>
      <TermsContainer>
        <Terms>
          By signing up, you agree to goodlook's Terms of Service and Privacy
          Policy
        </Terms>
      </TermsContainer> */}
    </Body>
  )
}

export default SearchView
