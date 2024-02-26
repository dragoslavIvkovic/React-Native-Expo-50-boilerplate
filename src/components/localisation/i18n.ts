// i18n.ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import RNLanguageDetector from '@os-team/i18next-react-native-language-detector'
import en from './translations/en.json'
import sr from './translations/sr.json'

void i18n
  .use(RNLanguageDetector) // detect user language in React Native environment
  .use(initReactI18next) // pass the i18n instance to react-i18next
  .init({
    resources: {
      en: { translation: en },
      sr: { translation: sr }
    },

    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    }
    // React Native does not use backend loading paths as web does
  })

export default i18n
