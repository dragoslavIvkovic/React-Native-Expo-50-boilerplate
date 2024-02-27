import { AxiosError } from 'axios'
import { TFunction } from 'i18next'
import { Alert } from 'react-native'

interface ErrorResponse {
  code?: number
  data?: {
    detail?: string
    errors?: string[]
  }
  error?: string
}

export const handleAxiosError = (error: unknown, t: TFunction): void => {
  const axiosError = error as AxiosError<ErrorResponse>

  if (axiosError && axiosError.response) {
    const responseData = axiosError.response.data
    if (responseData.code && responseData.code >= 400) {
      if (responseData.data?.errors && responseData.data.errors.length > 0) {
        // Handle case with multiple error messages
        const errorMessage = responseData.data.errors.join('\n')
        Alert.alert(
          t('commonTranslations.axiosErrorTitle'),
          t('commonTranslations.axiosErrorPrefix') + errorMessage
        )
      } else if (responseData.data?.detail) {
        // Handle case with a single detailed error message
        Alert.alert(
          t('commonTranslations.axiosErrorTitle'),
          t('commonTranslations.axiosErrorPrefix') + responseData.data.detail
        )
      } else {
        // Generic error handler if specific errors are not provided
        const genericErrorMessage = responseData.error || t('commonTranslations.axiosErrorGeneric')
        Alert.alert(t('commonTranslations.axiosErrorTitle'), genericErrorMessage)
      }
    }
  } else {
    // Fallback error handler for cases where response structure is unexpected or not present
    const fallbackErrorMessage = t('commonTranslations.axiosErrorFallback')
    Alert.alert(t('commonTranslations.axiosErrorTitle'), fallbackErrorMessage)
  }
}
