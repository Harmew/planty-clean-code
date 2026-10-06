import { AESEncryptionKey, AESSealedData, aesDecryptAsync, aesEncryptAsync } from "expo-crypto";

import Aes from "react-native-aes-crypto";

import { backupCrypto } from "@infra/crypto/backup-crypto";

describe("backup-crypto", () => {
  const mockAes = jest.mocked(Aes);
  const mockImportKey = jest.mocked(AESEncryptionKey.import);
  const mockFromCombined = jest.mocked(AESSealedData.fromCombined);
  const mockEncrypt = jest.mocked(aesEncryptAsync);
  const mockDecrypt = jest.mocked(aesDecryptAsync);

  const encryptionKey = {} as Awaited<ReturnType<typeof AESEncryptionKey.import>>;
  const sealedData = { combined: jest.fn() } as unknown as Awaited<ReturnType<typeof AESSealedData.fromCombined>>;
  const encrypted = JSON.stringify({ salt: "mock-salt", data: "mock-encrypted-data" });

  beforeEach(() => {
    jest.clearAllMocks();

    mockAes.randomKey.mockResolvedValue("mock-salt");
    mockAes.pbkdf2.mockResolvedValue("mock-key");

    mockImportKey.mockResolvedValue(encryptionKey);
    mockFromCombined.mockReturnValue(sealedData);

    jest.mocked(sealedData.combined).mockResolvedValue("mock-encrypted-data");

    mockEncrypt.mockResolvedValue(sealedData);
  });

  describe("encrypt", () => {
    it("criptografa os dados", async () => {
      const data = JSON.stringify({ name: "Jiboia" });
      const result = await backupCrypto.encrypt(data, "minha-senha");

      expect(mockAes.randomKey).toHaveBeenCalledWith(16);
      expect(mockAes.pbkdf2).toHaveBeenCalledWith("minha-senha", "mock-salt", 600_000, 256, "sha256");
      expect(mockImportKey).toHaveBeenCalledWith("mock-key", "hex");
      expect(mockEncrypt).toHaveBeenCalledWith(expect.any(String), encryptionKey);
      expect(jest.mocked(sealedData.combined)).toHaveBeenCalledWith("base64");
      expect(result).toBe(JSON.stringify({ salt: "mock-salt", data: "mock-encrypted-data" }));
    });
  });

  describe("decrypt", () => {
    it("descriptografa os dados", async () => {
      const data = JSON.stringify({ name: "Jiboia" });
      const encryptedBase64 = btoa(data);

      mockDecrypt.mockResolvedValue(encryptedBase64);

      const result = await backupCrypto.decrypt(encrypted, "minha-senha");

      expect(mockAes.pbkdf2).toHaveBeenCalledWith("minha-senha", "mock-salt", 600_000, 256, "sha256");
      expect(mockImportKey).toHaveBeenCalledWith("mock-key", "hex");
      expect(mockFromCombined).toHaveBeenCalledWith("mock-encrypted-data");
      expect(mockDecrypt).toHaveBeenCalledWith(sealedData, encryptionKey, { output: "base64" });
      expect(result).toBe(data);
    });

    it("rejeita quando a descriptografia falhar", async () => {
      mockDecrypt.mockRejectedValue(new Error("Decryption failed"));
      await expect(backupCrypto.decrypt(encrypted, "senha")).rejects.toThrow("Senha incorreta ou backup inválido");
    });
  });
});
