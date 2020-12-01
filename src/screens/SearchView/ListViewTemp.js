import React, { useState, useEffect, useCallback } from 'react'
import {
  Text,
  ScrollView,
  Button,
  Banner,
  ProgressBar,
  Appbar,
  Searchbar,
  IconButton,
  Card,
  Title,
  Paragraph,
  Avatar,
  View,
  Caption,
} from '../../components'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import { useQuery, useLazyQuery } from '@apollo/client'
import SearchTable from './SearchTable'
import { Dimensions } from 'react-native'
import { BlurView } from 'expo-blur'
import styles from './styles'
import { bgImages, avatarImages } from '../../utils'

const ListView = ({ navigation, providerData }) => {
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

  return (
    <ScrollView>
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
            />
          )
        })}
    </ScrollView>
  )
}

const ProviderCard = React.memo(
  ({ data, img, index, toBook, toProviderPage }) => {
    return (
      <Card
        style={{
          borderBottomColor: '#efedf2',
          borderBottomWidth: 1,
        }}
      >
        <Card.Title
          title={data.name}
          subtitle={<Caption>Description Placeholder</Caption>}
          left={(_) => <Avatar.Image size={48} source={avatarImages[index]} />}
        />
        <Card.Cover style={{ height: 100 }} source={img} />
        <Card.Actions style={{ marginLeft: 'auto' }}>
          <Button onPress={toProviderPage}>Details</Button>
          <Button onPress={toBook}>Book</Button>
        </Card.Actions>
      </Card>
    )
  }
)

export default ListView
