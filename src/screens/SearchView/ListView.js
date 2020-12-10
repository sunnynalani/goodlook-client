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
  overflow: hidden;
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
  height: 100px;
  align-items: center;
  justify-content: center;
  width: 19%;
`

const ImageEndBackground = styled.Image`
  background-color: transparent;
  height: 50%;
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
  font-size: 18px;
  font-family: Comfortaa_500Medium;
`

const TitleText = styled.Text`
  color: black;
  width: auto;
  font-size: 14px;
  font-family: Comfortaa_500Medium;
`

const LocationText = styled.Text`
  color: gray;
  width: auto;
  font-size: 10px;
  font-family: Comfortaa_500Medium;
`

const RatingContainer = styled.View`
  flex-direction: row;
  margin-top: 6px;
  margin-bottom: 8px;
  width: 80%;
  height: auto;
  justify-content: space-around;
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

//should be in config or util...
const CATEGORIES_MAP = {
  NAIL: 'nails',
  LASHES: 'lashes',
  HAIR: 'hair',
  BROWS: 'brows',
  WAX: 'wax',
  MAKEUP: 'makeup',
  OTHER: 'other',
}

/**
 * not implementd on the api*
 * user would be able to make their own background image
 * and display it
 *
 * currently uses stock photos for these img bgs
 */

const ListView = ({ navigation, providerData, location, userType }) => {
  const toProviderPage = (providerData) => {
    navigation.navigate('ProviderView', {
      data: providerData,
    })
  }

  return (
    <Body>
      {providerData && !providerData.providers && (
        <ErrorText>No providers found...</ErrorText>
      )}
      {providerData &&
        providerData.providers.map((provider, index) => {
          return (
            <ProviderCard
              key={index}
              index={index}
              userType={userType}
              data={provider}
              img={bgImages[index]}
              toProviderPage={toProviderPage}
              location={location}
            />
          )
        })}
    </Body>
  )
}

const ProviderCard = React.memo(
  ({ data, img, index, userType, toProviderPage, location }) => {
    const dist = distance(
      location.latitude,
      location.longitude,
      data.latitude,
      data.longitude
    ).toFixed(1)

    return (
      <CardContainer
        android_ripple={{ color: 'gray' }}
        onPress={() =>
          toProviderPage({
            providerData: {
              ...data,
              img: index,
              bg: img,
              dist: dist,
              userType: userType,
            },
          })
        }
      >
        <ImageEndBackground source={img} />
        <InnerContainer>
          <Avatar source={avatarImages[index]} />
        </InnerContainer>
        <InnerMiddleContainer>
          <TitleText numberOfLines={1}>{data.name}</TitleText>
          <LocationText numberOfLines={1}>
            {data.city} {data.state && `,${data.state}`}
          </LocationText>
          <RatingContainer>
            {[...Array(data.average_rating)].map((_, i) => (
              <FontAwesome key={i} name="star" size={12} color={'black'} />
            ))}
            {[...Array(5 - data.average_rating)].map((_, i) => (
              <FontAwesome key={i} name="star-o" size={12} color={'black'} />
            ))}
          </RatingContainer>
        </InnerMiddleContainer>
        <AttributeContainer>
          {data.categories
            .filter((v, i) => i < 3)
            .sort((a, b) => a.localeCompare(b))
            .map((category, i) => {
              return (
                <InnerAttributeContainer key={i}>
                  <FontAwesome name="circle" size={6} color={'black'} />
                  <AttributeText>{CATEGORIES_MAP[category]}</AttributeText>
                </InnerAttributeContainer>
              )
            })}
          {data.licensed && (
            <InnerAttributeContainer>
              <FontAwesome name="circle" size={6} color={'black'} />
              <AttributeText>licensed</AttributeText>
            </InnerAttributeContainer>
          )}
        </AttributeContainer>
        <InnerEndContainer>
          <DistanceText>{dist}m</DistanceText>
        </InnerEndContainer>
      </CardContainer>
    )
  }
)

export default ListView
