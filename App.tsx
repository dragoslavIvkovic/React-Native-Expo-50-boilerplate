import React, { useEffect, useRef } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '@screens/Home'
import ProfileSettings from '@screens/ProfileSettings' // Pretpostavimo da ovo postoji
import { CustomDarkTheme, CustomLightTheme } from 'src/theme/theme'
import ThemeToggleButton from '@components/ThemeToggleButton'
import HeaderLocalization from '@components/Header/HeaderLocalization'
import { ThemeProvider, useThemeContext } from 'src/context/ThemeProvider'
import AuthProvider, { useAuth } from './src/provider/AuthProvider'
import Login from '@screens/auth/Login'
import Register from '@screens/auth/Register'
import PasswordReset from '@screens/auth/PasswordReset'
import { Ionicons as Icon } from '@expo/vector-icons'
import CreateProfile from '@screens/CreateProfile'
import * as Linking from 'expo-linking'
import UpdatePassword from '@screens/auth/UpdatePassword'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function AuthStack() {
  return (
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
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="PasswordReset" component={PasswordReset} />
      <Stack.Screen name="CreateProfile" component={CreateProfile} />
      <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
    </Stack.Navigator>
  )
}

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === 'Home') {
            iconName = focused ? 'home-sharp' : 'home-outline'
          } else if (route.name === 'ProfileSettings') {
            iconName = focused ? 'settings' : 'settings-outline'
          }
          return <Icon name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: [{ display: 'flex' }, null]
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="ProfileSettings" component={ProfileSettings} />
    </Tab.Navigator>
  )
}

const linking = {
  prefixes: ['com.pet.garrd://', 'https://vgyoojanikcruxzcnilm.supabase.co'],
  config: {
    screens: {
      Login: 'login',
      Register: 'register',
      PasswordReset: 'password-reset',
      CreateProfile: 'create-profile',
      UpdatePassword: 'update-password', // Direktno na root nivou
      Home: 'home',
      ProfileSettings: 'profile-settings'
    }
  }
}

const AppContent = () => {
  const { isDarkTheme } = useThemeContext()
  const { auth } = useAuth()
  const navigationRef = useRef()

  useEffect(() => {
    const handleDeepLinkEvent = event => {
      console.log('Deep link event url: ', event.url)
      const parsedUrl = Linking.parse(event.url)
      console.log('Parsed event URL:', parsedUrl)

      // Extracting the access_token from the URL if present
      const accessToken = parsedUrl.queryParams.access_token
      if (accessToken) {
        setAccessToken(accessToken) // Set access token using your context/state method
        console.log('Access token is set:', accessToken)
      }

      if (parsedUrl.hostname === 'update-password' && !auth) {
        console.log('Navigating to UpdatePassword from event')
        navigationRef.current?.navigate('UpdatePassword')
      }
      // Add additional logic here if necessary
    }

    // Adding the event listener
    Linking.addEventListener('url', handleDeepLinkEvent)

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      Linking.removeEventListener('url', handleDeepLinkEvent)
    }
  }, [auth]) // Ensure this effect runs whenever the auth state changes

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={isDarkTheme ? CustomDarkTheme : CustomLightTheme}
      linking={linking}>
      {auth ? <MainTabNavigator /> : <AuthStack />}
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
function setAccessToken(token: string) {
  throw new Error('Function not implemented.')
}
