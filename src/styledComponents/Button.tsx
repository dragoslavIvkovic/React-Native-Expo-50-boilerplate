import React from 'react'
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  useWindowDimensions
} from 'react-native'
import { useThemeContext } from 'src/theme/ThemeProvider' // Ažurirajte putanju prema vašoj strukturi projekta

interface CustomButtonProps {
  title: string
  onPress: () => void
  style?: StyleProp<ViewStyle>
  disabled?: boolean
  variant?: 'small' | 'medium' | 'large'
}

const Button: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  style,
  disabled = false,
  variant = 'medium'
}) => {
  const { width } = useWindowDimensions()
  const { isDarkTheme } = useThemeContext() // Koristi kontekst teme

  const buttonWidth =
    variant === 'small' ? width * 0.3 : variant === 'medium' ? width * 0.5 : width * 0.7

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { width: buttonWidth },
        isDarkTheme ? styles.darkButton : styles.lightButton,
        style,
        disabled && styles.disabledButton
      ]}
      onPress={onPress}
      disabled={disabled}>
      <Text
        style={[
          styles.buttonText,
          isDarkTheme ? styles.darkButtonText : styles.lightButtonText,
          disabled && styles.disabledButtonText
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 42,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5
  },
  lightButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#2196F3',
    borderWidth: 2
  },
  darkButton: {
    backgroundColor: '#333333',
    borderColor: '#BB86FC',
    borderWidth: 2
  },
  buttonText: {
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  lightButtonText: {
    color: '#2196F3'
  },
  darkButtonText: {
    color: '#BB86FC'
  },
  disabledButton: {
    backgroundColor: '#e0e0e0',
    borderColor: '#aaaaaa'
  },
  disabledButtonText: {
    color: '#a0a0a0'
  }
})

export default Button
