import React, { useState, useCallback } from 'react'
import { Text, View } from '../../components'
import { Pressable, TextInput, Platform } from 'react-native'
import { CommonActions } from '@react-navigation/native'
import { useMutation } from '@apollo/client'
import { REGISTER_PROVIDER } from './queries'
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
  marginleft: 10%;
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

const ProviderFinalView = (props) => {
  const [name, setName] = useState('')
  const [error, setError] = useState(false)
  const [register] = useMutation(REGISTER_PROVIDER)
  const { navigation } = props
  const {
    username,
    email,
    password,
    selected,
    attributes,
    location,
  } = props.route.params

  const toMain = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: 'SignIn' }, { name: 'Main' }],
      })
    )
  }

  const toStart = () => {
    navigation.navigate('ProviderSignUp')
  }

  const signUp = async (_) => {
    if (name === '') {
      setError(true)
      return
    }
    const providerInput = {
      name: name,
      country: location.country,
      state: location.state,
      city: location.city,
      street: location.street,
      zipcode: Number(location.zipcode),
    }
    const categories = Object.keys(selected)
      .map((category) => category)
      .filter((category) => {
        if (selected[category]) return category
      })
      .map((category) => category.toUpperCase())
    const attributesInput = {
      categories,
      ...attributes,
    }
    const input = {
      username: username,
      email: email,
      password: password,
    }
    console.log(categories)
    await register({
      variables: {
        providerInput: providerInput,
        attributesInput: attributesInput,
        input: input,
      },
    })
    toMain()
  }
  return (
    <Body>
      <TitleContainer>
        <Title>last step...</Title>
      </TitleContainer>
      {error && <ErrorText>something went wrong!</ErrorText>}
      <InputContainer>
        <Input
          placeholder={'establishment name'}
          onChangeText={(name) => setName(name)}
          value={name}
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

export default ProviderFinalView
