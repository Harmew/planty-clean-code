jest.mock("react-native-aes-crypto", () => {
  const { backupCryptoMock } = require("@mocks/storage/backup-crypto.mock");

  return {
    __esModule: true,
    default: backupCryptoMock.aes,
  };
});

jest.mock("expo-crypto", () => {
  const { backupCryptoMock } = require("@mocks/storage/backup-crypto.mock");

  return {
    AESEncryptionKey: {
      import: backupCryptoMock.expoCrypto.importKey,
    },
    AESSealedData: {
      fromCombined: backupCryptoMock.expoCrypto.fromCombined,
    },
    aesEncryptAsync: backupCryptoMock.expoCrypto.encrypt,
    aesDecryptAsync: backupCryptoMock.expoCrypto.decrypt,
  };
});

import { backupCryptoMock } from "@mocks/storage/backup-crypto.mock";

import { backupCrypto } from "@infra/crypto/backup-crypto";

describe("backup-crypto", () => {
  const mockAes = backupCryptoMock.aes;
  const expoCryptoMock = backupCryptoMock.expoCrypto;

  beforeEach(() => {
    jest.clearAllMocks();

    mockAes.randomKey.mockResolvedValue("mock-salt");

    mockAes.pbkdf2.mockResolvedValue("mock-key");

    expoCryptoMock.importKey.mockResolvedValue(expoCryptoMock.encryptionKey);

    expoCryptoMock.sealedData.combined.mockResolvedValue("mock-encrypted-data");

    expoCryptoMock.encrypt.mockResolvedValue(expoCryptoMock.sealedData);

    expoCryptoMock.fromCombined.mockReturnValue(expoCryptoMock.sealedData);
  });

  describe("encrypt", () => {
    it("criptografa os dados", async () => {
      const data = JSON.stringify({
        name: "Jiboia",
      });

      const password = "minha-senha";

      const result = await backupCrypto.encrypt(data, password);

      expect(mockAes.randomKey).toHaveBeenCalledWith(16);

      expect(mockAes.pbkdf2).toHaveBeenCalledWith(password, "mock-salt", 600_000, 256, "sha256");

      expect(expoCryptoMock.importKey).toHaveBeenCalledWith("mock-key", "base64");

      expect(expoCryptoMock.encrypt).toHaveBeenCalledWith(expect.any(String), expoCryptoMock.encryptionKey);

      expect(expoCryptoMock.sealedData.combined).toHaveBeenCalledWith("base64");

      expect(result).toBe(
        JSON.stringify({
          version: 1,
          algorithm: "AES-256-GCM",
          kdf: "PBKDF2-SHA256",
          iterations: 600_000,
          salt: "mock-salt",
          data: "mock-encrypted-data",
        }),
      );
    });
  });

  describe("decrypt", () => {
    it("descriptografa os dados", async () => {
      const data = JSON.stringify({
        name: "Jiboia",
      });

      const encrypted = JSON.stringify({
        version: 1,
        algorithm: "AES-256-GCM",
        kdf: "PBKDF2-SHA256",
        iterations: 600_000,
        salt: "mock-salt",
        data: "mock-encrypted-data",
      });

      const password = "minha-senha";

      const encryptedBase64 = btoa(unescape(encodeURIComponent(data)));

      expoCryptoMock.decrypt.mockResolvedValue(encryptedBase64);

      const result = await backupCrypto.decrypt(encrypted, password);

      expect(mockAes.pbkdf2).toHaveBeenCalledWith(password, "mock-salt", 600_000, 256, "sha256");

      expect(expoCryptoMock.importKey).toHaveBeenCalledWith("mock-key", "base64");

      expect(expoCryptoMock.fromCombined).toHaveBeenCalledWith("mock-encrypted-data");

      expect(expoCryptoMock.decrypt).toHaveBeenCalledWith(expoCryptoMock.sealedData, expoCryptoMock.encryptionKey, {
        output: "base64",
      });

      expect(result).toBe(data);
    });
  });

  describe("validações", () => {
    it("rejeita versão não suportada", async () => {
      const encrypted = JSON.stringify({
        version: 2,
        algorithm: "AES-256-GCM",
        kdf: "PBKDF2-SHA256",
        iterations: 600_000,
        salt: "mock-salt",
        data: "mock-encrypted-data",
      });

      await expect(backupCrypto.decrypt(encrypted, "senha")).rejects.toThrow("Versão do backup não suportada");
    });

    it("rejeita algoritmo não suportado", async () => {
      const encrypted = JSON.stringify({
        version: 1,
        algorithm: "AES-256-CBC",
        kdf: "PBKDF2-SHA256",
        iterations: 600_000,
        salt: "mock-salt",
        data: "mock-encrypted-data",
      });

      await expect(backupCrypto.decrypt(encrypted, "senha")).rejects.toThrow("Algoritmo de criptografia não suportado");
    });

    it("rejeita KDF não suportado", async () => {
      const encrypted = JSON.stringify({
        version: 1,
        algorithm: "AES-256-GCM",
        kdf: "PBKDF2-SHA512",
        iterations: 600_000,
        salt: "mock-salt",
        data: "mock-encrypted-data",
      });

      await expect(backupCrypto.decrypt(encrypted, "senha")).rejects.toThrow("KDF não suportado");
    });
  });
});
