import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

type ThemeContextType = {
  isDarkTheme: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useThemeContext = () => useContext(ThemeContext)

const THEME_STORAGE_KEY = 'userThemeIsDark'

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  useEffect(() => {
    // Učitavanje teme pri pokretanju
    const loadTheme = async () => {
      const storedThemePreference = await AsyncStorage.getItem(THEME_STORAGE_KEY)
      if (storedThemePreference !== null) {
        setIsDarkTheme(storedThemePreference === 'true')
      }
    }

    loadTheme()
  }, [])

  const toggleTheme = async () => {
    const newThemeValue = !isDarkTheme
    setIsDarkTheme(newThemeValue)
    await AsyncStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(newThemeValue))
  }

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>{children}</ThemeContext.Provider>
  )
}
