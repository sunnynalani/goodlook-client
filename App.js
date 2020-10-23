import React from 'react'
import 'react-native-gesture-handler'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { createHttpLink } from 'apollo-link-http'
import { ApolloLink, concat } from 'apollo-link'
import { StyleSheet } from 'react-native'
import AppNavigator from './AppNavigator'

const httpLink = createHttpLink({ 
  uri: 'https://api.blondpony.com/graphql',
  credentials: 'same-origin',
})

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: localStorage.getItem('token') || null,
    }
  });

  return forward(operation)
})

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      {/**
       * this should actually render loginview on start
       * if cached, go to app navigator
       */}
      <AppNavigator />
    </ApolloProvider>
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

export default App
