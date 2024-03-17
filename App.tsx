import 'intl-pluralrules'
import React from 'react'
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

const AppContent = () => {
  const { isDarkTheme } = useThemeContext()
  const { auth } = useAuth()

  const linking = {
    prefixes: ['com.pet.garrd://'],
    config: {
      screens: {
        Auth: {
          path: 'auth',
          screens: {
            Login: 'login',
            Register: 'register',
            PasswordReset: 'password-reset',
            CreateProfile: 'create-profile'
          }
        },
        Home: 'home',
        ProfileSettings: 'profile-settings'
      }
    }
  }

  return (
    <NavigationContainer theme={isDarkTheme ? CustomDarkTheme : CustomLightTheme} linking={linking}>
      {auth ? (
        // Ako je korisnik ulogovan, prikažite tab navigatore
        <MainTabNavigator />
      ) : (
        // U suprotnom, koristite AuthStack za prikaz ekrana za autentifikaciju
        <AuthStack />
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
