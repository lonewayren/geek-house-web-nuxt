module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // indent 2 spaces
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    'comma-spacing': [2, { before: false, after: true }],
    "semi-style": ["error", "last"],
    //引号类型 `` "" ''
    quotes: [1, 'single'],
  },
  'globals': {
      '$': true,
      '_': true
  }
}
