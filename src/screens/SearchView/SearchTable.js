import React, { useState, useReducer } from 'react'
import {
  Text,
  View,
  Button,
  Banner,
  DataTable,
  Card,
  List,
} from '../../components'
import styles from './styles'

const SearchTable = ({ navigation, data }) => {
  console.log(data.providers)
  return (
    <List.Section>
      {data.providers.map((provider, index) => (
        <List.Item
          title={`${provider.name} ${index}`}
          key={index}
          style={styles.providerCard}
        />
      ))}
    </List.Section>
  )
}

export default SearchTable
