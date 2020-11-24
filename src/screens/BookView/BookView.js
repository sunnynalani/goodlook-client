import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { BlurView } from 'expo-blur'

export const BookView = ({}) => {
  return (
    <BlurView intensity={100} style={StyleSheet.absoluteFill}>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 40 }}>Coming Soon</Text>
      </View>
    </BlurView>
  )
}

export default BookView
