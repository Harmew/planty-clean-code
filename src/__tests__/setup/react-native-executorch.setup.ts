jest.mock("react-native-executorch", () => ({
  download: jest.fn(),
  models: {
    llm: {
      SMOLLM2_360M: {
        DEFAULT: "mock-model",
      },
    },
  },
}));
