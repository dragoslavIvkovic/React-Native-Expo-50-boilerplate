// ProfileSettings.js
import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../provider/AuthProvider' // Ažuriraj putanju prema strukturi projekta

const ProfileSettings = () => {
  const navigation = useNavigation()
  const { signOut } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
      console.log('Successfully signed out')
      navigation.navigate('Login') // Redirekcija na ekran za prijavu nakon odjave
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <View style={styles.container}>
      <Button title="Sign Out" onPress={handleSignOut} />
      <Button title="Update Password" onPress={() => navigation.navigate('UpdatePassword')} />
      <Button title="Password Reset" onPress={() => navigation.navigate('PasswordReset')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default ProfileSettings
