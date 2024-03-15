import React from 'react'
import 'intl-pluralrules'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ClientHomeScreen from '@screens/ClientHomeScreen'
import { CustomDarkTheme, CustomLightTheme } from 'src/theme/theme'
import ThemeToggleButton from '@components/ThemeToggleButton'
import HeaderLocalization from '@components/Header/HeaderLocalization'
import { ThemeProvider, useThemeContext } from 'src/context/ThemeProvider'
import AuthProvider, { useAuth } from './src/provider/AuthProvider' // Pretpostavlja se da je ovo pravi put do vašeg AuthProvider-a
import Login from '@screens/auth/Login'
import Register from '@screens/auth/Register'
import PasswordReset from '@screens/auth/PasswordReset'
import * as Linking from 'expo-linking'

const Stack = createNativeStackNavigator()

const AppContent = () => {
  const { isDarkTheme } = useThemeContext()
  const { auth } = useAuth() // Koristite auth da proverite da li je korisnik ulogovan

  // Vaš linking objekat
  const linking = {
    prefixes: ['com.pet.garrd://'],
    config: {
      screens: {
        Profile: 'create-profile'
        // Definišite dodatne rute i ekrane kako je potrebno
      }
    }
  }

  return (
    <NavigationContainer theme={isDarkTheme ? CustomDarkTheme : CustomLightTheme} linking={linking}>
      <Stack.Navigator
        screenOptions={{
          headerShadowVisible: false,
          title: '',
          headerTitleAlign: 'center'
        }}>
        {auth ? (
          // Ako je korisnik ulogovan, dozvolite pristup ClientHomeScreen
          <Stack.Screen name="ClientHomeScreen" component={ClientHomeScreen} />
        ) : (
          // U suprotnom, prikažite ekrane za autentifikaciju
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerRight: () => <ThemeToggleButton />,
                headerLeft: () => <HeaderLocalization />
              }}
            />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="PasswordReset" component={PasswordReset} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  )
}
