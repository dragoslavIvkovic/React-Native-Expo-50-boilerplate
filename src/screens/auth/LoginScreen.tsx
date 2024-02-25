import React, { useState, useRef } from 'react'
import { Alert, KeyboardAvoidingView, TextInput, Button, View, useColorScheme } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useUserStore } from '@store/UserState'
import { handleAxiosError } from 'src/errorHandler/handleAxiosError'
import { authApi } from 'src/api/generated/api-interface'
import { useThemeContext } from 'src/theme/ThemeProvider'

const LoginScreen: React.FC = () => {
  const navigation = useNavigation()
  const { toggleTheme } = useThemeContext()

  const [email, setEmail] = useState<string>('test@ketering.app')
  const [password, setPassword] = useState<string>('Password123')
  const [rememberMe, setRememberMe] = useState<boolean>(true)

  const passwordInputRef = useRef<TextInput>(null)
  const login = useUserStore(state => state.login)

  const loginUser = async () => {
    try {
      const loginPayload = {
        email: email,
        password: password,
        rememberMe: rememberMe
      }

      const response = await authApi.authControllerLogin(loginPayload, 'mobile')
      const { accessToken, refreshToken, userId, userRoles } = response.data.data

      // Update Zustand store
      login('FirstNamePlaceholder', 'LastNamePlaceholder', userRoles, accessToken, refreshToken)

      // Log user roles
      console.log('Login response', userRoles)

      // Directly navigate based on the userRoles from the response
      if (userRoles.includes('CLIENT')) {
        navigation.navigate('ClientHomeScreen')
      }
      // Add more conditions as needed based on userRoles
    } catch (error) {
      handleAxiosError(error)
    }
  }

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <Button onPress={toggleTheme} title="Promeni temu" />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        onSubmitEditing={() => passwordInputRef.current?.focus()}
        style={{
          height: 50,
          borderColor: 'gray',
          borderWidth: 1,
          width: 300,
          textAlign: 'center',
          margin: 5,
          padding: 10
        }}
      />
      <TextInput
        ref={passwordInputRef}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          height: 50,
          borderColor: 'gray',
          borderWidth: 1,
          width: 300,
          textAlign: 'center',
          margin: 5,
          padding: 10
        }}
      />
      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <Button title="Login" onPress={loginUser} />
        <View style={{ width: 20 }} />
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen
