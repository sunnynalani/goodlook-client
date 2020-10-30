import React from 'react'
import { Button, TextInput } from 'react-native-paper'
import { Text, View, TouchableOpacity } from '../../components'
import styles from './styles'

/**
 *
 * MAKE LOGIN UP VIEW HERE
 */

const LoginView = ({ navigation }) => {
  const logInButton = () => {
    navigation.navigate('Log In')
  }

  const toForgotPswd = () => {
    navigation.navigate('ForgotPassword')
  }
  return (
    <View style={styles.container}>
      <View style={styles.titleTextContainer}>
        <TextInput label="Email" style={{ margin: 16 }} />
        {/* <br></br> */}
        <TextInput
          secureTextEntry={true}
          label="Password"
          style={{ margin: 16 }}
        />
        {/* <br></br>   */}
        <View>
          <Button
            mode="contained"
            onPress={() => console.log('Pressed')}
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
