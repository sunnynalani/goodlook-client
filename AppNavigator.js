import React from 'react'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { StyleSheet, Text, View, Button } from 'react-native'
import { BottomNavigator } from './src/components'
import { useQuery } from '@apollo/react-hooks'
import { TEST_QUERY } from './queries'
import HomeView from './src/screens/HomeView/HomeView'
import ProfileView from './src/screens/ProfileView/ProfileView'
import MapView from './src/screens/MapView/MapView'
import ListView from './src/screens/ListView/ListView'
import NotificationView from './src/screens/NotificationView/NotificationView'

const Stack = createStackNavigator()

/**
 * example query using useQuery hook...
const TestQuery = () => {
  const { loading, error, data } = useQuery(TEST_QUERY)
  if (loading) return 'loading'
  if (error) return 'error'
  return (
    <></>
  )
}
 */

const AppNavigator = () => {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeView} />
        <Stack.Screen name="Profile" component={ProfileView} />
        <Stack.Screen name="Map" component={MapView} />
        <Stack.Screen name="List" component={ListView} />
        <Stack.Screen name="Notification" component={NotificationView} />
      </Stack.Navigator> */}
      <BottomNavigator />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default AppNavigator