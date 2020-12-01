import React, { useState } from 'react'
import { Text, View } from '../../components'
import { Pressable } from 'react-native'
import styled from 'styled-components/native'
import { asGuest } from '../../utils'
import v0_42 from '../../components/assests/images/v0_42.png'

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
  height: 35%;
  justify-content: center;
  width: 100%;
  margin-bottom: 10%;
`

const Title = styled.Text`
  color: black;
  height: auto;
  margin-left: 5%;
  letter-spacing: -0.54px;
  font-size: 36px;
  font-family: Comfortaa_500Medium;
`

const Subtitle = styled.Text`
  color: black;
  height: auto;
  margin-left: auto;
  margin-right: 5%;
  letter-spacing: -0.54px;
  font-size: 36px;
  font-family: Comfortaa_500Medium;
`

const Divider = styled.View`
  height: 3px;
  width: 80%;
  border-radius: 6px;
  background-color: black;
  margin-top: 10%;
  margin-bottom: 10%;
`

const MainButton = styled.Pressable`
  background-color: white;
  border: 2px solid black;
  border-radius: 6px;
  height: 52px;
  align-items: center;
  justify-content: center;
  width: 90%;
`

const MainText = styled.Text`
  text-align: center;
  color: black;
  width: 100px;
  margin-bottom: 6px;
  font-size: 18px;
  font-family: Comfortaa_500Medium;
`

const UserForkView = ({ navigation }) => {
  console.log('userfork')

  const toClientSignUp = () => {
    navigation.navigate('ClientSignUp')
  }

  const toProviderSignUp = () => {
    navigation.navigate('ProviderSignUp')
  }

  return (
    <Body>
      <TitleContainer>
        <Title>get started</Title>
        <Subtitle>are you a...</Subtitle>
      </TitleContainer>
      <MainButton android_ripple={{ color: 'black' }} onPress={toClientSignUp}>
        <MainText>client</MainText>
      </MainButton>
      <Divider />
      <MainButton
        android_ripple={{ color: 'black' }}
        onPress={toProviderSignUp}
      >
        <MainText>provider</MainText>
      </MainButton>
    </Body>
  )
}

export default UserForkView
