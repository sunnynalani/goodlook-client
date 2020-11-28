import React, { useState } from 'react'
import {
  Button,
  TextInput,
  Text,
  View,
  Surface,
  TouchableOpacity,
} from '../../components'
import { LinearGradient } from 'expo-linear-gradient'
import styles from './styles'

const ClientSignUpView = ({ navigation }) => {
  console.log('ClientSignUpView')

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#54b17d', '#54b17d']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: '100%',
        }}
      />
      <View styles={{ flexDirection: 'row' }}></View>
      <View styles={{ flexDirection: 'row' }}></View>
    </View>
  )
}

export default ClientSignUpView
