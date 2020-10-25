import { StyleSheet } from 'react-native'
import { normalize } from '../../utils'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1B1B',
    height: '100%',
    width: '100%',
  },
  titleTextContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  subtitleContainer: {
    flex: 1,
    height: 'auto',
    justifyContent: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  titleText: {
    color: '#FFFFF0',
    fontSize: normalize(36),
    textAlign: 'center',
  },
  loginText: {
    textDecorationLine: 'underline',
    fontSize: normalize(24),
    textAlign: 'center',
    color: '#FFFFF0',
  },
  plainSubtext: {
    fontSize: normalize(18),
    textAlign: 'center',
    color: '#FFFFF0',
  },
  signUpText: {
    textDecorationLine: 'underline',
    fontSize: normalize(18),
    textAlign: 'center',
    textShadowRadius: 1,
    color: '#FFFFF0',
  },
  guestText: {
    textDecorationLine: 'underline',
    fontSize: normalize(14),
    textAlign: 'center',
    color: '#FFFFF0',
  },
})

export default styles
