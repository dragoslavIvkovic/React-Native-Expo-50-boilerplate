// useLanguageStore.ts
import { create } from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage'
import i18n from '@components/localisation/i18n'

interface LanguageState {
  language: string
  setLanguage: (lang: string) => Promise<void>
}

const LANGUAGE_KEY = 'userLanguage'

const useLanguageStore = create<LanguageState>(set => ({
  language: 'en', // Podrazumevani jezik
  setLanguage: async (lang: string) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_KEY, lang) // Čuva izabrani jezik
      set({ language: lang }) // Ažurira stanje jezika
      void i18n.changeLanguage(lang) // Menja trenutni jezik u i18n
    } catch (error) {
      console.error('Failed to save language to AsyncStorage:', error)
    }
  }
}))

// Funkcija za inicijalizaciju jezika na osnovu sačuvane vrednosti
const initializeLanguage = async () => {
  try {
    const storedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY)
    if (storedLanguage) {
      await useLanguageStore.getState().setLanguage(storedLanguage)
    }
  } catch (error) {
    console.error('Failed to initialize language:', error)
  }
}

void initializeLanguage() // Pokreće inicijalizaciju pri učitavanju aplikacije

export { useLanguageStore }
