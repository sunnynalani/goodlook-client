import React, { useState, useEffect, useCallback } from 'react'
import { ScrollView } from '../../components'
import { View, Text, Pressable, TextInput, Platform } from 'react-native'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import { useQuery, useLazyQuery } from '@apollo/client'
import SearchTable from './SearchTable'
import { Dimensions } from 'react-native'
import { BlurView } from 'expo-blur'
import styles from './styles'
import { bgImages, avatarImages, distance } from '../../utils'
import styled from 'styled-components/native'

const Body = styled.ScrollView`
  background-color: white;
  height: auto;
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

const CardContainer = styled.Pressable`
  background-color: white;
  height: 85px;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: row;
  border-bottom-width: 0.5px;
  border-bottom-color: #d3d3d3;
`

const Avatar = styled.Image`
  background-color: transparent;
  height: 56px;
  width: 56px;
  border-radius: 28px;
`

const InnerContainer = styled.View`
  background-color: transparent;
  height: 100px;
  align-items: center;
  justify-content: center;
  width: 20%;
`

const InnerMiddleContainer = styled.View`
  background-color: transparent;
  height: 100px;
  align-items: center;
  justify-content: center;
  width: 31.5%;
`

const InnerEndContainer = styled.View`
  background-color: transparent;
  height: 100px;
  align-items: center;
  justify-content: center;
  width: 17%;
`

const DistanceText = styled.Text`
  text-align: center;
  color: black;
  width: auto;
  font-size: 18px;
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

const ListView = ({ navigation, providerData, location }) => {
  const toBook = useCallback(
    (_) => {
      navigation.navigate('Book')
    },
    [navigation]
  )

  const toProviderPage = useCallback(
    (_) => {
      navigation.navigate('Book')
    },
    [navigation]
  )

  console.log(providerData)

  return (
    <Body>
      {providerData && !providerData.providers && (
        <Text>No providers found...</Text>
      )}
      {providerData &&
        providerData.providers.map((provider, index) => {
          return (
            <ProviderCard
              key={index}
              index={index}
              data={provider}
              img={bgImages[index]}
              toBook={toBook}
              toProviderPage={toProviderPage}
              location={location}
            />
          )
        })}
    </Body>
  )
}

const ProviderCard = React.memo(
  ({ data, img, index, toBook, toProviderPage, location }) => {
    return (
      <CardContainer
        android_ripple={{ color: 'gray' }}
        onPress={() => console.log(data)}
      >
        <InnerContainer>
          <Avatar source={avatarImages[index]} />
        </InnerContainer>
        <InnerMiddleContainer></InnerMiddleContainer>
        <InnerMiddleContainer></InnerMiddleContainer>
        <InnerEndContainer>
          <DistanceText>
            {distance(
              location.latitude,
              location.longitude,
              data.latitude,
              data.longitude
            ).toFixed(2)}
            m
          </DistanceText>
        </InnerEndContainer>
      </CardContainer>
    )
  }
)

export default ListView
