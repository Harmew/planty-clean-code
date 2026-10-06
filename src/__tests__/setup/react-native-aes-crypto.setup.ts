jest.mock("react-native-aes-crypto", () => ({
  __esModule: true,
  default: { randomKey: jest.fn(), pbkdf2: jest.fn() },
}));
