import { DefaultTheme } from 'react-native-paper'

export const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#54b17d',
    accent: '#e1e9f2',
    background: '#f2f2f8',
    backdrop: '#efedf2',
    text: 'white',
    title: 'white',
    secondaryText: '#5e5966',
  },
}
