/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useColorScheme } from 'react-native'

interface ThemeContextType {
  isDarkTheme: boolean
  toggleTheme: () => Promise<void>
  setManualTheme: (value: boolean | null) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useThemeContext = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider')
  }
  return context
}

const THEME_STORAGE_KEY = 'userThemeIsDark'

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemTheme = useColorScheme()
  const [isDarkTheme, setIsDarkTheme] = useState(systemTheme === 'dark')
  const [manualTheme, setManualTheme] = useState<boolean | null>(null)

  useEffect(() => {
    const loadTheme = async () => {
      const storedThemePreference = await AsyncStorage.getItem(THEME_STORAGE_KEY)
      if (storedThemePreference !== null) {
        const isDark: boolean = JSON.parse(storedThemePreference) as boolean
        setIsDarkTheme(isDark)
        setManualTheme(isDark)
      } else {
        setIsDarkTheme(systemTheme === 'dark')
      }
    }

    void loadTheme()
  }, [systemTheme])

  const toggleTheme = async () => {
    const newThemeValue = !isDarkTheme
    setIsDarkTheme(newThemeValue)
    setManualTheme(newThemeValue)
    await AsyncStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(newThemeValue))
  }

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme, setManualTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
