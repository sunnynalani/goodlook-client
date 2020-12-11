import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { createStackNavigator } from '@react-navigation/stack'
import ProfileView from '../screens/ProfileView/ProfileView'
import ProviderView from '../screens/ProfileView/ProviderView'
import { GET_PROVIDER } from './queries'
import styled from 'styled-components/native'
import { useLazyQuery } from '@apollo/client'
import { bgImages, avatarImages } from '../utils'

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
  margin-top: 10%;
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

const ErrorText = styled.Text`
  color: red;
  height: auto;
  font-size: 12px;
  font-family: Comfortaa_500Medium;
  margin-bottom: 20px;
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
  text-align: center;
  margin-left: 5%;
  width: 95%;
  font-size: 13px;
  font-family: Comfortaa_500Medium;
`

const Stack = createStackNavigator()

export const ProfileNavigator = (props) => {
  const [initialView, setInitialView] = useState(null)
  console.log('test')

  useEffect(() => {
    ;(async () => {
      try {
        const value = await AsyncStorage.getItem('@user')
        console.log(value)
        if (value === '1') {
          setInitialView('Guest')
        } else if (value === '2') {
          setInitialView('ProfileView')
        } else if (value === '3') {
          setInitialView('ProviderView')
        }
      } catch (err) {
        setInitialView('Guest')
      }
    })()
  }, [])

  if (initialView === null) {
    return <></>
  }

  return (
    <Stack.Navigator initialRouteName={initialView} headerMode={false}>
      <Stack.Screen name="ProfileView" component={ProfileView} />
      <Stack.Screen name="ProviderView" component={ProviderProfileWrapper} />
      <Stack.Screen name="Guest" component={GuestView} />
    </Stack.Navigator>
  )
}

const GuestView = (props) => {
  const toSignUp = (_) => {
    props.navigation.navigate('SignIn')
  }

  return (
    <Body>
      <TitleContainer>
        <Title>you're a guest..</Title>
      </TitleContainer>
      <ButtonContainer>
        <MainButton android_ripple={{ color: 'white' }} onPress={toSignUp}>
          <MainText>sign up</MainText>
        </MainButton>
      </ButtonContainer>
      <TermsContainer>
        <Terms>for more features, sign up!</Terms>
      </TermsContainer>
    </Body>
  )
}

const ProviderProfileWrapper = (props) => {
  const [providerId, setProviderId] = useState(null)
  const [providerData, setProviderData] = useState(null)

  const [getProviderData] = useLazyQuery(GET_PROVIDER, {
    variables: {
      providerId: providerId,
    },
    onError: (err) => {
      console.log(err.message)
    },
    onCompleted: (res) => {
      setProviderData(res.provider.provider)
    },
  })

  useEffect(() => {
    ;(async () => {
      try {
        const value = await AsyncStorage.getItem('@provider')
        if (value !== null) {
          setProviderId(Number(value))
        } else {
          return
        }
      } catch (err) {
        console.log(err.message)
      }
    })()
  }, [])

  useEffect(() => {
    getProviderData()
  }, [providerId])

  if (providerId && providerData) {
    console.log({
      data: {
        ...providerData,
        bg: 0,
        img: 0,
        dist: 0,
        userType: '3',
      },
    })
    props.navigation.navigate('ProviderView', {
      data: {
        ...providerData,
        bg: 0,
        dist: 0,
        userType: '3',
      },
    })
  }
  return (
    <Body>
      <ErrorText>Something went wrong! Refresh the app!</ErrorText>
    </Body>
  )
}

export default ProfileNavigator
