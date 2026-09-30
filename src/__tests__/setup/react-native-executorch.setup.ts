jest.mock("react-native-executorch", () => ({
  createLLMChatSession: jest.fn(),
  download: jest.fn(),
  models: {
    llm: {
      SMOLLM2_135M: {
        DEFAULT: "test-model",
      },
    },
  },
}));
