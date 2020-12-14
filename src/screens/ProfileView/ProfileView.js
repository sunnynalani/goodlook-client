import React from 'react'
import { StyleSheet, Text, View, Button, FlatList } from 'react-native'
import { Avatar, List } from 'react-native-paper'
import styled from 'styled-components/native'
import { useMutation, useQuery } from '@apollo/client'
import { LOGOUT_CLIENT, ME_CLIENT } from './queries'
import { ScrollView } from 'react-native-gesture-handler'
import v0_42 from '../../components/assests/images/v0_42.png'

const Body = styled.ScrollView`
  background-color: white;
  height: auto;
  width: 100%;
`
const TitleText = styled.Text`
  color: black;
  width: auto;
  font-size: 30px;
  font-family: Comfortaa_700Bold;
`

const ImageEndBackground = styled.Image`
  background-color: transparent;
  height: 100%;
  right: 0px;
  position: absolute;
  top: 0px;
  width: 100%;
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

const InnerContainer = styled.View`
  background-color: transparent;
  height: 100px;
  align-items: center;
  justify-content: center;
  width: 30%;
  paddingright: 100;
`

const InnerMiddleContainer = styled.View`
  background-color: transparent;
  height: 100px;
  justify-content: center;
  align-items: center;
  width: 41%;
`

const StyledText = styled.Text`
  text-align: center;
  color: black;
  font-size: 25px;
  margin-bottom: 6px;
  font-family: Comfortaa_500Medium;
`
const ButtonContainer = styled.View`
  height: auto;
  justify-content: center;
  align-items: center;
  width: 100%;
`
const MainButton = styled.Pressable`
  background-color: black;
  height: 52px;
  border-radius: 6px;
  margin-top: 30px;
  margin-bottom: 5%;
  align-items: center;
  justify-content: center;
  width: 90%;
`
const MainText = styled.Text`
  text-align: center;
  color: white;
  width: 100px;
  margin-bottom: 6px;
  text-align: center;
  font-size: 18px;
  font-family: Comfortaa_500Medium;
`

const ProfileView = (props) => {
  //logOut is the lgoout function
  const { logOut, data } = props
  var initials = ''
  initials += data.first_name.charAt(0) + data.last_name.charAt(0)
  return (
    <Body>
      <CardContainer>
        <ImageEndBackground source={v0_42} />
        <InnerContainer>
          <Avatar.Text label={initials} />
        </InnerContainer>
        <InnerMiddleContainer>
          <TitleText numberOfLines={1}>
            {data.first_name} {data.last_name}
          </TitleText>
        </InnerMiddleContainer>
      </CardContainer>

      <List.Section style={{ paddingLeft: 0 }}>
        <StyledText style={{ fontSize: 20, paddingLeft: 0 }}>
          Favorites
        </StyledText>
        <List.Accordion
          title="Providers"
          left={(props) => <List.Icon {...props} icon="star" />}
        >
          {data.favorites.map((reviews, index) => {
            return (
              <List.Item title="Name" key={index} description={reviews.name} />
            )
          })}
        </List.Accordion>

        <StyledText style={{ fontSize: 20, paddingLeft: 0 }}>
          {' '}
          Reviews
        </StyledText>
        <List.Accordion
          title="Reviews"
          left={(props) => <List.Icon {...props} icon="file" />}
        >
          {data.reviews.map((reviews, index) => {
            return (
              <List.Item
                title="Comment"
                key={index}
                description={reviews.text}
              />
            )
          })}
        </List.Accordion>
      </List.Section>
      <View>
        <ButtonContainer>
          <MainButton
            android_ripple={{ color: 'white' }}
            onPress={() => {
              logOut()
            }}
          >
            <MainText>log out</MainText>
          </MainButton>
        </ButtonContainer>
      </View>
    </Body>
  )
}

export default ProfileView
