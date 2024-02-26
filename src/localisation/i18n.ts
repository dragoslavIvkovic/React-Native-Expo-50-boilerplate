import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: require('./locales/en.json')
  },
  sr: {
    translation: require('./locales/sr.json')
  }
  // Add other languages here...
}

void i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // Default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
})

export default i18n
