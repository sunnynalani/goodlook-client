import React from 'react'
import { View } from '../../components'
import { Dimensions } from 'react-native'
import styles from './styles'
import MapView from 'react-native-maps'

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
              <MapView.Circle
                key={index}
                title={provider.name}
                center={{
                  latitude: provider.latitude,
                  longitude: provider.longitude,
                }}
                radius={500}
                strokeColor="rgba(78, 255, 189, 0.15)"
                fillColor="rgba(78, 255, 189, 0.15)"
              />
            )
          })}
        </MapView>
      )}
    </View>
  )
}

export default MapViewContainer
