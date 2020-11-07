import React, { useState, useReducer } from 'react'
import {
  Text,
  View,
  ScrollView,
  Button,
  Banner,
  ProgressBar,
} from '../../components'
import { useQuery } from '@apollo/client'
import { GET_PROVIDERS } from './queries'
import SearchTable from './SearchTable'
import styles from './styles'

const SearchView = ({ navigation }) => {
  const [expanded, setExpanded] = useState()
  const [sort, setSort] = useState()
  const [filter, setFilter] = useState()

  const { loading, error, data } = useQuery(GET_PROVIDERS)
  console.log(data)

  return (
    <>
      <View styles={styles.headContainer}>
        <View style={styles.topButton}>
          <Button mode="outlined">Filter</Button>
        </View>
        <View style={styles.topButton}>
          <Button mode="outlined">Sort</Button>
        </View>
      </View>
      {data && (
        <SearchTable
          navigation={navigation}
          data={data.providers}
          expanded={expanded}
          setExpanded={setExpanded}
        />
      )}
    </>
  )
}

export default SearchView
