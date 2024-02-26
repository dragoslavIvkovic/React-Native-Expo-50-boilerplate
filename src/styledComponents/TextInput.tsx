import { useEffect, useState, forwardRef } from 'react'
import { TextInput, StyleSheet, View, Text } from 'react-native'
import * as ExpoZebraScanner from 'expo-zebra-scanner'
import commonStyles from '@styledComponents/commonStyles'

type ZebraScannerInputProps = {
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

const ZebraScannerInput = forwardRef<TextInput, ZebraScannerInputProps>(
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
    },
    ref
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
    width: 300,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    paddingHorizontal: 15,
    marginTop: 12,
    height: 42,
    borderRadius: 5
  },
  headerText: {
    fontSize: 24,
    marginTop: 8,
    marginBottom: 8,
    textAlign: 'center'
  }
})

export default ZebraScannerInput
