import React from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { GUEST_KEY } from '../../components/assests/constants'
import PropTypes from 'prop-types'
import { Text, View, TouchableOpacity } from '../../components'
import styles from './styles'

const SignInView = ({ navigation }) => {
  const toLogin = () => {
    navigation.navigate('Login')
  }

  const toSignUp = () => {
    navigation.navigate('SignUp')
  }

  const asGuest = async () => {
    try {
      await AsyncStorage.setItem(GUEST_KEY, '1')
      navigation.navigate('Main')
    } catch (error) {
      console.error('Unexpected Error')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleTextContainer}>
        <Text style={styles.titleText}>Good Look</Text>
        <View style={styles.lineStyle} />
      </View>
      <View style={styles.subtitleContainer}>
        <View>
          <TouchableOpacity onPress={toLogin}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.plainSubtext}> Don't have an account? </Text>
          <TouchableOpacity onPress={toSignUp}>
            <Text style={styles.signUpText}>Sign up</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={asGuest}>
            <Text style={styles.guestText}>or browse as guest</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

SignInView.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

export default SignInView
