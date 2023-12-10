import type { Config } from 'jest'

const config: Config = {
  roots: ['<rootDir>'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '^@/(.*)$': ['<rootDir>/$1']
  },
  testPathIgnorePatterns: ['node_modules', 'e2e', 'tests-examples', 'playwright-report', 'test-results'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.js?$',
  moduleFileExtensions: ['ts', 'js'],
  collectCoverage: false,
  clearMocks: true,
  coverageDirectory: 'coverage',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }]
  },
  setupFilesAfterEnv: ['<rootDir>/setupTests.js']
}

export default config
