module.exports = {
  preset: "jest-expo",
  forceExit: true,
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg)",
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/src/__tests__/__mocks__/",
    "<rootDir>/src/__tests__/setup/",
    "<rootDir>/src/__tests__/e2e/",
  ],
  setupFilesAfterEnv: [
    "<rootDir>/src/__tests__/setup/reanimated.setup.ts",
    "<rootDir>/src/__tests__/setup/safe-area.setup.ts",
    "<rootDir>/src/__tests__/setup/async-storage.setup.ts",
    "<rootDir>/src/__tests__/setup/expo-notifications.setup.ts",
  ],
  // lcov gera tanto o lcov.info quanto o relatório HTML em coverage/lcov-report, que o CI publica no GitHub Pages; json-summary gera o coverage-summary.json, de onde saem os números do resumo do run e do comentário no PR. 'text' continua aí só pela tabela no terminal, no uso local.
  coverageReporters: ["lcov", "text", "json-summary"],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",

    "!src/**/*.d.ts",
    "!src/**/types.ts",
    "!src/**/index.ts",

    "!src/__tests__/**/*",
    "!src/__tests__/setup/**/*",
    "!src/__tests__/e2e/**/*",

    // arquivos só de tipos/interfaces ou barris de re-export puro: sem lógica de runtime para cobrir.
    "!src/domain/repositories/**",
    "!src/domain/entities/**",
    "!src/domain/models/**",
    "!src/domain/services/**",
    "!src/domain/storage/**",

    "!src/data/dto/**",

    // arquivos declarativos/configuração sem lógica
    "!src/shared/theme/**",
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
