import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { MainNavigator } from './src/components'
import { useQuery } from '@apollo/react-hooks'
import { ME } from './queries'
import {
  SignInView,
  SignUpView,
  LoginView,
  ForgotPasswordView,
} from './src/screens/SignInView'

const Stack = createStackNavigator()

const StackNavigation = () => {
  const { loading, error, data } = useQuery(ME)
  if (loading) return <></>
  if (error) return <></>
  return (
    <Stack.Navigator
      initialRouteName={
        data.selfClient || data.selfProvider ? 'Main' : 'SignIn'
      }
      headerMode={false}
    >
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
