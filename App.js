import { StatusBar } from 'expo-status-bar'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

const Stack = createStackNavigator()

const DemoHomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button
        style={{ width: '10em'}}
        onClick={() => {
          console.log('working')
          navigation.navigate('SecondHome')
        }} 
      >
        To Home2
      </Button>
      <StatusBar style="auto" />
    </View>
  )
}

const DemoSecondHomeScreen = ({ navigation }) => {
  console.log(navigation)
  return (
    <View style={styles.container}>
      <Text>Home 2</Text>
      <Button
        style={{ width: '10em'}}
        onClick={() => navigation.navigate('Home')} 
      >
        To Home
      </Button>
      <StatusBar style="auto" />
    </View>
  )
}

const App = () => {
  console.log('testApp')

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={DemoHomeScreen} />
        <Stack.Screen name="SecondHome" component={DemoSecondHomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default App
