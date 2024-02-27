import React, { useState, forwardRef, ForwardRefRenderFunction } from 'react'
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  TextInputProps
} from 'react-native'
import { useTheme } from '@react-navigation/native'

interface TextInputComponentProps extends TextInputProps {
  value: string
  onChangeText: (text: string) => void
  helperText?: string
  error?: boolean
  placeholder?: string
  onSubmitEditing?: () => void
  onFocus?: () => void
  onBlur?: () => void
  inputHeight?: number
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'number-pad'
    | 'name-phone-pad'
    | 'decimal-pad'
    | 'twitter'
    | 'web-search'
    | 'visible-password'
  autoFocus?: boolean
}

const TextInputComponent: ForwardRefRenderFunction<TextInput, TextInputComponentProps> = (
  {
    value,
    onChangeText,
    helperText,
    error = false,
    placeholder,
    onSubmitEditing,
    onFocus,
    onBlur,
    inputHeight,
    keyboardType = 'default',
    autoFocus = false,
    ...otherProps
  },
  ref
) => {
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const { colors } = useTheme()
  const { width } = useWindowDimensions() // Get window dimensions to adjust styles dynamically

  // Only adjust styles related to dimensions
  const adjustedStyles = StyleSheet.create({
    inputContainer: {
      ...styles.inputContainer,
      // Example: Adjust container padding based on screen width
      paddingHorizontal: width * 0.05,
      width: width * 0.7 // Adjusted width
    },
    input: {
      ...styles.input,
      height: inputHeight ?? 48, // Default height or use inputHeight if provided
      borderColor: isFocused ? colors.primary : error ? 'red' : '#ccc',
      color: colors.text,
      backgroundColor: colors.card
    },
    inputFocused: styles.inputFocused,
    inputError: styles.inputError,
    helperText: styles.helperText
  })

  const handleChange = (text: string) => {
    onChangeText(text.trim())
  }

  return (
    <View style={adjustedStyles.inputContainer}>
      <TextInput
        {...otherProps}
        ref={ref}
        style={[adjustedStyles.input, isFocused && styles.inputFocused, error && styles.inputError]}
        value={value}
        onChangeText={handleChange}
        onFocus={() => {
          setIsFocused(true)
          if (onFocus) onFocus()
        }}
        onBlur={() => {
          setIsFocused(false)
          if (onBlur) onBlur()
        }}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        onSubmitEditing={onSubmitEditing}
        keyboardType={keyboardType}
        autoFocus={autoFocus}
      />
      {helperText && <Text style={adjustedStyles.helperText}>{helperText}</Text>}
    </View>
  )
}

// Original styles remain mostly unchanged
const styles = StyleSheet.create({
  inputContainer: {
    // width: '100%',
    justifyContent: 'center',
    position: 'relative'
  },
  input: {
    paddingHorizontal: 15,
    marginTop: 12,
    borderRadius: 5,
    borderWidth: 1
    // padding: 10
  },
  inputFocused: {},
  inputError: {},
  helperText: {
    fontSize: 12,
    paddingHorizontal: 5,
    marginTop: 4
  }
})

export default forwardRef(TextInputComponent)
