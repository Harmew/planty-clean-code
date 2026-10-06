jest.mock("expo-crypto", () => ({
  AESEncryptionKey: { import: jest.fn() },
  AESSealedData: { fromCombined: jest.fn() },
  aesEncryptAsync: jest.fn(),
  aesDecryptAsync: jest.fn(),
}));
