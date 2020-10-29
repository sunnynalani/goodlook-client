import { StyleSheet } from 'react-native'
import { normalize } from '../../utils'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#linear-gradient(#ece9e6, #ffffff)',
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
    color: '#000',
    fontSize: normalize(48),
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 2,
  },
  loginText: {
    textDecorationLine: 'underline',
    fontSize: normalize(24),
    textAlign: 'center',
  },
  plainSubtext: {
    fontSize: normalize(18),
    textAlign: 'center',
    color: '#000',
  },
  signUpText: {
    textDecorationLine: 'underline',
    fontSize: normalize(18),
    textAlign: 'center',
    textShadowRadius: 1,
    color: '#000',
  },
  guestText: {
    textDecorationLine: 'underline',
    fontSize: normalize(14),
    textAlign: 'center',
    color: '#000',
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
