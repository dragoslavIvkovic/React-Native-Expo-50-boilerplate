import React from 'react'
import { useUserStore } from '@store/userStore'
import { View, Button } from 'react-native'

const LoginButton: React.FC = () => {
  const { login, logout, isLoggedIn } = useUserStore()

  return (
    <View>
      {isLoggedIn ? (
        <Button title="Logout" onPress={logout} />
      ) : (
        <Button title="Login" onPress={() => login('123', 'Jane Doe', 'jane@example.com')} />
      )}
    </View>
  )
}

export default LoginButton
