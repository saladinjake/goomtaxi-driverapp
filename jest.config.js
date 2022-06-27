module.exports = {
  clearMocks: true,
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!jest.config.js',
    '!webpack.config.dev.js',
    '!webpack.config.common.js',
    '!webpack.config.prod.js',
    '!**/coverage/**',
    '!**/src/__tests__/**',
    '!**/src/index.js',
    '!**/src/helpers/**',
    '!**/src/services/**',
    '!**/src/router.js',
    '!**/server.js',
    '!**/dist/**'
  ],
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['js', 'json', 'jsx'],
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/src/__mocks__/styleMock.js',
    '\\.(jpg|jpeg|png|gif|otf|webp|svg)$': '<rootDir>/src/__mocks__/fileMock.js',
  },
  setupFiles: ['<rootDir>/enzyme.config.js'],
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  testPathIgnorePatterns: [
    '\\\\node_modules\\\\',
    './__tests__/helpers/*',
    '/server.js',
    '/src/__tests__/components/__snapshots__',
    '/src/helpers',
  ]
  ,
  testURL: 'http://localhost',
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  verbose: false,
};