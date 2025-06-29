const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@/public/(.*)$': '<rootDir>/public/$1',
  },
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    './src/**/*.{js,jsx,ts,tsx}',
    '!./src/**/_*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  coverageDirectory: '<rootDir>/coverage/developer/jsdom/',
  coveragePathIgnorePatterns: [
    './src/__test__/developer/node/data',
    './src/__test__/developer/jsdom/data',
    './src/__test__/player',
    './src/clients',
    './src/constants',
    './src/libs',
    './src/pages/api',
    './src/services',
    './src/utils',
  ],
  roots: ['<rootDir>/src/__test__/developer/jsdom'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  setupFilesAfterEnv: ['./jest.setup.ts'],
};

module.exports = createJestConfig(customJestConfig);
