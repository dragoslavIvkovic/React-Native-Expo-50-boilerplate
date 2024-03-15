module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@assets': './assets',
            '@components': './src/components',
            '@screens': './src/screens',
            '@navigator': './src/navigator',
            '@utils': './src/utils',
            '@theme': './src/theme',
            '@modules': './src/modules',
            '@store': './src/store'
          }
        }
      ],
      'inline-dotenv',
      'react-native-reanimated/plugin'
    ]
  }
}
