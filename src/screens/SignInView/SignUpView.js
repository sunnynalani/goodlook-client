import React from 'react'
import { Button, TextInput } from 'react-native-paper'
import { Text, View } from '../../components'
import styles from './styles'

/**
 *
 * MAKE SIGN UP VIEW HERE
 */

const SignUpView = ({ navigation }) => {
  const toProfile = () => {
    navigation.navigate('Profile')
  }
  return (
    <View styles={styles.container}>
      <View styles={styles.titleTextContainer}>
        <TextInput label="First Name" style={{ margin: 16 }} />
        <TextInput label="Last Name" style={{ margin: 16 }} />
        <TextInput label="Email" style={{ margin: 16 }} />
        <TextInput
          secureTextEntry={true}
          label="Password"
          style={{ margin: 16 }}
        />
        <TextInput
          secureTextEntry={true}
          label="Confirm Password"
          style={{ margin: 16 }}
        />
        <View>
          <Button
            mode="contained"
            onPress={toProfile}
            accessibilityLabel="Sign Up button"
            theme={{ roundness: 10 }}
            style={{ width: 150, margin: 16 }}
          >
            <View>
              <Text style={styles.lgText}>Sign Up</Text>
            </View>
          </Button>
        </View>
      </View>
    </View>
  )
}

export default SignUpView
