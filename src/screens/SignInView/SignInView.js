import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { asGuest, removeAllKeys } from '../../utils'
import v0_42 from '../../components/assests/images/v0_42.png'
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

const HeaderImage = styled.View`
  background-color: transparent;
  flex-shrink: 0;
  height: 75%;
  margin-bottom: 20px;
  position: relative;
  width: 100%;
`

const BackgroundImage = styled.Image`
  background-color: transparent;
  height: 100%;
  left: 0px;
  position: absolute;
  top: 0px;
  width: 100%;
`

const Title = styled.Text`
  background-color: transparent;
  height: 100%;
  left: 90px;
  letter-spacing: -0.72px;
  position: absolute;
  text-align: center;
  top: 130px;
  width: auto;
  font-size: 48px;
  font-family: Comfortaa_500Medium;
`

const GuestButton = styled.Pressable`
  background-color: black;
  border-radius: 6px;
  height: 52px;
  align-items: center;
  justify-content: center;
  width: 90%;
`

const GuestText = styled.Text`
  text-align: center;
  color: white;
  width: 100px;
  margin-bottom: 6px;
  font-size: 18px;
  font-family: Comfortaa_500Medium;
`

const ButtonContainer = styled.View`
  background-color: transparent;
  justify-content: center;
  flex-direction: row;
  flex-shrink: 0;
  height: 52px;
  margin-left: 2px;
  margin-top: 16px;
  width: 100%;
`

const LoginButton = styled.Pressable`
  background-color: white;
  border: 2px solid black;
  border-radius: 6px;
  height: 52px;
  justify-content: center;
  align-items: center;
  width: 40%;
  margin-right: 2.5%;
`

const RegisterButton = styled.Pressable`
  background-color: white;
  border: 2px solid black;
  border-radius: 6px;
  height: 52px;
  justify-content: center;
  align-items: center;
  width: 45%;
  margin-left: 2.5%;
`

const ButtonText = styled.Text`
  text-align: center;
  color: black;
  width: 100px;
  font-size: 18px;
  margin-bottom: 6px;
  font-family: Comfortaa_500Medium;
`

const SignInView = ({ navigation }) => {
  const clearStorage = async () => {
    try {
      await removeAllKeys()
    } catch (error) {
      console.error('Unexpected Error')
    }
  }

  const toLogin = () => {
    navigation.navigate('Login')
  }

  const toSignUp = () => {
    navigation.navigate('UserFork')
  }

  clearStorage()

  return (
    <Body>
      <HeaderImage>
        <BackgroundImage source={v0_42} />
        <Title>goodlook</Title>
      </HeaderImage>
      <GuestButton
        android_ripple={{ color: 'white' }}
        onPress={() => asGuest(navigation)}
      >
        <GuestText>guest</GuestText>
      </GuestButton>
      <ButtonContainer>
        <LoginButton android_ripple={{ color: 'black' }} onPress={toLogin}>
          <ButtonText>login</ButtonText>
        </LoginButton>
        <RegisterButton android_ripple={{ color: 'black' }} onPress={toSignUp}>
          <ButtonText>register</ButtonText>
        </RegisterButton>
      </ButtonContainer>
    </Body>
  )
}

SignInView.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

export default SignInView
