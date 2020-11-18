import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import MapViewContainer from '../screens/SearchView/MapView'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'

const Tab = createMaterialTopTabNavigator()

export const SearchNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Map"
      tabBarOptions={{
        activeTintColor: '#FFFFFF',
        inactiveTintColor: '#F8F8F8',
        style: {
          backgroundColor: '#633689',
        },
        labelStyle: {
          textAlign: 'center',
        },
        indicatorStyle: {
          borderBottomColor: '#87B56A',
          borderBottomWidth: 2,
        },
      }}
    >
      <Tab.Screen
        name="MapContainer"
        component={MapViewContainer}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="globe" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ListView"
        component={MapViewContainer}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="list" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default SearchNavigator
