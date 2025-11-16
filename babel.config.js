module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@src': './src',
          '@styles': './src/styles',
          '@services': './src/services',
          '@utils': './src/utils',
          '@components': './src/components',
          '@screens': './src/screens',
          '@typesdef': './src/typesdef',
          '@context': './src/context',
          '@store': './src/store',
          '@navigation': './src/navigation',
        },
      },
    ],
  ],
};
