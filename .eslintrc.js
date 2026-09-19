module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  overrides: [
    {
      files: ['static/sw.js'],
      env: {
        serviceworker: true
      },
      globals: {
        workbox: 'readonly'
      },
      rules: {
        // Nuxt PWA が生成する拡張フックは空のまま残ることがある。
        'no-unused-vars': 'off'
      }
    }
  ],
  rules: {
    'vue/attributes-order': 'off',
    'vue/component-definition-name-casing': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/html-self-closing': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/order-in-components': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/v-slot-style': 'off'
  }
}
