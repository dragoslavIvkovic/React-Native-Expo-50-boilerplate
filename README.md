# ketering-app  

## Description

 
### Prerequisites

- Android Studio
- Android SDK
- JDK
- Node

### Installation Steps
 

### How to Use
npx expo install

## Check build

npx expo-doctor

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

 

## build .apk:

To build into .apk file, you can build using production profile. 
http do not work in android. So we mast

  
## app.json:


"plugins": [
      [
        "expo-build-properties",
        {
          "android": {
            "usesCleartextTraffic": true
          }
        }
      ]
    ]
 
Start command

  **npx expo start --clear**
  **eas build --platform android**


## generate api - openapi-generator:
every time you want to update generated api files, you only need to enter the below command in the terminal:



**npm run generate:apis**
after this command in base.ts comment this line export const BASE_PATH
in export class BaseAPI replace string = BASE_PATH with string = BASE_PATH_URL , import it from .env

## Frequently Asked Questions (FAQ)

-  
 

 **add this to the default terminal**
  
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools


... and so on for every frequently asked question.

 


 
© 2023 Creen. All rights reserved.