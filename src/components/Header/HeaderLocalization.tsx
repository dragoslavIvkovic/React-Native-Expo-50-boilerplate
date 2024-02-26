import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { getLocales } from 'expo-localization'
import { Picker } from '@react-native-picker/picker'
import { useLanguageStore } from '@store/LocalizationStore'
import i18n from '@components/localisation/i18n'

const HeaderLocalization: React.FC = () => {
  const { language, setLanguage } = useLanguageStore()
  const [selectedLanguage, setSelectedLanguage] = useState(language)
  const supportedLanguages = ['en', 'sr'] // Definiše podržane jezike

  useEffect(() => {
    // Ovo se pokreće samo jednom na početku da postavi jezik na osnovu uređaja ili čuvanog jezika
    const initializeLanguage = async () => {
      const deviceLocale = getLocales()[0]?.languageCode || 'en'
      const effectiveLocale = supportedLanguages.includes(deviceLocale) ? deviceLocale : 'en'
      if (language !== effectiveLocale) {
        await setLanguage(effectiveLocale)
      }
    }

    initializeLanguage()
  }, [])

  useEffect(() => {
    // Osluškuje promene u `language` i ažurira lokalni state komponente
    setSelectedLanguage(language)
  }, [language])

  const handleLanguageChange = async (lang: string) => {
    await setLanguage(lang)
    // Ne treba postavljati selectedLanguage ovde jer će to uraditi useEffect
  }

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedLanguage}
        onValueChange={handleLanguageChange}
        style={{ width: 200, height: 44 }} // Primer stilova za Picker
      >
        {supportedLanguages.map(lang => (
          <Picker.Item key={lang} label={lang === 'en' ? 'English' : 'Српски'} value={lang} />
        ))}
      </Picker>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // Dodaj svoje stilove ovde
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default HeaderLocalization
