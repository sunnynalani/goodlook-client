import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { MainNavigator } from './MainNavigator'
import { useQuery } from '@apollo/react-hooks'
import { ME } from './queries'
import {
  SignInView,
  SignUpView,
  LoginView,
  ForgotPasswordView,
} from '../screens/SignInView'
import { asClient, asProvider } from '../utils'

const Stack = createStackNavigator()

const StackNavigation = () => {
  const { loading, error, data } = useQuery(ME)
  if (loading) return <></> //return loading screen todo
  if (error) return <></> //return error screen todo

  let initialRoute = 'Main'
  if (data.meClient) {
    asClient(data.meClient.id)
  } else if (data.meProvider) {
    asProvider(data.meProvider)
  } else {
    initialRoute = 'SignIn'
  }

  return (
    <Stack.Navigator initialRouteName={initialRoute} headerMode={false}>
      <Stack.Screen name="Main" component={MainNavigator} />
      <Stack.Screen name="SignIn" component={SignInView} />
      <Stack.Screen name="SignUp" component={SignUpView} />
      <Stack.Screen name="Login" component={LoginView} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordView} />
    </Stack.Navigator>
  )
}

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  )
}

export default AppNavigator
