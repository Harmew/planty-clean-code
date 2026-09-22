export const cryptoMock = {
  aes: {
    randomKey: jest.fn(),
    pbkdf2: jest.fn(),
  },

  expoCrypto: {
    encryptionKey: {},
    sealedData: {
      combined: jest.fn(),
    },
    importKey: jest.fn(),
    fromCombined: jest.fn(),
    encrypt: jest.fn(),
    decrypt: jest.fn(),
  },
};
