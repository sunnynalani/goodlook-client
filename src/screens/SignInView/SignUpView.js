import React, { useState } from 'react'
import {
  Button,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from '../../components'
import { LinearGradient } from 'expo-linear-gradient'
import { useMutation } from '@apollo/client'
import { REGISTER_CLIENT } from './queries'
import styles from './styles'

/**
 *
 * First iteration of the sign up view
 * refactored...
 *
 */
const SignUpView = ({ navigation }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState(null)

  const isError = (fieldType) => {
    if (
      (fieldType === 'firstName' &&
        errors.find((error) => {
          error.field === 'firstName'
        })) ||
      (fieldType === 'lastName' &&
        errors.find((error) => {
          error.field === 'lastName'
        })) ||
      (fieldType === 'username' &&
        errors.find((error) => {
          error.field === 'username'
        })) ||
      (fieldType === 'email' &&
        errors.find((error) => {
          error.field === 'email'
        })) ||
      (fieldType === 'password' &&
        errors.find((error) => {
          error.field === 'password'
        }))
    )
      return true
    return false
  }

  const [register] = useMutation(REGISTER_CLIENT, {
    variables: {
      //input: UsernamePasswordInput,
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
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
        <Text style={styles.titleText}>Sign Up</Text>
        {/* <br></br> */}
        {errors &&
          errors.map((error, index) => (
            <Text key={index} style={styles.errorText}>
              {error.message}
            </Text>
          ))}
        <TextInput
          label="First Name"
          value={firstName}
          onChangeText={setFirstName}
          error={errors && isError()}
          style={{ margin: 16 }}
        />
        {/* <br></br> */}
        <TextInput
          label="Last Name"
          value={lastName}
          onChangeText={setLastName}
          error={errors && isError()}
          style={{ margin: 16 }}
        />
        {/* <br></br> */}
        <TextInput
          label="Username"
          value={username}
          onChangeText={setUsername}
          error={errors && isError()}
          style={{ margin: 16 }}
        />
        {/* <br></br> */}
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
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
            onPress={register}
            accessibilityLabel="Sign Up Button"
            theme={{ roundness: 10 }}
            style={{ width: 150, margin: 16 }}
          >
            <View>
              <Text style={{ color: 'black' }}>Sign Up</Text>
            </View>
          </Button>
        </View>
      </View>
    </View>
  )
}

export default SignUpView
