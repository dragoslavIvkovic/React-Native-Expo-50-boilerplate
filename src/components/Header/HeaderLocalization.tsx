import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { getLocales, getCalendars } from 'expo-localization'

import { useLanguageStore } from '@store/LocalizationStore' // Pretpostavka da je ovo ispravan put do tvog store-a
import i18n from '@components/localisation/i18n'

const HeaderLocalization: React.FC = () => {
  const { language, setLanguage } = useLanguageStore()
  const [flag, setFlag] = useState<string>(language === 'en' ? '🇬🇧' : 'sr')

  useEffect(() => {
    setFlag(language === 'en' ? '🇬🇧' : 'sr')
  }, [language])

  const toggleLanguage = async () => {
    const newLanguage = language === 'en' ? 'sr' : 'en'
    await setLanguage(newLanguage)
    i18n
      .changeLanguage(newLanguage)
      .catch(error => console.error('Error changing language:', error))
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleLanguage}>
        <Text style={styles.text}>{flag}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})

export default HeaderLocalization
