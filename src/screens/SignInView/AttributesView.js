import React, { useState, useCallback } from 'react'
import { Text, View } from '../../components'
import {
  KeyboardAvoidingView,
  Pressable,
  TextInput,
  Platform,
} from 'react-native'
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
  margin-bottom: 2.5%;
`

const Title = styled.Text`
  color: black;
  height: auto;
  margin-top: 10%;
  marginleft: 10%;
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

const ButtonContainer = styled.View`
  background-color: white;
  height: auto;
  flex-direction: row
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 2%;
`

const MainButtonLeft = styled.Pressable`
  background-color: white;
  border: 2px solid black;
  border-radius: 6px;
  margin-top: 15px;
  align-items: center;
  justify-content: center;
  height: 52px;
  width: 42.5%;
  margin-left: 5%;
  ${({ selected }) =>
    selected &&
    `
    background-color: #d3d3d3;
  `}
`

const MainButtonRight = styled.Pressable`
  background-color: white;
  border: 2px solid black;
  border-radius: 6px;
  margin-top: 15px;
  align-items: center;
  justify-content: center;
  height: 52px;
  width: 42.5%;
  margin-right: 5%;
  ${({ selected }) =>
    selected &&
    `
    background-color: #d3d3d3;
  `}
`

const MainText = styled.Text`
  text-align: center;
  color: black;
  width: auto;
  margin-bottom: 6px;
  text-align: center;
  font-size: 18px;
  font-family: Comfortaa_500Medium;
`

const LongContainer = styled.View`
  background-color: white;
  height: auto;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 14px;
`

const LongButton = styled.Pressable`
  background-color: black;
  height: 52px;
  border-radius: 6px;
  margin-top: 25px;
  align-items: center;
  justify-content: center;
  width: 90%;
`

const LongText = styled.Text`
  text-align: center;
  color: white;
  width: 100px;
  margin-bottom: 6px;
  text-align: center;
  font-size: 18px;
  font-family: Comfortaa_500Medium;
`

const DEFAULT_ATTRIBUTES = {
  bike_parking: false,
  accepts_bitcoin: false,
  accepts_credit_cards: false,
  garage_parking: false,
  street_parking: false,
  dogs_allowed: false,
  wheelchair_accessible: false,
  valet_parking: false,
  parking_lot: false,
  flexible_timing: false,
  licensed: false,
}

const AttributesView = (props) => {
  //probably better to use a reducer but whatever
  const [attributes, setAttributes] = useState(DEFAULT_ATTRIBUTES)

  const { navigation } = props
  const { username, email, password, selected } = props.route.params

  const toAddress = () => {
    navigation.navigate('Address', {
      username: username,
      email: email,
      password: password,
      selected: selected,
      attributes: attributes,
    })
  }

  const skipToAddress = () => {
    navigation.navigate('Address', {
      username: username,
      email: email,
      password: password,
      selected: selected,
      attributes: DEFAULT_ATTRIBUTES,
    })
  }

  return (
    <Body>
      <TitleContainer>
        <Title>step 3</Title>
        <Subtitle>you allow/have...</Subtitle>
      </TitleContainer>
      <ButtonContainer>
        <MainButtonLeft
          android_ripple={{ color: 'black' }}
          selected={attributes.street_parking}
          onPress={() =>
            setAttributes({
              ...attributes,
              street_parking: !attributes.street_parking,
            })
          }
        >
          <MainText>street parking</MainText>
        </MainButtonLeft>
        <MainButtonRight
          android_ripple={{ color: 'black' }}
          selected={attributes.garage_parking}
          onPress={() =>
            setAttributes({
              ...attributes,
              garage_parking: !attributes.garage_parking,
            })
          }
        >
          <MainText>garage parking</MainText>
        </MainButtonRight>
      </ButtonContainer>
      <ButtonContainer>
        <MainButtonLeft
          android_ripple={{ color: 'black' }}
          selected={attributes.bike_parking}
          onPress={() =>
            setAttributes({
              ...attributes,
              bike_parking: !attributes.bike_parking,
            })
          }
        >
          <MainText>bike parking</MainText>
        </MainButtonLeft>
        <MainButtonRight
          android_ripple={{ color: 'black' }}
          selected={attributes.wheelchair_accessible}
          onPress={() =>
            setAttributes({
              ...attributes,
              wheelchair_accessible: !attributes.wheelchair_accessible,
            })
          }
        >
          <MainText>wheelchairs</MainText>
        </MainButtonRight>
      </ButtonContainer>
      <ButtonContainer>
        <MainButtonLeft
          android_ripple={{ color: 'black' }}
          selected={attributes.dogs_allowed}
          onPress={() =>
            setAttributes({
              ...attributes,
              dogs_allowed: !attributes.dogs_allowed,
            })
          }
        >
          <MainText>dogs allowed</MainText>
        </MainButtonLeft>
        <MainButtonRight
          android_ripple={{ color: 'black' }}
          selected={attributes.accepts_credit_cards}
          onPress={() =>
            setAttributes({
              ...attributes,
              accepts_credit_cards: !attributes.accepts_credit_cards,
            })
          }
        >
          <MainText>credit cards</MainText>
        </MainButtonRight>
      </ButtonContainer>
      <ButtonContainer>
        <MainButtonLeft
          android_ripple={{ color: 'black' }}
          selected={attributes.flexible_timing}
          onPress={() =>
            setAttributes({
              ...attributes,
              flexible_timing: !attributes.flexible_timing,
            })
          }
        >
          <MainText>flexible timing</MainText>
        </MainButtonLeft>
        <MainButtonRight
          android_ripple={{ color: 'black' }}
          selected={attributes.licensed}
          onPress={() =>
            setAttributes({
              ...attributes,
              licensed: !attributes.licensed,
            })
          }
        >
          <MainText>license</MainText>
        </MainButtonRight>
      </ButtonContainer>
      <LongContainer>
        <LongButton android_ripple={{ color: 'white' }} onPress={toAddress}>
          <LongText>next</LongText>
        </LongButton>
        <LongButton android_ripple={{ color: 'white' }} onPress={skipToAddress}>
          <LongText>skip</LongText>
        </LongButton>
      </LongContainer>
    </Body>
  )
}

export default AttributesView
