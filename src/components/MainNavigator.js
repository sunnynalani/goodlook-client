import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import ProfileView from '../screens/ProfileView/ProfileView'
import MapView from '../screens/MapView/MapView'
import BookView from '../screens/BookView/BookView'
import NotificationView from '../screens/NotificationView/NotificationView'

const Tab = createMaterialBottomTabNavigator()

const MainNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Map"
      activeColor="white" //change later
      barStyle={{ backgroundColor: '#1B1B1B' }} //change later
      tabBarOptions={
        {
          //showLabel: false
        }
      }
    >
      <Tab.Screen
        name="Map"
        component={MapView}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="search" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationView}
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="message" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileView}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Book"
        component={BookView}
        options={{
          tabBarLabel: 'Bookings',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="calendar-o" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default MainNavigator
