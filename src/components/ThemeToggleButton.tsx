// Import React and necessary hooks
import React from 'react'
import Button from 'src/styledComponents/Button'
import { useThemeContext } from 'src/theme/ThemeProvider'
// Import the useThemeContext hook

// Define a new component, e.g., ThemeToggleButton
const ThemeToggleButton = () => {
  // Use the toggleTheme function from the theme context
  const { toggleTheme } = useThemeContext()

  // Return the Button component with your props
  return (
    <Button
      onPress={toggleTheme}
      variant="medium"
      title="Change Theme" // Assuming you handle translations elsewhere or hardcoding for simplicity
    />
  )
}

export default ThemeToggleButton
