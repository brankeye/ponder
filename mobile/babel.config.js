// eslint-disable-next-line no-undef
module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      '@babel/preset-flow',
      'babel-preset-expo',
      'module:react-native-dotenv',
    ],
    plugins: [
      'babel-plugin-inline-import',
      '@babel/transform-react-jsx-source',
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@@assets': './src/assets',
            '@@components': './src/components',
            '@@screens': './src/screens',
            '@@graphql': './src/graphql',
            '@@utils': './src/utils',
          },
        },
      ],
    ],
  };
};
