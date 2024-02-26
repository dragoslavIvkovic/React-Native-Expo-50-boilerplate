import React, { useEffect, useState, forwardRef, Ref } from 'react'
import { TextInput, StyleSheet, View, Text, TextInputProps } from 'react-native'
// import * as ExpoTextInput from 'expo-zebra-scanner'; // Ako ne koristite ovaj import, možete ga izostaviti ili zakomentarisati
// import commonStyles from '@styledComponents/commonStyles'; // Ako commonStyles ne postoji, definisati stilove unutar ove komponente

interface InputProps extends TextInputProps {
  value: string
  onChange: (value: string) => void
  helperText?: string
  error?: boolean
  placeholder: string
  inputHeight?: number
  onSubmitEditing?: () => void
  onFocus?: () => void
  onBlur?: () => void
  autoFocus?: boolean
  keyboardType?: 'numeric' | 'default' | 'email-address'
}

const TextInputInput = forwardRef<TextInput, InputProps>(
  (
    {
      value,
      onChange,
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
    }: InputProps,
    ref: Ref<TextInput>
  ) => {
    const [isFocused, setIsFocused] = useState(false)

    const handleChange = (text: string) => {
      onChange(text.trim())
    }

    return (
      <View style={styles.inputContainer}>
        <TextInput
          {...otherProps}
          ref={ref}
          style={[
            styles.input,
            isFocused && styles.inputFocused,
            error && styles.inputError,
            { height: inputHeight ?? 48 } // Default height if not provided
          ]}
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
          onSubmitEditing={onSubmitEditing}
          keyboardType={keyboardType}
          autoFocus={autoFocus}
        />
        {helperText && <Text style={styles.helperText}>{helperText}</Text>}
      </View>
    )
  }
)

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    width: '100%', // Adjusted to fill width
    justifyContent: 'center',
    position: 'relative'
  },
  inputFocused: {
    borderColor: '#1E88E5'
  },
  inputError: {
    borderColor: 'red'
  },
  input: {
    width: '100%', // Changed to fill container width
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    paddingHorizontal: 15,
    marginTop: 12,
    height: 42,
    borderRadius: 5
  },
  helperText: {
    fontSize: 12,
    color: 'gray',
    paddingHorizontal: 5,
    marginTop: 4 // Adjusted for spacing
  }
})

export default TextInputInput
