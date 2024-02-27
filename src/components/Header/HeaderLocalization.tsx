import React, { useState, useMemo } from 'react'
import { View, StyleSheet } from 'react-native'
import { getLocales } from 'expo-localization'
import { Picker } from '@react-native-picker/picker'
import { useLanguageStore } from '@store/LocalizationStore'
import { useThemeContext } from 'src/context/ThemeProvider'

const HeaderLocalization: React.FC = () => {
  const { isDarkTheme } = useThemeContext()
  const iconColor = isDarkTheme ? 'white' : 'black'
  const { language, setLanguage } = useLanguageStore()

  const supportedLanguages = useMemo(() => ['en', 'sr', 'ru'], [])

  const getInitialLanguage = () => {
    const deviceLocale = getLocales()[0]?.languageCode || 'en'
    return supportedLanguages.includes(deviceLocale) ? deviceLocale : 'en'
  }

  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    const initialLanguage = getInitialLanguage()
    if (language !== initialLanguage) {
      void setLanguage(initialLanguage)
    }
    return initialLanguage
  })

  const handleLanguageChange = (lang: string) => {
    void setLanguage(lang)
    setSelectedLanguage(lang)
  }

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedLanguage}
        onValueChange={handleLanguageChange}
        style={{ width: 200, height: 44, color: iconColor }}>
        {supportedLanguages.map(lang => {
          let label = lang
          switch (lang) {
            case 'en':
              label = 'English'
              break
            case 'sr':
              label = 'Српски'
              break
            case 'ru':
              label = 'Русский'
              break
          }
          return <Picker.Item key={lang} label={label} value={lang} />
        })}
      </Picker>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default HeaderLocalization
