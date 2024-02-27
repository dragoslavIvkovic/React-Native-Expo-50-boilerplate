import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useColorScheme } from 'react-native'

const ThemeContext = createContext({
  isDarkTheme: false,
  toggleTheme: () => {},
  setManualTheme: () => {}
})

export const useThemeContext = () => useContext(ThemeContext)

const THEME_STORAGE_KEY = 'userThemeIsDark'

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemTheme = useColorScheme() // 'light' ili 'dark'
  const [isDarkTheme, setIsDarkTheme] = useState(systemTheme === 'dark')
  const [manualTheme, setManualTheme] = useState<boolean | null>(null)

  console.log('manualTheme', systemTheme, isDarkTheme)

  useEffect(() => {
    // Učitavanje korisnikove preferencije teme pri pokretanju
    const loadTheme = async () => {
      const storedThemePreference = await AsyncStorage.getItem(THEME_STORAGE_KEY)
      if (storedThemePreference !== null) {
        const isDark = JSON.parse(storedThemePreference)
        setIsDarkTheme(isDark)
        setManualTheme(isDark)
      } else {
        setIsDarkTheme(systemTheme === 'dark')
      }
    }

    void loadTheme()
  }, [systemTheme])

  const toggleTheme = async () => {
    // Ako korisnik ručno promeni temu, poništava se automatsko praćenje sistemskih postavki
    const newThemeValue = !isDarkTheme
    setIsDarkTheme(newThemeValue)
    setManualTheme(newThemeValue)
    await AsyncStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(newThemeValue))
  }

  // Ako korisnik nije ručno promenio temu, pratimo sistemsku temu
  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme, setManualTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
