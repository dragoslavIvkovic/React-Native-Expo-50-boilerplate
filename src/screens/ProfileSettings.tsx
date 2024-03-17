import React from 'react'
import { View, Text, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const ProfileSettings: React.FC = () => {
  const navigation = useNavigation()

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile Settings</Text>
      {/* Dodajte vaše komponente za podešavanja ovde */}
      <Button title="Resetuj lozinku" onPress={() => navigation.navigate('PasswordReset')} />
      <Button title="Registruj se" onPress={() => navigation.navigate('Register')} />
    </View>
  )
}

export default ProfileSettings
