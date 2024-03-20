import React from 'react'
import { useThemeContext } from 'src/context/ThemeProvider'
import { FontAwesome as Icon } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'

const ThemeToggleButton = () => {
  const { isDarkTheme, toggleTheme } = useThemeContext()

  // console.log('isDarkTheme', isDarkTheme)

  const iconColor = isDarkTheme ? 'white' : 'black'

  return (
    <TouchableOpacity onPress={toggleTheme}>
      {isDarkTheme ? (
        <Icon name="toggle-on" size={24} color={iconColor} />
      ) : (
        <Icon name="toggle-off" size={24} color={iconColor} />
      )}
    </TouchableOpacity>
  )
}

export default ThemeToggleButton
