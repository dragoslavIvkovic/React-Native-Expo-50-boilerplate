import React from 'react'
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  useWindowDimensions
} from 'react-native'

interface CustomButtonProps {
  title: string
  onPress: () => void
  style?: StyleProp<ViewStyle>
  disabled?: boolean
  variant?: 'small' | 'medium' | 'large'
  type?: 'reset' | 'primary' | 'secondary' | 'cancel'
}

const Button: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  style,
  disabled = false,
  variant = 'medium',
  type = 'primary'
}) => {
  const { width } = useWindowDimensions()

  // Izračunajte širinu dugmeta na osnovu varijante
  const buttonWidth =
    variant === 'small' ? width * 0.3 : variant === 'medium' ? width * 0.5 : width * 0.7

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { width: buttonWidth }, // Dinamički postavite širinu dugmeta
        styles[type],
        style,
        disabled && styles.disabledButton
      ]}
      onPress={onPress}
      disabled={disabled}>
      <Text
        style={[styles.buttonText, styles[type + 'Text'], disabled && styles.disabledButtonText]}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 42,
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5
  },
  // Obratite pažnju da smo uklonili specifične stilove za small, medium i large širine
  primary: {
    backgroundColor: '#2196F3'
  },
  reset: {
    backgroundColor: 'red'
  },
  secondary: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'green'
  },
  cancel: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  primaryText: {
    // Dodajte ovaj stil ukoliko koristite u komponenti
    color: 'white'
  },
  resetText: {
    // Dodajte ovaj stil ukoliko koristite u komponenti
    color: 'white'
  },
  secondaryText: {
    // Dodajte ovaj stil ukoliko koristite u komponenti
    color: 'green'
  },
  cancelText: {
    color: 'black'
  },
  disabledButton: {
    backgroundColor: '#e0e0e0'
  },
  disabledButtonText: {
    color: '#a0a0a0'
  }
})

export default Button
