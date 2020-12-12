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
  flex: 1;
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
  margin-bottom: 30px;
  width: 100%;
`

const MainButton = styled.Pressable`
  background-color: black;
  height: 52px;
  border-radius: 6px;
  margin-top: 16px;
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

const AddressView = (props) => {
  const [country, setCountry] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [street, setStreet] = useState('')
  const [zipcode, setZipcode] = useState('')

  const { navigation } = props
  const { username, email, password, selected, attributes } = props.route.params

  const toProviderFinal = () => {
    navigation.navigate('ProviderFinal', {
      username: username,
      email: email,
      password: password,
      selected: selected,
      attributes: attributes,
      location: {
        country: country,
        state: state,
        city: city,
        street: street,
        zipcode: zipcode,
      },
    })
  }

  const skipToProviderFinal = () => {
    navigation.navigate('ProviderFinal', {
      username: username,
      email: email,
      password: password,
      selected: selected,
      attributes: attributes,
      location: {
        country: '',
        state: '',
        city: '',
        street: '',
        zipcode: '',
      },
    })
  }

  return (
    <Body behavior={'padding'}>
      <TitleContainer>
        <Title>step 4</Title>
        <Subtitle>location information</Subtitle>
      </TitleContainer>
      <InputContainer>
        <Input
          placeholder={'country'}
          onChangeText={(country) => setCountry(country)}
          value={country}
        ></Input>
        <Input
          placeholder={'state (if applicable)'}
          onChangeText={(state) => setState(state)}
          value={state}
        ></Input>
        <Input
          placeholder={'city'}
          onChangeText={(city) => setCity(city)}
          value={city}
        ></Input>
        <Input
          placeholder={'street'}
          onChangeText={(street) => setStreet(street)}
          value={street}
        ></Input>
        <Input
          placeholder={'zipcode'}
          onChangeText={(zipcode) => setZipcode(zipcode)}
          value={zipcode}
          keyboardType={'numeric'}
        ></Input>
      </InputContainer>
      <ButtonContainer>
        <MainButton
          android_ripple={{ color: 'white' }}
          onPress={toProviderFinal}
        >
          <MainText>next</MainText>
        </MainButton>
        <MainButton
          android_ripple={{ color: 'white' }}
          onPress={skipToProviderFinal}
        >
          <MainText>skip</MainText>
        </MainButton>
      </ButtonContainer>
    </Body>
  )
}

export default AddressView
