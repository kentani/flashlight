module.exports = {
  testMatch: ['<rootDir>/test/**/*.spec.js'],
  testPathIgnorePatterns: [
    '<rootDir>/test/e2e/'
  ],
  moduleNameMapper: {
    '\\.(ogg|mp3|wav|mpe?g|png|jpe?g|gif|svg)$': '<rootDir>/test/mocks/file.js',
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js'
  },
  moduleFileExtensions: [
    'js',
    'vue',
    'json'
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': '@vue/vue2-jest'
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/components/**/*.vue',
    '<rootDir>/pages/**/*.vue'
  ],
  coverageThreshold: {
    global: {
      branches: 45,
      functions: 15,
      lines: 22,
      statements: 22
    }
  },
  testEnvironment: 'jsdom'
}
