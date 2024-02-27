import React from 'react'
import 'intl-pluralrules'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ClientHomeScreen from '@screens/ClientHomeScreen'
import LoginScreen from '@screens/auth/LoginScreen'
import { CustomDarkTheme, CustomLightTheme } from 'src/theme/theme'
import { RootStackParamList } from 'src/navigation/RootStackParamList'
import ThemeToggleButton from '@components/ThemeToggleButton'
import HeaderLocalization from '@components/Header/HeaderLocalization'
import { ThemeProvider, useThemeContext } from 'src/context/ThemeProvider'

const Stack = createNativeStackNavigator<RootStackParamList>()

const AppContent = () => {
  const { isDarkTheme } = useThemeContext()

  return (
    <NavigationContainer theme={isDarkTheme ? CustomDarkTheme : CustomLightTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShadowVisible: false,
          title: '',
          headerTitleAlign: 'center'
        }}>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerRight: () => <ThemeToggleButton />,
            headerLeft: () => <HeaderLocalization />
          }}
        />
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
