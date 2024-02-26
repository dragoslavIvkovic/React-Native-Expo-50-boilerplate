import React from 'react'
import { View, TextInput, Text, TextInputProps, StyleSheet } from 'react-native'

interface TextInputProps extends TextInputProps {
  nextInputRef?: React.RefObject<TextInput>
  helperText?: string
}

const TextInput: React.FC<TextInputProps> = ({ nextInputRef, helperText, ...textInputProps }) => {
  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={text => {
          // Automatsko pretvaranje unosa u mala slova i uklanjanje belog prostora
          const formattedText = text.trim().toLowerCase()
          // Možete ovde postaviti stanje ako želite da sačuvate formatirani tekst
          // ili direktno proslediti formatirani tekst kroz neki drugi prop ili metod
        }}
        onSubmitEditing={() => nextInputRef?.current?.focus()} // Omogućava prelazak na sledeći input
        {...textInputProps} // Prosleđuje sve preostale TextInput props-e
        style={styles.textInput}
      />
      {helperText && <Text style={styles.helperText}>{helperText}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10
  },
  helperText: {
    color: 'gray'
  }
})

export default TextInput
