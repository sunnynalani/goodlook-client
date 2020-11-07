import React, { useState } from 'react'
import {
  Button,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from '../../components'
import { useMutation } from '@apollo/client'
import { LOGIN_CLIENT } from './queries'
import styles from './styles'

const LoginView = ({ navigation }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState(null)

  //Need to add theme to app for this to work...
  const isError = (fieldType) => {
    if (
      (fieldType === 'usernameOrEmail' &&
        errors.find((error) => {
          error.field === 'username' || error.field === 'email'
        })) ||
      (fieldType === 'password' &&
        errors.find((error) => {
          e
          rror.field === 'password'
        }))
    )
      return true
    return false
  }

  //express-session broken atm...
  const [login] = useMutation(LOGIN_CLIENT, {
    variables: {
      usernameOrEmail: usernameOrEmail,
      password: password,
    },
    onError: (err) => {
      console.log(err.message)
    },
    onCompleted: (data) => {
      if (data.loginClient.errors) setErrors(data.loginClient.errors)
      navigation.navigate('Main')
    },
  })

  const logInButton = () => {
    navigation.navigate('Log In')
  }

  const toForgotPswd = () => {
    navigation.navigate('ForgotPassword')
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleTextContainer}>
        {errors &&
          errors.map((error, index) => (
            <Text key={index} style={styles.errorText}>
              {error.message}
            </Text>
          ))}
        <TextInput
          label="Username or Email"
          value={usernameOrEmail}
          onChangeText={setUsernameOrEmail}
          error={errors && isError()}
          style={{ margin: 16 }}
        />
        {/* <br></br> */}
        <TextInput
          secureTextEntry={true}
          label="Password"
          value={password}
          onChangeText={setPassword}
          error={errors && isError()}
          style={{ margin: 16 }}
        />
        {/* <br></br>   */}
        <View>
          <Button
            mode="contained"
            onPress={login}
            accessibilityLabel="Log In button"
            theme={{ roundness: 10 }}
            style={{ width: 150, margin: 16 }}
          >
            <View>
              <Text style={styles.lgText}>Log In</Text>
            </View>
          </Button>
        </View>
      </View>
      <View style={styles.subtitleContainer}>
        <View>
          <TouchableOpacity onPress={toForgotPswd}>
            <Text style={styles.guestText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default LoginView
