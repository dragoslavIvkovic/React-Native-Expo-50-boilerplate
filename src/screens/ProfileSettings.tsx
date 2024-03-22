// ProfileSettings.js
import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../provider/AuthProvider' // Adjust the path according to your project structure

function ProfileSettings() {
  const { signOut } = useAuth()
  const navigation = useNavigation() // Use the useNavigation hook for navigation

  const handleSignOut = async () => {
    try {
      await signOut()
      console.log('Successfully signed out')
      navigation.navigate('Login') // Redirect to Login screen after sign out
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <View style={styles.container}>
      <Text>Profile Settings Screen</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
      <Button title="Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Register" onPress={() => navigation.navigate('Register')} />
      <Button title="Password Reset" onPress={() => navigation.navigate('PasswordReset')} />
      <Button title="Create Profile" onPress={() => navigation.navigate('CreateProfile')} />
      <Button title="Update Password" onPress={() => navigation.navigate('UpdatePassword')} />
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
