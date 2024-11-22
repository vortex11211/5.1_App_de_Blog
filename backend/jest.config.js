// jest.config.js
require('dotenv').config();

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/src/test/**/*.test.ts'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
      },
      transformIgnorePatterns: [
        '/node_modules/',
        '/dist/',
      ],
  };
  