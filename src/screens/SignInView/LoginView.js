import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  Pressable,
  TextInput,
  Platform,
  TouchableOpacity,
} from 'react-native'
import { CommonActions } from '@react-navigation/native'
import { useMutation } from '@apollo/client'
import { LOGIN } from './queries'
import styled from 'styled-components/native'
import { asClient, asProvider } from '../../utils'
import AsyncStorage from '@react-native-community/async-storage'

const Body = styled.View`
  align-items: center;
  background-color: white;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-start;
  width: 100%;
`

const TitleContainer = styled.View`
  background-color: white;
  height: 30%;
  justify-content: center;
  width: 100%;
`

const Title = styled.Text`
  color: black;
  height: auto;
  margin-left: 10%;
  letter-spacing: -0.54px;
  font-size: 36px;
  font-family: Comfortaa_500Medium;
`

const InputContainer = styled.View`
  background-color: white;
  height: auto;
  align-items: center;
  width: 100%;
  margin-bottom: 15%;
`

const ErrorText = styled.Text`
  color: red;
  height: auto;
  font-size: 12px;
  font-family: Comfortaa_500Medium;
  margin-bottom: 20px;
`

const Input = styled.TextInput`
  border: 2px solid black;
  color: black;
  height: 52px;
  width: 90%;
  text-align: left;
  font-size: 15px;
  margin-bottom: 16px;
  font-family: Comfortaa_500Medium;
  padding: 15px;
`

const ButtonContainer = styled.View`
  background-color: white;
  height: auto;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const MainButton = styled.Pressable`
  background-color: black;
  height: 52px;
  border-radius: 6px;
  margin-top: 30px;
  margin-bottom: 5%;
  align-items: center;
  justify-content: center;
  width: 90%;
`

const MainText = styled.Text`
  text-align: center;
  color: white;
  width: 100px;
  margin-bottom: 6px;
  text-align: center;
  font-size: 18px;
  font-family: Comfortaa_500Medium;
`

const ForgetPWButton = styled.TouchableOpacity`
  background-color: white;
  height: auto;
  justify-content: center;
  align-items: center;
  width: auto;
`

const ForgetPWText = styled.Text`
  color: black;
  width: 90%;
  text-align: center;
  font-size: 15px;
  font-family: Comfortaa_500Medium;
  text-decoration: underline;
`

const LoginView = ({ navigation }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const verifyResponse = async (res) => {
    await asClient()
  }

  /**
   * Resets navigation with the specified path history
   * This is so that the user does not back to this page
   * once user creates an account
   */
  const toMain = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: 'SignIn' }, { name: 'Main' }],
      })
    )
  }

  const [login] = useMutation(LOGIN)

  const handleLogin = async () => {
    if (!usernameOrEmail || !password) {
      setError(true)
      return
    } else {
      await login({
        variables: {
          password: password,
          usernameOrEmail: usernameOrEmail,
        },
      }).then(
        ({ data }) => {
          if (data.loginClient) {
            if (data.loginClient.errors) {
              setError(true)
            } else {
              ;(async () => {
                try {
                  await AsyncStorage.clear()
                  await AsyncStorage.setItem('@user', '2')
                  await AsyncStorage.setItem(
                    '@client',
                    data.loginClient.client.id
                  )
                } catch (error) {
                  console.error('Unexpected Error')
                }
              })()
              toMain()
            }
          }
          if (data.loginProvider) {
            if (data.loginProvider.errors) {
              setError(true)
            } else {
              ;(async () => {
                try {
                  await AsyncStorage.clear()
                  await AsyncStorage.setItem('@user', '3')
                  await AsyncStorage.setItem(
                    '@provider',
                    data.loginProvider.provider.id
                  )
                } catch (error) {
                  console.error('Unexpected Error')
                }
              })()
              toMain()
            }
          }
        },
        (err) => {
          console.log(err.message)
          setError(true)
        }
      )
    }
  }

  const toForgotPswd = () => {
    //navigation.navigate('ForgotPassword')
  }

  return (
    <Body>
      <TitleContainer>
        <Title>login</Title>
      </TitleContainer>
      {error && <ErrorText>invalid credentials</ErrorText>}
      <InputContainer>
        <Input
          placeholder={'username or email'}
          onChangeText={(usernameOrEmail) =>
            setUsernameOrEmail(usernameOrEmail)
          }
          value={usernameOrEmail}
        ></Input>
        <Input
          placeholder={'password'}
          onChangeText={(password) => setPassword(password)}
          value={password}
          secureTextEntry
        ></Input>
      </InputContainer>
      <ButtonContainer>
        <MainButton android_ripple={{ color: 'white' }} onPress={handleLogin}>
          <MainText>log in</MainText>
        </MainButton>
      </ButtonContainer>
      <ForgetPWButton onPress={toForgotPswd}>
        <ForgetPWText>Forget Password?</ForgetPWText>
      </ForgetPWButton>
    </Body>
  )
}

export default LoginView
