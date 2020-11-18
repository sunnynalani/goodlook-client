import AsyncStorage from '@react-native-community/async-storage'
import {
  GUEST_KEY,
  CLIENT_KEY,
  PROVIDER_KEY,
} from '../components/assests/constants'

export const asGuest = async (navigation) => {
  try {
    await AsyncStorage.setItem(GUEST_KEY, '1')
    navigation.navigate('Main')
  } catch (error) {
    console.error('Unexpected Error')
    console.error(error)
  }
}

export const asClient = async (navigation, clientId) => {
  try {
    await AsyncStorage.setItem(CLIENT_KEY, clientId)
    navigation.navigate('Main')
  } catch (error) {
    console.error('Unexpected Error')
  }
}

export const asProvider = async (navigation, providerId) => {
  try {
    await AsyncStorage.setItem(PROVIDER_KEY, providerId)
    navigation.navigate('Main')
  } catch (error) {
    console.error('Unexpected Error')
  }
}
