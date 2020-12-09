import React, { useState, useCallback } from 'react'
import { Text, View } from '../../components'
import { Pressable, TextInput, Platform } from 'react-native'
import { CommonActions } from '@react-navigation/native'
import { useMutation } from '@apollo/client'
import { REGISTER_CLIENT } from './queries'
import styled from 'styled-components/native'

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
  height: auto;
  justify-content: center;
  width: 100%;
  margin-bottom: 5%;
`

const Title = styled.Text`
  color: black;
  height: auto;
  margin-top: 15%;
  margin-left: 10%;
  letter-spacing: -0.54px;
  font-size: 36px;
  font-family: Comfortaa_500Medium;
`
const ErrorText = styled.Text`
  color: red;
  height: auto;
  font-size: 12px;
  font-family: Comfortaa_500Medium;
  margin-bottom: 20px;
`

const InputContainer = styled.View`
  background-color: white;
  height: auto;
  align-items: center;
  width: 100%;
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
  margin-top: 16px;
  margin-bottom: 16px;
  align-items: center;
  justify-content: center;
  width: 90%;
`

const MainText = styled.Text`
  text-align: center;
  color: white;
  width: 100px;
  text-align: center;
  font-size: 18px;
  font-family: Comfortaa_500Medium;
`

const TermsContainer = styled.View`
  background-color: white;
  height: auto;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const Terms = styled.Text`
  color: black;
  margin-left: 5%;
  width: 95%;
  font-size: 13px;
  font-family: Comfortaa_500Medium;
`

const ClientFinalView = (props) => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState(false)

  const [register] = useMutation(REGISTER_CLIENT)
  const { navigation } = props
  const { username, password, firstName, lastName } = props.route.params

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

  const signUp = async (_) => {
    if (email === '' || email.length < 4 || !email.includes('@')) {
      setError(true)
      return
    }
    const input = {
      username: username,
      email: email,
      password: password,
    }
    const attributeInput = {
      first_name: firstName,
      last_name: lastName,
    }
    await register({
      variables: {
        input: input,
        attributeInput: attributeInput,
      },
    }).then(
      (res) => {
        ;(async () => await asClient())()
        toMain()
      },
      (err) => {
        console.log('error')
        setError(true)
      }
    )
  }

  return (
    <Body>
      <TitleContainer>
        <Title>last step...</Title>
      </TitleContainer>
      {error && <ErrorText>something went wrong!</ErrorText>}
      <InputContainer>
        <Input
          placeholder={'email'}
          onChangeText={(email) => setEmail(email)}
          value={email}
          keyboardType={'email-address'}
        ></Input>
      </InputContainer>
      <ButtonContainer>
        <MainButton android_ripple={{ color: 'white' }} onPress={signUp}>
          <MainText>sign up</MainText>
        </MainButton>
      </ButtonContainer>
      <TermsContainer>
        <Terms>
          By signing up, you agree to goodlook's Terms of Service and Privacy
          Policy
        </Terms>
      </TermsContainer>
    </Body>
  )
}

export default ClientFinalView
