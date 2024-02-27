import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import RNLanguageDetector from '@os-team/i18next-react-native-language-detector'
import en from './translations/en.json'
import sr from './translations/sr.json'
import ru from './translations/ru.json'

void i18n
  .use(RNLanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      sr: { translation: sr },
      ru: { translation: ru }
    },

    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
