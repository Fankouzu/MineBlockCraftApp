module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    "prettier/prettier":["off","always"],
    "semi":["off","always"],
    "react-native/semi":["off","always"],
    "react-native/no-unused-styles": 2,
    "react-native/split-platform-components": 1,
    "react-native/no-inline-styles": 0,
    "react-native/no-color-literals": 0,
    "react-native/no-raw-text": 2,
    "react-native/no-single-element-style-arrays": 2,
    "react-hooks/exhaustive-deps":1,
  },
  settings: {
    'react-native/style-sheet-object-names': ['EStyleSheet', 'OtherStyleSheet', 'PStyleSheet']
  },
  plugins: [
    "react",
    "react-native"
  ],
  parserOptions: {
    "ecmaFeatures": {
      "jsx": true
    }
  },
  env: {
    "react-native/react-native": true
  }
};
