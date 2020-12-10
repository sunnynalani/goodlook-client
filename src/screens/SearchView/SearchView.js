import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { FontAwesome } from '@expo/vector-icons'
import { useLazyQuery } from '@apollo/client'
import { GET_PROVIDERS } from './queries'
import { Dimensions } from 'react-native'
import * as Location from 'expo-location'
import MapViewContainer from './MapView'
import ListView from './ListView'
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
  height: 150px;
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

const DEFAULT_DISTANCE = 10

const SearchView = ({ navigation }) => {
  const [viewState, setViewState] = useState(false) //terrible way to do this
  const [location, setLocation] = useState(null)
  const [lockOverlay, setLockOverlay] = useState(false)
  const [userType, setUserType] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchInput, setSearchInput] = useState(null)
  const [within, setWithin] = useState(null)
  const [providerData, setProviderData] = useState(null)
  const [checkBoxes, setCheckBoxes] = useState(CHECKBOX_INITIAL_STATE) //maybe use reducer
  const [sort, setSort] = useState(false)
  const [near, setNear] = useState(false)
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
      try {
        const value = await AsyncStorage.getItem('@user')
        if (value !== null) {
          setUserType(value)
        } else {
          setUserType('1')
        }
      } catch (err) {
        console.log(err.message)
        setUserType('1')
      }
      if (status !== 'granted') {
        setLockOverlay(true)
      } else {
        const userLocation = await Location.getCurrentPositionAsync({})
        const withinInput = {
          longitude: userLocation.coords.longitude,
          latitude: userLocation.coords.latitude,
          distance: DEFAULT_DISTANCE,
        }
        const inputs = {
          filters: {},
          within: withinInput,
          sort: {
            name: 'ASC',
          },
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
    setModal({ visible: false })
  }

  const resetModal = (_) => {
    setCheckBoxes(CHECKBOX_INITIAL_STATE)
    handleNearMe()
    getData()
    closeModal()
  }

  const openFilterModal = (_) => {
    setModal({ visible: true })
  }

  const distanceFromCurrent = (latitude, longitude) => {
    return getDistance(
      location.latitude,
      location.longitude,
      latitude,
      longitude
    )
  }

  /**
   * Front end sort
   * There is a dynamic sort on api
   *
   * Swap to that once more data exists and front requires less load
   */
  const handleSort = () => {
    let temp = [...providerData.providers]
    if (sort) {
      temp.sort((a, b) => {
        let aDistance = distanceFromCurrent(a.latitude, a.longitude)
        let bDistance = distanceFromCurrent(b.latitude, b.longitude)
        return aDistance - bDistance
      })
    } else {
      temp.sort((a, b) => {
        let aDistance = distanceFromCurrent(a.latitude, a.longitude)
        let bDistance = distanceFromCurrent(b.latitude, b.longitude)
        return bDistance - aDistance
      })
    }
    setSort(!sort)
    setProviderData({
      errors: providerData.errors,
      providers: temp,
    })
  }

  const handleNearMe = (_) => {
    setSearchInput({
      within: within,
      sort: {
        name: 'ASC',
      },
    })
    setNear(false)
    getData()
  }

  const handleEverywhere = (_) => {
    setSearchInput({
      sort: {
        name: 'ASC',
      },
    })
    setNear(true)
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
   * there is a bug on the api where like requires a '%' at the end to generate the query
   * this is why the like query is handled like an eq query
   * it will crash if there is an and and or operator + like query
   * its not bad, but not great either
   */

  const onSubmit = (_) => {
    if (searchQuery === '') {
      handleEverywhere()
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

  const applyFilter = (_) => {
    const handleFilterCheck = (val) => {
      return val.value === 'checked'
    }

    const filters = {
      AND: [
        {
          licensed: {
            eq: handleFilterCheck(checkBoxes.licensed),
          },
        },
        {
          bike_parking: {
            eq: handleFilterCheck(checkBoxes.bike_parking),
          },
        },
        {
          accepts_bitcoin: {
            eq: handleFilterCheck(checkBoxes.accepts_bitcoin),
          },
        },
        {
          accepts_credit_cards: {
            eq: handleFilterCheck(checkBoxes.accepts_credit_cards),
          },
        },
        {
          garage_parking: {
            eq: handleFilterCheck(checkBoxes.garage_parking),
          },
        },
        {
          street_parking: {
            eq: handleFilterCheck(checkBoxes.street_parking),
          },
        },
        {
          dogs_allowed: {
            eq: handleFilterCheck(checkBoxes.dogs_allowed),
          },
        },
        {
          wheelchair_accessible: {
            eq: handleFilterCheck(checkBoxes.wheelchair_accessible),
          },
        },
        {
          valet_parking: {
            eq: handleFilterCheck(checkBoxes.valet_parking),
          },
        },
        {
          flexible_timing: {
            eq: handleFilterCheck(checkBoxes.flexible_timing),
          },
        },
      ],
    }
    setSearchInput({ filters: filters })
    closeModal()
    getData()
  }

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
            onPress={near ? handleNearMe : handleEverywhere}
          >
            <TabButtonText>{near ? 'near me' : 'all'}</TabButtonText>
          </TabButton>
          <TabButton android_ripple={{ color: 'white' }} onPress={handleSort}>
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
        <ListView
          navigation={navigation}
          userType={userType}
          providerData={providerData}
          location={location}
        />
      )}
      <Portal>
        <FilterDialog
          modal={modal}
          checkBoxes={checkBoxes}
          setCheckBoxes={setCheckBoxes}
          closeModal={closeModal}
          applyFilter={applyFilter}
          resetModal={resetModal}
        />
      </Portal>
    </Body>
  )
}

const FilterDialog = ({
  modal,
  checkBoxes,
  setCheckBoxes,
  closeModal,
  applyFilter,
  resetModal,
}) => {
  return (
    <Dialog visible={modal.visible} onDismiss={closeModal}>
      <Dialog.Content>
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
        <Button onPress={applyFilter}>Apply</Button>
        <Button onPress={resetModal}>Reset</Button>
      </Dialog.Actions>
    </Dialog>
  )
}

export default SearchView
