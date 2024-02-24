import React from 'react'
import { useColorScheme } from 'react-native'
import { DarkTheme, DefaultTheme, NavigationContainer, useTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ClientHomeScreen from '@screens/ClientHomeScreen'
import LoginScreen from '@screens/auth/LoginScreen'

// Assuming RootStackParamList is defined elsewhere in your project
const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <NavigationContainer>
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
