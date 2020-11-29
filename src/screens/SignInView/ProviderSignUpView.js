import React, { useState, useCallback } from 'react'
import { Text, View } from '../../components'
import {
  KeyboardAvoidingView,
  Pressable,
  TextInput,
  Platform,
} from 'react-native'
import styled from 'styled-components/native'

const Body = styled.KeyboardAvoidingView`
  align-items: center;
  background-color: white;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
`

const TitleContainer = styled.View`
  background-color: white;
  flex: 0.7;
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

const Subtitle = styled.Text`
  color: black;
  height: auto;
  text-align: center;
  letter-spacing: -0.54px;
  font-size: 24px;
  font-family: Comfortaa_500Medium;
`

const InputContainer = styled.View`
  background-color: white;
  height: auto;
  align-items: center;
  width: 100%;
  margin-bottom: 10%;
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

const ProviderSignUpView = ({ navigation }) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [errors, setErrors] = useState(false)

  const toCategory = () => {
    if (
      username.length <= 3 ||
      username.length >= 18 ||
      email.length <= 0 ||
      password.length <= 8 ||
      repeatPassword.length <= 8 ||
      !email.includes('@') ||
      password !== repeatPassword
    ) {
      setErrors(true)
      return
    }
    navigation.navigate('Category', {
      username: username,
      email: email,
      password: password,
    })
  }

  return (
    <Body behavior={'padding'}>
      <TitleContainer>
        <Title>step 1</Title>
        <Subtitle>basic information</Subtitle>
      </TitleContainer>
      {errors && (
        <>
          <ErrorText>
            username must be at least 4 characters{'\n'}
            password must be at least 8 characters
          </ErrorText>
        </>
      )}
      <InputContainer behavior="padding" enabled>
        <Input
          placeholder={errors.username ? 'invalid input' : 'username'}
          onChangeText={(username) => setUsername(username)}
          value={username}
        ></Input>
        <Input
          placeholder={errors.email ? 'invalid input' : 'email'}
          onChangeText={(email) => setEmail(email)}
          value={email}
          keyboardType={'email-address'}
        ></Input>
        <Input
          placeholder={errors.passwords ? 'invalid input' : 'password'}
          onChangeText={(password) => setPassword(password)}
          value={password}
          secureTextEntry
        ></Input>
        <Input
          placeholder={errors.passwords ? 'invalid input' : 'repeat password'}
          onChangeText={(repeatPassword) => setRepeatPassword(repeatPassword)}
          value={repeatPassword}
          secureTextEntry
        ></Input>
      </InputContainer>
      <ButtonContainer>
        <MainButton android_ripple={{ color: 'white' }} onPress={toCategory}>
          <MainText>next</MainText>
        </MainButton>
      </ButtonContainer>
    </Body>
  )
}

export default ProviderSignUpView
