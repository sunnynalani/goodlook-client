import * as Location from 'expo-location'

/**
 * Requests and Returns locations status from user
 */

export const requestLocation = async () => {
  const { status } = await Location.requestPermissionsAsync()
  return status
}

export default requestLocation
