import React, { useState, useRef } from 'react'
import { Alert, KeyboardAvoidingView, TextInput, View, useColorScheme } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useUserStore } from '@store/UserState'
import { handleAxiosError } from 'src/errorHandler/handleAxiosError'
import { authApi } from 'src/api/generated/api-interface'
import { useThemeContext } from 'src/theme/ThemeProvider'
import HeaderLocalization from '@components/Header/HeaderLocalization'
import { useTranslation } from 'react-i18next'
import Button from 'src/styledComponents/Button'
import TextInputComponent from 'src/styledComponents/TextInput'
import ThemeToggleButton from '@components/ThemeToggleButton'

const LoginScreen: React.FC = () => {
  const { t } = useTranslation()
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

  const isSubmitButtonDisabled = email === '' || password === ''
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <HeaderLocalization />
      <ThemeToggleButton />
      <TextInputComponent
        autoFocus={true}
        value={email}
        placeholder="Email"
        onChangeText={setEmail}
        onSubmitEditing={() => passwordInputRef.current?.focus()}
      />
      <TextInputComponent
        ref={passwordInputRef}
        value={email}
        placeholder="Password"
        onChangeText={setPassword}
        onSubmitEditing={() => passwordInputRef.current?.focus()}
        secureTextEntry
      />

      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <Button
          disabled={isSubmitButtonDisabled}
          onPress={loginUser}
          variant="medium"
          title={t('commonTranslations.loginButton')}
        />

        <View style={{ width: 20 }} />
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen
