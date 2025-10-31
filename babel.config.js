module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'], // required if using Reanimated 2+ 
  };
};
