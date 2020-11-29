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
  margin-bottom: 16px;
`

const Title = styled.Text`
  color: black;
  height: auto;
  margin-top: 10%;
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

const ButtonContainer = styled.View`
  background-color: white;
  height: auto;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const MainButton = styled.Pressable`
  background-color: white;
  border: 2px solid black;
  border-radius: 6px;
  margin-top: 30px;
  align-items: center;
  justify-content: center;
  height: 90px;
  width: 90px;
  ${({ selected }) =>
    selected &&
    `
    background-color: #d3d3d3;
  `}
`

const MainButtonLeft = styled.Pressable`
  background-color: white;
  border: 2px solid black;
  border-radius: 6px;
  margin-top: 30px;
  align-items: center;
  justify-content: center;
  height: 90px;
  width: 90px;
  margin-right: 5%;
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
  margin-top: 30px;
  align-items: center;
  justify-content: center;
  height: 90px;
  width: 90px;
  margin-left: 5%;
  ${({ selected }) =>
    selected &&
    `
    background-color: #d3d3d3;
  `}
`

const MainText = styled.Text`
  text-align: center;
  color: black;
  width: 100px;
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
  margin-top: 15%;
`

const LongButton = styled.Pressable`
  background-color: black;
  height: 52px;
  border-radius: 6px;
  margin-top: 30px;
  align-items: center;
  justify-content: center;
  width: 90%;
`

const LongText = styled.Text`
  text-align: center;
  color: white;
  width: 100px;
  margin-bottom: 6px;
  font-size: 18px;
  font-family: Comfortaa_500Medium;
`

const CategoryView = (props) => {
  //probably better to use a reducer but whatever
  const [selected, setSelected] = useState({
    nail: false,
    lashes: false,
    hair: false,
    brows: false,
    wax: false,
    makeup: false,
    other: true,
  })

  const { navigation } = props
  const { username, email, password } = props.route.params

  const toAttributes = () => {
    navigation.navigate('Attributes', {
      username: username,
      email: email,
      password: password,
      selected: selected,
    })
  }

  const skipToAttributes = () => {
    navigation.navigate('Attributes', {
      username: username,
      email: email,
      password: password,
      selected: { other: true },
    })
  }

  return (
    <Body>
      <TitleContainer>
        <Title>step 2</Title>
        <Subtitle>your services?</Subtitle>
      </TitleContainer>
      <ButtonContainer>
        <MainButtonLeft
          android_ripple={{ color: 'black' }}
          selected={selected.nail}
          onPress={() =>
            setSelected({
              ...selected,
              nail: !selected.nail,
            })
          }
        >
          <MainText>NAILS</MainText>
        </MainButtonLeft>
        <MainButton
          android_ripple={{ color: 'black' }}
          selected={selected.lashes}
          onPress={() =>
            setSelected({
              ...selected,
              lashes: !selected.lashes,
            })
          }
        >
          <MainText>LASHES</MainText>
        </MainButton>
        <MainButtonRight
          android_ripple={{ color: 'black' }}
          selected={selected.hair}
          onPress={() =>
            setSelected({
              ...selected,
              hair: !selected.hair,
            })
          }
        >
          <MainText>HAIR</MainText>
        </MainButtonRight>
      </ButtonContainer>
      <ButtonContainer>
        <MainButtonLeft
          android_ripple={{ color: 'black' }}
          selected={selected.brows}
          onPress={() =>
            setSelected({
              ...selected,
              brows: !selected.brows,
            })
          }
        >
          <MainText>BROWS</MainText>
        </MainButtonLeft>
        <MainButton
          android_ripple={{ color: 'black' }}
          selected={selected.wax}
          onPress={() =>
            setSelected({
              ...selected,
              wax: !selected.wax,
            })
          }
        >
          <MainText>WAX</MainText>
        </MainButton>
        <MainButtonRight
          android_ripple={{ color: 'black' }}
          selected={selected.makeup}
          onPress={() =>
            setSelected({
              ...selected,
              makeup: !selected.makeup,
            })
          }
        >
          <MainText>MAKEUP</MainText>
        </MainButtonRight>
      </ButtonContainer>
      <LongContainer>
        <LongButton android_ripple={{ color: 'white' }} onPress={toAttributes}>
          <LongText>next</LongText>
        </LongButton>
        <LongButton
          android_ripple={{ color: 'white' }}
          onPress={skipToAttributes}
        >
          <LongText>skip</LongText>
        </LongButton>
      </LongContainer>
    </Body>
  )
}

export default CategoryView
