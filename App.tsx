import React from 'react'
import { View, Text } from 'react-native' // Ensure you import View and Text from 'react-native'
import 'intl-pluralrules'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '@screens/Home'
import { CustomDarkTheme, CustomLightTheme } from 'src/theme/theme'
import ThemeToggleButton from '@components/ThemeToggleButton'
import HeaderLocalization from '@components/Header/HeaderLocalization'
import { ThemeProvider, useThemeContext } from 'src/context/ThemeProvider'
import AuthProvider, { useAuth } from './src/provider/AuthProvider'
import Login from '@screens/auth/Login'
import Register from '@screens/auth/Register'
import PasswordReset from '@screens/auth/PasswordReset'

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

// Authenticated App Structure with Drawer
const AuthenticatedApp = () => (
  <Drawer.Navigator initialRouteName="Home" screenOptions={{ drawerPosition: 'right' }}>
    <Drawer.Screen name="Home" component={Home} />
    <Drawer.Screen name="PasswordReset" component={PasswordReset} />

    {/* Add more screens as needed */}
  </Drawer.Navigator>
)

const AppContent = () => {
  const { isDarkTheme } = useThemeContext()
  const { auth } = useAuth()
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
      {auth ? (
        // If authenticated, render the drawer navigator
        <AuthenticatedApp />
      ) : (
        // Non-authenticated app structure
        <Stack.Navigator
          screenOptions={{
            headerShadowVisible: false,
            title: '',
            headerTitleAlign: 'center'
          }}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerRight: () => <ThemeToggleButton />,
              headerLeft: () => <HeaderLocalization />
            }}
          />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      )}
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
