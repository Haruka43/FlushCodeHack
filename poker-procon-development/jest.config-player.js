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
  coverageDirectory: '<rootDir>/coverage/plyaer/',
  coveragePathIgnorePatterns: [
    './src/__test__/developer',
    './src/apis',
    './src/clients',
    './src/components',
    './src/constants',
    './src/libs',
    './src/pages/api',
    './src/pages',
    './src/schema/request',
    './src/services/admin.ts',
    './src/services/file.ts',
    './src/services/game.ts',
    './src/services/round.ts',
    './src/styles',
    './src/templates',
    './src/utils',
  ],
  roots: ['<rootDir>/src/__test__/player'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  setupFilesAfterEnv: ['./jest.setup.ts'],
};

module.exports = createJestConfig(customJestConfig);
