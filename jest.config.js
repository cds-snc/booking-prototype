module.exports = {
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/__tests__/fixtures/',
  ],
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 70,
      lines: 80,
      statements: 80,
    },
  }
}
