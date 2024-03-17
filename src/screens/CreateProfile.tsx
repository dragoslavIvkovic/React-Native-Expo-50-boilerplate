import React from 'react'
import { View, Text } from 'react-native'

interface Props {
  name: string
}

const CreateProfile: React.FC<Props> = ({ name }) => {
  return (
    <View>
      <Text>Welcome, {name}!</Text>
    </View>
  )
}

export default CreateProfile
