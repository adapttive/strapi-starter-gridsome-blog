module.exports = {
  parser: "vue-eslint-parser",
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "plugin:gridsome/recommended",
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'gridsome'
  ],
}
