import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ClientHomeScreen from '@screens/ClientHomeScreen'
import LoginScreen from '@screens/auth/LoginScreen'
import { CustomDarkTheme, CustomLightTheme } from 'src/theme/theme'
import { ThemeProvider, useThemeContext } from 'src/theme/ThemeProvider'

const Stack = createNativeStackNavigator<RootStackParamList>()

const AppContent = () => {
  const { isDarkTheme } = useThemeContext() // Ovo treba premestiti unutar komponente koja će koristiti kontekst

  return (
    <NavigationContainer theme={isDarkTheme ? CustomDarkTheme : CustomLightTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShadowVisible: false,
          title: '',
          headerTitleAlign: 'center'
        }}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="ClientHomeScreen" component={ClientHomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}
