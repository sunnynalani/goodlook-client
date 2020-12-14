import React from 'react'
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
  margin-bottom: 50%;
  margin-top: 40%;
`

const Title = styled.Text`
  color: black;
  height: auto;
  text-align: center;
  letter-spacing: -0.54px;
  font-size: 36px;
  font-family: Comfortaa_500Medium;
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
  width: auto;
  text-align: center;
  font-size: 18px;
  font-family: Comfortaa_500Medium;
`

const TermsContainer = styled.View`
  background-color: white;
  height: auto;
  justify-content: center;
  align-items: center;
  width: auto;
`

const Terms = styled.Text`
  color: black;
  text-align: center;
  width: auto;
  font-size: 13px;
  font-family: Comfortaa_500Medium;
`

const NotificationView = (props) => {
  const toSignUp = (_) => {
    props.navigation.navigate('SignIn')
  }

  return (
    <Body>
      <TitleContainer>
        <Title>messages?</Title>
      </TitleContainer>
      <ButtonContainer>
        <MainButton android_ripple={{ color: 'white' }} onPress={toSignUp}>
          <MainText>back to sign up</MainText>
        </MainButton>
      </ButtonContainer>
      <TermsContainer>
        <Terms>just wait, coming soon!</Terms>
      </TermsContainer>
    </Body>
  )
}

export default NotificationView
