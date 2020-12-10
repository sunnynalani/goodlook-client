import React, { useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SearchView from '../screens/SearchView/SearchView'
import ProviderView from '../screens/ProfileView/ProviderView'

const Stack = createStackNavigator()

export const ProfileNavigator = () => {
  const [userType, setUserType] = useState('1')
  const [data, setData] = useState(null)

  useEffect(() => {
    ;(async () => {
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
    })()
  }, [])

  return (
    <Stack.Navigator initialRouteName={'SearchView'} headerMode={false}>
      <Stack.Screen name="SearchView" component={SearchView} />
      <Stack.Screen name="ProviderView" component={ProviderView} />
    </Stack.Navigator>
  )
}

export default ProfileNavigator
