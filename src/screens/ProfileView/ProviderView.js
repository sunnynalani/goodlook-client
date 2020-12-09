import React, { useState, useEffect, useReducer } from 'react'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import { useLazyQuery } from '@apollo/client'
import { Dimensions } from 'react-native'
import * as Location from 'expo-location'
import Slider from '@react-native-community/slider'
import { List } from 'react-native-paper'
import styled from 'styled-components/native'
import { bgImages, avatarImages, getUserType } from '../../utils'

import {
  Button,
  Checkbox,
  Paragraph,
  View,
  Dialog,
  Portal,
} from '../../components'

const Body = styled.ScrollView`
  background-color: transparent;
`

const ImageBackground = styled.Image`
  background-color: transparent;
  position: absolute;
  height: 160px;
  width: 100%;
  opacity: 0.1;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
`

const HeaderContainer = styled.View`
  margin-top: 35px;
  background-color: transparent;
  height: 140px;
  display: flex;
  flex-direction: row;
  width: 100%;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
`

const BodyContainer = styled.ScrollView`
  background-color: white;
`

const TitleContainer = styled.View`
  background-color: transparent;
  margin-left: 10px;
  height: auto;
  justify-content: center;
  width: 50%;
`

const Title = styled.Text`
  color: black;
  height: auto;
  letter-spacing: -0.2px;
  font-size: 30px;
  font-family: Comfortaa_700Bold;
`
const ErrorText = styled.Text`
  color: red;
  height: auto;
  font-size: 12px;
  font-family: Comfortaa_500Medium;
  margin-bottom: 20px;
`

const Avatar = styled.Image`
  background-color: transparent;
  height: 100px;
  width: 100px;
  border-radius: 50px;
`

const InnerContainer = styled.View`
  background-color: transparent;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5%;
  width: auto;
`

const InnerMiddleContainer = styled.View`
  background-color: transparent;
  height: 100px;
  align-items: center;
  justify-content: center;
  width: 34%;
`

const AttributeContainer = styled.View`
  background-color: transparent;
  height: 100px;
  align-items: center;
  justify-content: center;
  width: 27%;
`

const InnerEndContainer = styled.View`
  background-color: transparent;
  height: auto;
  margin-left: auto;
  margin-right: 5%;
  width: 20%;
`

const DistanceText = styled.Text`
  text-align: center;
  color: black;
  width: auto;
  font-size: 40px;
  font-family: Comfortaa_700Bold;
`

const LocationText = styled.Text`
  color: gray;
  width: auto;
  font-size: 16px;
  margin-bottom: 10px;
  font-family: Comfortaa_500Medium;
`

const RatingContainer = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
  width: auto;
  height: auto;
`

const InnerAttributeContainer = styled.View`
  flex-direction: row;
  width: 100%;
  height: auto;
  align-items: center;
  padding-left: 15%;
`

const AttributeText = styled.Text`
  text-align: center;
  color: black;
  font-size: 12px;
  font-family: Comfortaa_500Medium;
  margin-bottom: 3px;
  margin-left: 5px;
`

const ATTRIBUTES = {
  licensed: {
    title: 'Licensed',
    description: 'This establishment is licensed/certified',
  },
  bike_parking: {
    title: 'Bike Parking',
    description: 'Allows bike parking around the establishment',
  },
  accepts_bitcoin: {
    title: 'Accepts Bitcoin',
    description: 'This establishment accepts bitcoin',
  },
  accepts_credit_cards: {
    title: 'Accepts CreditCard',
    description: 'This establishment accepts credit cards',
  },
  garage_parking: {
    title: 'Garage Parking',
    description: 'This establishment has garage parking',
  },
  street_parking: {
    title: 'Street Parking',
    description: 'Allows street parking around the establishment',
  },
  dogs_allowed: {
    title: 'Dogs Allowed',
    description: 'Dogs are allowed in this establishment',
  },
  wheelchair_accessible: {
    title: 'Wheelchair Accessible',
    description: 'This establishment is wheelchair accessible',
  },
  valet_parking: {
    title: 'Valet Parking',
    description: 'This establishment has valet parking',
  },
  flexible_timing: {
    title: 'Flexible Timing',
    description: 'This establishment has flexible scheduling',
  },
}

const ProviderView = (props) => {
  const [expanded, setExpanded] = useState(true)
  const [rating, setRating] = useState(0)
  const [text, setText] = useState('')
  const userType = (async () => await getUserType())()
  const { providerData } = props.route.params.data

  const handlePress = () => setExpanded(!expanded)

  return (
    <Body>
      <HeaderContainer>
        <ImageBackground source={bgImages[providerData.bg]} />
        <InnerContainer>
          <Avatar source={avatarImages[providerData.img]} />
        </InnerContainer>
        <TitleContainer>
          <Title>{providerData.name}</Title>
          <LocationText numberOfLines={1}>
            {providerData.city} {providerData.state && `,${providerData.state}`}
          </LocationText>
          <RatingContainer>
            {[...Array(providerData.average_rating)].map((_, i) => (
              <FontAwesome
                key={i}
                name="star"
                size={18}
                color={'black'}
                style={{
                  marginRight: 8,
                }}
              />
            ))}
            {[...Array(5 - providerData.average_rating)].map((_, i) => (
              <FontAwesome
                key={i}
                name="star-o"
                size={18}
                color={'black'}
                style={{
                  marginRight: 8,
                }}
              />
            ))}
          </RatingContainer>
        </TitleContainer>
        <InnerEndContainer>
          <DistanceText>{providerData.dist}m</DistanceText>
        </InnerEndContainer>
      </HeaderContainer>
      <BodyContainer>
        <List.Section>
          <List.Accordion
            title="Basic information"
            left={(props) => <List.Icon {...props} icon="equal" />}
          >
            {Object.keys(ATTRIBUTES).map((key, index) => {
              if (providerData[key]) {
                return (
                  <List.Item
                    key={index}
                    title={ATTRIBUTES[key].name}
                    description={ATTRIBUTES[key].description}
                    left={(props) => <List.Icon {...props} icon="star" />}
                  />
                )
              }
            })}
          </List.Accordion>
          <List.Accordion
            title="Details"
            left={(props) => <List.Icon {...props} icon="equal" />}
          >
            {Object.keys(ATTRIBUTES).map((key, index) => {
              if (providerData[key]) {
                return (
                  <List.Item
                    key={index}
                    title={ATTRIBUTES[key].name}
                    description={ATTRIBUTES[key].description}
                    left={(props) => <List.Icon {...props} icon="star" />}
                  />
                )
              }
            })}
          </List.Accordion>
        </List.Section>
      </BodyContainer>
    </Body>
  )
}

export default ProviderView
