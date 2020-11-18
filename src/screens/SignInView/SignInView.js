import React from 'react'
import PropTypes from 'prop-types'
import { Text, View, TouchableOpacity } from '../../components'
import { LinearGradient } from 'expo-linear-gradient'
import { asGuest } from '../../utils'
import styles from './styles'

const SignInView = ({ navigation }) => {
  const toLogin = () => {
    navigation.navigate('Login')
  }

  const toSignUp = () => {
    navigation.navigate('SignUp')
  }

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
      <View style={styles.titleTextContainer}>
        <Text style={styles.titleText}>good look</Text>
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
          <TouchableOpacity onPress={() => asGuest(navigation)}>
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
