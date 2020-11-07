import { StyleSheet } from 'react-native'
import { normalize } from '../../utils'

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#linear-gradient(#ece9e6, #ffffff)',
    height: '100%',
    width: '100%',
  },
  headContainer: {
    flexDirection: 'row',
  },
  bodyContainer: {
    height: 'auto',
    justifyContent: 'center',
  },
  topButton: {
    height: normalize(40),
    width: normalize(130),
  },
  providerCard: {
    height: normalize(80),
    width: '100%',
    marginVertical: normalize(3),
  },
})

export default styles
