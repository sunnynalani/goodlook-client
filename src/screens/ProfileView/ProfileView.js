import React from 'react'
import { StyleSheet, Text, View, Button, FlatList } from 'react-native'
import { Avatar, List } from 'react-native-paper'
import styled from 'styled-components/native'
import { useMutation, useQuery } from '@apollo/client'
import { LOGOUT_CLIENT, ME_CLIENT } from './queries'

const StyledText = styled.Text`
  text-align: center;
  color: black;
  width: 100px;
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
  console.log(data)

  // var initials = ''
  // initials +=
  //   data.meClient.first_name.charAt(0) + data.meClient.last_name.charAt(0)
  // console.log(initials);
  // console.log(data.meClient.first_name.charAt(0));
  // console.log('this is the id: ' + data.id);
  // console.log('this is the username: ' + data.self.username);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignContent: 'flex-start',
      }}
    >
      <View
        style={{
          paddingTop: 20,
          paddingLeft: 5,
          justifyContent: 'space-evenly',
          flexDirection: 'row',
        }}
      >
        {/* <Avatar.Text size={90} label={initials} /> */}
        <View
          style={{
            paddingTop: 20,
            paddingLeft: 50,
            flex: 1,
            flexDirection: 'column',
          }}
        >
          {/* username shown/ CHANGE TO FIRST AND LAST AFTER JOSEPH UPDATES REPO*/}
          <StyledText style={{ color: 'black', fontSize: 22 }}>
            {/* {data.meClient.first_name} {data.meClient.last_name} */}
          </StyledText>
          {/* <StyledText style={{paddingLeft: 350,color:'black', fontSize:18}}>Irvine, CA</StyledText> */}
          {/* <View style={{paddingLeft: 0,justifyContent: 'center',flexDirection: 'row'}}>    
      <StyledText style={{paddingLeft: 10,color:'black', fontSize:18}}>Followers</StyledText>
      <StyledText style={{paddingLeft: 10,color:'black', fontSize:18}}>Following</StyledText>
      </View> */}
        </View>
      </View>

      <View style={{ paddingLeft: 7 }}>
        <StyledText style={{ fontSize: 20 }}>Favorites</StyledText>
        <List.Item
          title="Business #1"
          description="business profile"
          left={(props) => <List.Icon {...props} icon="star" />}
        />
      </View>

      <View style={{ paddingLeft: 0 }}>
        <StyledText style={{ fontSize: 20 }}> Reviews</StyledText>
        {/* <StyledText> {data.meClient.reviews}</StyledText> */}
        <List.Item
          title="Review 1"
          description="customer's review 1"
          left={(props) => <List.Icon {...props} icon="folder" />}
        />
      </View>
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
    </View>
  )
}

export default ProfileView
