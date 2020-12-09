import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SearchView from '../screens/SearchView/SearchView'
import ProviderView from '../screens/ProfileView/ProviderView'

const Stack = createStackNavigator()

export const SearchNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={'SearchView'} headerMode={false}>
      <Stack.Screen name="SearchView" component={SearchView} />
      <Stack.Screen name="ProviderView" component={ProviderView} />
    </Stack.Navigator>
  )
}

export default SearchNavigator
