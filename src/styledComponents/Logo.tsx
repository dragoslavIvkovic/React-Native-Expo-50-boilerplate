/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react'
import { View, Image, StyleSheet } from 'react-native'

const Logo: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/Logo.png')} style={styles.logo} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: 160,
    height: 36,
    resizeMode: 'contain',
    marginBottom: 30,
    marginTop: -30
  }
})

export default Logo
