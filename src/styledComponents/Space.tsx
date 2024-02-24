import React from 'react'
import { View } from 'react-native'

interface SpacerProps {
  width?: number
}

const Spacer: React.FC<SpacerProps> = ({ width = 8 }) => {
  return <View style={{ width }} />
}

export default Spacer
