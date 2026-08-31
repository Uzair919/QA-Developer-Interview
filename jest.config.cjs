module.exports = {
  projects: [
    {
      displayName: 'server',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/tests/server/**/*.test.js'],
    },
    {
      displayName: 'client',
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/tests/client/**/*.test.jsx'],
      setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
    },
  ],
  collectCoverageFrom: ['server/**/*.js', 'src/**/*.jsx', '!server/index.js'],
};
