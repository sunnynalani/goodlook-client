import React, { useState, useEffect, useReducer } from 'react'
import {
  Text,
  View,
  ScrollView,
  Button,
  Banner,
  ProgressBar,
  Appbar,
  Searchbar,
  IconButton,
} from '../../components'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import { useQuery, useLazyQuery } from '@apollo/client'
import { GET_PROVIDERS } from './queries'
import SearchTable from './SearchTable'
import { Dimensions } from 'react-native'
import { BlurView } from 'expo-blur'
import * as Location from 'expo-location'
import styles from './styles'
import MapViewContainer from './MapView'

const ListView = ({ navigation }) => {
  return <View></View>
}

export default ListView
