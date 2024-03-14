module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module:react-native-dotenv', {
        moduleName: '@env',
        path: '.env',
        safe: false, // Load '.env.example' to check for missing variables
        allowUndefined: true, // Allow some variables to be undefined
      }],
    ],
  };
};
