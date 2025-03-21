module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // 其他插件...
    'react-native-reanimated/plugin' // 必须放在最后
  ]
};
