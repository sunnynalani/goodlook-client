import React, { useState, useEffect, useReducer } from 'react'
import {
  Appbar,
  Text,
  View,
  Button,
  Banner,
  DataTable,
  Card,
  List,
  Searchbar,
} from '../../components'
import { FontAwesome } from '@expo/vector-icons'
import { Dimensions } from 'react-native'
import styles from './styles'
import MapView from 'react-native-maps'
import { useLazyQuery } from '@apollo/client'
import { BlurView } from 'expo-blur'
import * as Location from 'expo-location'
import { GET_PROVIDERS } from './queries'

const MapViewContainer = ({ navigation, location, providerData }) => {
  return (
    <View style={styles.container}>
      {location && providerData && !providerData.errors && (
        <MapView
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
          }}
          loadingEnabled={true}
          loadingIndicatorColor="#666666"
          loadingBackgroundColor="#eeeeee"
          showsUserLocation={true}
          showsPointsOfInterest={false}
          initialRegion={location}
        >
          {providerData.providers.map((provider, index) => {
            return (
              <MapView.Marker
                key={index}
                title={provider.name}
                coordinate={{
                  latitude: provider.latitude,
                  longitude: provider.longitude,
                }}
              />
            )
          })}
        </MapView>
      )}
    </View>
  )
}

export default MapViewContainer
