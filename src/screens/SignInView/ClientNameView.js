import React, { useState, useCallback } from 'react'
import { Text, View } from '../../components'
import { Pressable, TextInput, Platform } from 'react-native'
import styled from 'styled-components/native'

const Body = styled.View`
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

const ClientNameView = (props) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const { username, password } = props.route.params

  const toClientFinal = () => {
    props.navigation.navigate('ClientFinal', {
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
    })
  }

  return (
    <Body behavior={'padding'}>
      <TitleContainer>
        <Title>step 2</Title>
        <Subtitle>personal information</Subtitle>
      </TitleContainer>
      <InputContainer behavior="padding" enabled>
        <Input
          placeholder={'first name'}
          onChangeText={(fn) => setFirstName(fn)}
          value={firstName}
        ></Input>
        <Input
          placeholder={'last name'}
          onChangeText={(ln) => setLastName(ln)}
          value={lastName}
        ></Input>
      </InputContainer>
      <ButtonContainer>
        <MainButton android_ripple={{ color: 'white' }} onPress={toClientFinal}>
          <MainText>next</MainText>
        </MainButton>
      </ButtonContainer>
    </Body>
  )
}

export default ClientNameView
