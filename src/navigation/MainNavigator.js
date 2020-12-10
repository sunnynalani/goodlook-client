import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import SearchNavigator from './SearchNavigator'
import { ProfileView } from '../screens/ProfileView'
import BookView from '../screens/BookView/BookView'
import NotificationView from '../screens/NotificationView/NotificationView'

const Tab = createMaterialBottomTabNavigator()

export const MainNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Search"
      activeColor="white" //change later
      barStyle={{ backgroundColor: 'black' }} //change later
      tabBarOptions={
        {
          //showLabel: false
        }
      }
    >
      <Tab.Screen
        name="Search"
        component={SearchNavigator}
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
