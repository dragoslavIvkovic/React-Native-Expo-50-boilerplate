import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

type ReadOnlyTextProps = {
  name: string
  value: string | number | null | undefined
}

const ReadOnlyText: React.FC<ReadOnlyTextProps> = ({ value, name }) => {
  return (
    <View style={styles.inputContainer}>
      <Text>{name}</Text>
      <Text> : </Text>
      <Text>{value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
})

export default ReadOnlyText
