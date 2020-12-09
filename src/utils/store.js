import AsyncStorage from '@react-native-community/async-storage'
import {
  GUEST_KEY,
  CLIENT_KEY,
  PROVIDER_KEY,
} from '../components/assests/constants'

/**
 *
 * These functions are used to store the user type
 * onto the async storage
 *
 * set the usertype or user onto the local storage
 * once a user logs in or signs in
 *
 * If the user is "already logged in" from the "me" queries
 * Set the local storage
 *
 * Another option is to make the api set the session within a securesession
 * instead of a cookie
 *
 * User types:
 *  guest: 0
 *  client: 1
 *  provider: 2
 *
 */

export const asGuest = async (navigation) => {
  try {
    await AsyncStorage.setItem('@user', '1')
    navigation.navigate('Main')
  } catch (error) {
    console.error('Unexpected Error')
    console.error(error)
  }
}

export const asClient = async () => {
  try {
    await AsyncStorage.setItem('@user', '2')
  } catch (error) {
    console.error('Unexpected Error')
  }
}

export const asProvider = async () => {
  try {
    await AsyncStorage.setItem('@user', '3')
  } catch (error) {
    console.error('Unexpected Error')
  }
}

export const getUserType = async () => {
  try {
    const value = await AsyncStorage.getItem('@user')
    if (value !== null) {
      return value
    } else {
      return '0'
    }
  } catch (err) {
    console.log(err.message)
    return '0'
  }
}
