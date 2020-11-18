import { StyleSheet } from 'react-native'
import { theme } from '../../../config'
import { normalize } from '../../utils'

const { text, title } = theme.colors

export const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    color: title,
    fontSize: normalize(48),
    textAlign: 'center',
    // textShadowColor: 'rgba(0, 0, 0, 0.75)',
    // textShadowOffset: { width: -1, height: 1 },
    // textShadowRadius: 1,
  },
  loginText: {
    color: text,
    textDecorationLine: 'underline',
    fontSize: normalize(24),
    textAlign: 'center',
  },
  plainSubtext: {
    fontSize: normalize(18),
    textAlign: 'center',
    color: text,
  },
  signUpText: {
    textDecorationLine: 'underline',
    fontSize: normalize(18),
    textAlign: 'center',
    color: text,
  },
  guestText: {
    textDecorationLine: 'underline',
    fontSize: normalize(14),
    textAlign: 'center',
    color: text,
  },
  errorText: {
    fontSize: normalize(14),
    textAlign: 'center',
    color: 'red',
  },
  lineStyle: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    alignSelf: 'center',
    width: '60%',
  },
})

export default styles
