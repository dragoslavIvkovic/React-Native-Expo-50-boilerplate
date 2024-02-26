import { AxiosError } from 'axios'
import { TFunction } from 'i18next'
import { Alert } from 'react-native'

interface ErrorResponse {
  status: number
  detail: string
  errors: string[]
  error?: string
}

export const handleAxiosError = (error: unknown, t: TFunction): void => {
  const axiosError = error as AxiosError<ErrorResponse, unknown>

  if (axiosError.response && Array.isArray(axiosError.response.data.errors)) {
    const statusERROR = axiosError.response.data.status

    if (statusERROR === 500) {
      const errorMessage500 = axiosError.response.data.detail
      console.log('errorMessage500', errorMessage500)
      Alert.alert(
        t('commonTranslations.axiosErrorTitle'),
        t('commonTranslations.axiosErrorPrefix') + errorMessage500
      )
    } else {
      const errorMessage400 = axiosError.response.data.errors.join('\n')
      console.log('errorMessage400', errorMessage400)
      Alert.alert(
        t('commonTranslations.axiosErrorTitle'),
        t('commonTranslations.axiosErrorPrefix') + errorMessage400
      )
    }
  } else {
    // Type guard to ensure defaultError is a string
    const defaultErrorMessage = axiosError.response?.data?.error
    const defaultError =
      typeof defaultErrorMessage === 'string' ? defaultErrorMessage : t('unknownError')
    Alert.alert(defaultError)
  }
}
