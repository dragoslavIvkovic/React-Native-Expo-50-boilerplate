import React from 'react'
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native'

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
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[variant],
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

type StyleTypes = {
  button: object
  small: object
  medium: object
  large: object
  primary: object
  reset: object
  secondary: object
  cancel: object
  buttonText: object
  disabledButton: object
  disabledButtonText: object
  [key: string]: object
}

const styles: StyleTypes = StyleSheet.create({
  button: {
    height: 42,
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5
  },
  small: {
    width: 280
  },
  medium: {
    width: 300
  },
  large: {
    width: 320
  },
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
  cancelText: {
    color: 'black'
  },
  disabledButton: {
    backgroundColor: '#e0e0e0'
  },
  disabledButtonText: {
    color: 'white'
  }
})

export default Button
