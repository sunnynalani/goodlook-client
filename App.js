import React from 'react'
import 'react-native-gesture-handler'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { PaperProvider } from './src/components'
import { theme } from './config'
import { createHttpLink } from 'apollo-link-http'
import { StyleSheet } from 'react-native'
import { AppLoading } from 'expo'
import AppNavigator from './src/navigation/AppNavigator'
import {
  useFonts,
  Comfortaa_300Light,
  Comfortaa_400Regular,
  Comfortaa_500Medium,
  Comfortaa_600SemiBold,
  Comfortaa_700Bold,
} from '@expo-google-fonts/comfortaa'

const httpLink = createHttpLink({
  uri: 'https://api.blondpony.com/graphql',
  credentials: 'same-origin',
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

const App = () => {
  let [fontsLoaded] = useFonts({
    Comfortaa_300Light,
    Comfortaa_400Regular,
    Comfortaa_500Medium,
    Comfortaa_600SemiBold,
    Comfortaa_700Bold,
  })

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <ApolloProvider client={client}>
        <PaperProvider theme={theme}>
          <AppNavigator />
        </PaperProvider>
      </ApolloProvider>
    )
  }
}

export default App
