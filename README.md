 

## Description

 
### Prerequisites

- Android Studio
- Android SDK
- JDK
- Node

### Installation Steps
 

### How to Use
npm install

## Check build
npx expo-doctor
  **npx expo-doctor**
  **npx expo install --fix**
  **npx expo install --check**

## build dev and production apk with:

**eas build --profile production --platform android**
**eas build --profile development --platform android**

## build local apk with:
**eas build --platform android --local**

## start with:

**npx expo start --dev-client**

## install the correct versions of these packages:
  
  **nvm use 18.18.0** >= 18
  **npx expo-doctor**
  **npx expo install --fix**
  **npx expo install --check**

 
 This React Native boilerplate, named "react-native-boilerplate," is a comprehensive starting point for building React Native applications using Expo. It is designed with productivity and scalability in mind, featuring a robust set of dependencies and configurations to kickstart development. Here's an overview of its key features:

Localization and Internationalization
Automatic Language Detection: Utilizes @os-team/i18next-react-native-language-detector for automatic user language detection, ensuring that the app can present content in the user's preferred language.
i18next Integration: Leverages i18next and react-i18next for an easy-to-use internationalization framework, allowing for seamless translations and multi-language support.
Theme Management
Dark and Light Modes: Supports both dark and light themes, with automatic theme selection based on the system's theme. Users can also manually switch between themes, providing a customizable user experience.
Expo Localization: Utilizes expo-localization for integrating localization features, ensuring that theme and language preferences are aligned with user and system settings.
Code Quality and Maintenance
Linting and Formatting: Integrates ESLint and Prettier for code quality assurance, with predefined scripts for linting (eslint src/ --fix --max-warnings=0) and formatting (prettier 'src/**/*.{js,jsx,ts,tsx}' --write). This ensures that the codebase remains clean, readable, and consistent.
Husky for Git Hooks: Uses husky to manage Git hooks, automating linting and formatting checks before commits through lint-staged configurations. This helps maintain code quality and prevents common errors.
Development and Build Tools
Expo Managed Workflow: Built on the Expo managed workflow (expo version 50), providing a simplified development process, easy updates, and access to the Expo ecosystem without needing native code.
React Navigation: Incorporates @react-navigation/native and related packages for intuitive and customizable navigation solutions.
AsyncStorage and NetInfo: Includes @react-native-async-storage/async-storage and @react-native-community/netinfo for local storage management and network information access, respectively.
Additional Libraries and Tools
Axios for Networking: Utilizes axios for making HTTP requests, facilitating API interactions.
TypeScript Support: Offers full TypeScript support, enhancing development with static typing.
OpenAPI Integration: Features a script to generate API services (generate:apis) using @openapitools/openapi-generator-cli, streamlining the process of connecting to RESTful APIs.
Dependencies and DevDependencies
The boilerplate comes packed with a wide range of dependencies (expo, react-native, react-navigation, etc.) and development dependencies (eslint, typescript, jest, etc.) curated for an optimal development experience.
This boilerplate is ideal for developers looking to jumpstart their React Native projects with a structured, scalable foundation. It addresses common development concerns such as localization, theming, code quality, and API integration, allowing developers to focus on building unique features and improving user experience.
