import React, { useState, useEffect, useReducer } from 'react'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import { useLazyQuery, useMutation } from '@apollo/client'
import { Dimensions } from 'react-native'
import * as Location from 'expo-location'
import Slider from '@react-native-community/slider'
import { List } from 'react-native-paper'
import styled from 'styled-components/native'
import { bgImages, avatarImages, getUserType } from '../../utils'
import { Modal, TextInput } from 'react-native-paper'
import { CREATE_REVIEW } from './queries'

import {
  Button,
  Checkbox,
  Paragraph,
  View,
  Dialog,
  Portal,
} from '../../components'

const Body = styled.ScrollView`
  background-color: white;
  height: auto;
  width: 100%;
`

const ErrorText = styled.Text`
  color: red;
  height: auto;
  font-size: 12px;
  font-family: Comfortaa_500Medium;
  margin-bottom: 20px;
`

const CardContainer = styled.View`
  background-color: white;
  margin-top: 40px;
  height: 110px;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: row;
  border-bottom-width: 0.5px;
  border-bottom-color: #d3d3d3;
  overflow: hidden;
`

const Avatar = styled.Image`
  background-color: transparent;
  height: 80px;
  width: 80px;
  border-radius: 40px;
`

const InnerContainer = styled.View`
  background-color: transparent;
  height: 100px;
  align-items: center;
  justify-content: center;
  width: 30%;
`

const InnerMiddleContainer = styled.View`
  background-color: transparent;
  height: 100px;
  justify-content: center;
  width: 41%;
`

const InnerEndContainer = styled.View`
  background-color: transparent;
  height: 100px;
  align-items: center;
  justify-content: center
  width: 29%;
`

const ImageEndBackground = styled.Image`
  background-color: transparent;
  height: 100%;
  right: 0px;
  position: absolute;
  top: 0px;
  width: 100%;
  opacity: 0.1;
`

const DistanceText = styled.Text`
  text-align: center;
  color: black;
  width: auto;
  font-size: 30px;
  font-family: Comfortaa_500Medium;
`

const TitleText = styled.Text`
  color: black;
  width: auto;
  font-size: 30px;
  font-family: Comfortaa_700Bold;
`

const LocationText = styled.Text`
  color: gray;
  width: auto;
  font-size: 15px;
  margin-bottom: 8%;
  font-family: Comfortaa_700Bold;
`

const ButtonContainer = styled.View`
  background-color: white;
  height: 52px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`

const HeaderButton = styled.Pressable`
  background-color: white;
  height: 52px;
  align-items: center;
  justify-content: center;
  width: 50%;
  border: 0.5px solid black;
`

const ButtonText = styled.Text`
  text-align: center;
  color: black;
  width: 100%;
  font-size: 18px;
  font-family: Comfortaa_500Medium;
`

const LogoutButton = styled.Pressable`
  background-color: black;
  height: 22px;
  border-radius: 6px;
  justify-content: center;
  width: 80px;
`

const LogoutText = styled.Text`
  text-align: center;
  color: white;
  width: auto;
  margin-bottom: 6px;
  text-align: center;
  font-size: 12px;
  font-family: Comfortaa_500Medium;
`

const ModalButton = styled.Pressable`
  background-color: black;
  height: 52px;
  border-radius: 6px;
  margin-top: 15px;
  justify-content: center;
  width: 100%;
`

const ModalButtonText = styled.Text`
  text-align: center;
  color: white;
  width: auto;
  margin-bottom: 6px;
  text-align: center;
  font-size: 18px;
  font-family: Comfortaa_500Medium;
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
  const data = props.route.params.data.providerData
  const [expanded, setExpanded] = useState(true)
  const [visible, setVisible] = useState(false)
  const [rating, setRating] = useState('')
  const [text, setText] = useState('')
  const [reviews, setReiews] = useState([...data.reviews])
  const [createReview] = useMutation(CREATE_REVIEW, {
    onCompleted: () => {
      console.log('working')
      reviews.push([
        ...reviews,
        {
          rating: rating,
          text: text,
        },
      ])
    },
  })

  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)
  const modalStyle = {
    backgroundColor: 'white',
    padding: 20,
    width: '90%',
    alignSelf: 'center',
  }

  return (
    <Body>
      <CardContainer>
        <ImageEndBackground source={data.bg} />
        <InnerContainer>
          <Avatar source={avatarImages[data.img]} />
        </InnerContainer>
        <InnerMiddleContainer>
          <TitleText numberOfLines={1}>{data.name}</TitleText>
          <LocationText numberOfLines={1}>
            {data.city} {data.state && `,${data.state}`}
          </LocationText>
        </InnerMiddleContainer>
        <InnerEndContainer>
          <LogoutButton
            onPress={() => {
              console.log('sending')
            }}
            android_ripple={{ color: 'white' }}
          >
            <LogoutText>log out</LogoutText>
          </LogoutButton>
          <DistanceText>{data.dist}m</DistanceText>
        </InnerEndContainer>
      </CardContainer>
      {(data.userType === '1' || data.userType === '0') && (
        <ButtonContainer>
          <HeaderButton
            style={{ borderRightWidth: 0 }}
            android_ripple={{ color: 'black' }}
            onPress={showModal}
          >
            <ButtonText>review</ButtonText>
          </HeaderButton>
          <HeaderButton
            android_ripple={{ color: 'black' }}
            onPress={() => {
              console.log('test')
            }}
          >
            <ButtonText>favorite</ButtonText>
          </HeaderButton>
        </ButtonContainer>
      )}
      <List.Section>
        <List.Accordion
          title="Basic information"
          left={(props) => <List.Icon {...props} icon="equal" />}
        >
          {data.country && (
            <List.Item title={'Country'} description={data.country} />
          )}
          {data.state && <List.Item title={'State'} description={data.state} />}
          {data.city && <List.Item title={'City'} description={data.city} />}
        </List.Accordion>
        <List.Accordion
          title="Details"
          left={(props) => <List.Icon {...props} icon="equal" />}
        >
          {Object.keys(ATTRIBUTES).map((key, index) => {
            if (data[key]) {
              return (
                <List.Item
                  key={index}
                  title={ATTRIBUTES[key].title}
                  description={ATTRIBUTES[key].description}
                />
              )
            }
          })}
        </List.Accordion>
        <List.Accordion
          title="Services"
          left={(props) => <List.Icon {...props} icon="equal" />}
        >
          {data.categories.map((category, index) => {
            return <List.Item key={index} title={category} />
          })}
        </List.Accordion>
        <List.Accordion
          title="Reviews"
          left={(props) => <List.Icon {...props} icon="equal" />}
        >
          {reviews.map((review, index) => {
            return (
              <List.Item
                key={index}
                title={`Anonymous user rated ${review.rating}`}
                description={review.text}
              />
            )
          })}
          {reviews.length === 0 && (
            <List.Item description={'This establishment has no reviews'} />
          )}
        </List.Accordion>
      </List.Section>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={modalStyle}
        >
          <ButtonText>Write your review</ButtonText>
          <TextInput
            label=" "
            value={text}
            underlineColor={'black'}
            onChangeText={(text) => setText(text)}
            multiline={true}
            style={{
              marginTop: 10,
              height: 200,
            }}
          />
          <ModalButton
            onPress={() => {
              console.log('sending')
            }}
            android_ripple={{ color: 'white' }}
          >
            <ModalButtonText>send</ModalButtonText>
          </ModalButton>
        </Modal>
      </Portal>
    </Body>
  )
}

export default ProviderView
