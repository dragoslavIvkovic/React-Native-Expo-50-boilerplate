import { DarkTheme, DefaultTheme } from '@react-navigation/native'

export const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#333',
    text: '#fff',
    primary: '#bb86fc',
    card: '#121212',
    border: '#272727',
    placeholder: 'lightgrey'
  }
}

export const CustomLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
    text: '#000',
    primary: '#6200ee',
    card: '#f5f5f5',
    border: '#c7c7c7',
    placeholder: 'gray'
  }
}
