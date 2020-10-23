import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import HomeView from '../screens/HomeView/HomeView'
import ProfileView from '../screens/ProfileView/ProfileView'
import MapView from '../screens/MapView/MapView'
import ListView from '../screens/ListView/ListView'
import NotificationView from '../screens/NotificationView/NotificationView'

const Tab = createMaterialBottomTabNavigator()

const BottomNavigator = React.memo(() => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor='#e91e63' //change later
      style={{ backgroundColor: 'tomato' }} //change later
    >
      <Tab.Screen 
        name='Home' 
        component={HomeView} 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='home' color={color} size={26} />
          )
        }}
      />
      <Tab.Screen 
        name='Map' 
        component={MapView}
        options={{
          tabBarLabel: 'Map',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='map-search-outline' color={color} size={26} />
          )
        }}
      />
      <Tab.Screen 
        name='List' 
        component={ListView}
        options={{
          tabBarLabel: 'List',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='format-list-bulleted' color={color} size={26} />
          )
        }}
      />
      <Tab.Screen 
        name='Profile' 
        component={ProfileView}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='account' color={color} size={26} />
          )
        }}
      />
      <Tab.Screen 
        name='Notification' 
        component={NotificationView}
        options={{
          tabBarLabel: 'Notification',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='bell' color={color} size={26} />
          )
        }}
      />
    </Tab.Navigator>
  )
})

export default BottomNavigator