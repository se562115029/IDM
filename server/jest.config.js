module.exports = {
  clearMocks: true,
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/src/shared/singleton.ts"],
  testPathIgnorePatterns: ["<rootDir>/dist/"],
};
