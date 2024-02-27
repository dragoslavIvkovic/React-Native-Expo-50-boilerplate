// adaptiveDimensions.ts
import { useWindowDimensions } from 'react-native'

interface AdaptiveStyle {
  containerPadding: number
  margin: number
  fontSize: number
  inputWidth: number
}

export const useAdaptiveDimensions = (): AdaptiveStyle => {
  const { width } = useWindowDimensions()

  // Primer adaptivnih stilova koji se baziraju na širini ekrana
  const containerPadding = width * 0.05 // 5% od širine ekrana
  const margin = width * 0.03 // 3% od širine ekrana
  const fontSize = width < 360 ? 14 : 16 // Manja veličina fonta za manje ekrane
  const inputWidth = width * 0.5
  return {
    containerPadding,
    margin,
    fontSize,
    inputWidth
  }
}
