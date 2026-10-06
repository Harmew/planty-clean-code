import { AESEncryptionKey, AESSealedData, aesDecryptAsync, aesEncryptAsync } from "expo-crypto";

import Aes from "react-native-aes-crypto";

const PBKDF2_ITERATIONS = 600_000;

type EncryptedBackup = {
  salt: string;
  data: string;
};

const deriveKey = async (password: string, salt: string, iterations: number) => {
  const key = await Aes.pbkdf2(password, salt, iterations, 256, "sha256");
  return AESEncryptionKey.import(key, "hex");
};

export const backupCrypto = {
  async encrypt(data: string, password: string) {
    const salt = await Aes.randomKey(16);
    const encryptionKey = await deriveKey(password, salt, PBKDF2_ITERATIONS);

    const plaintext = btoa(data);
    const sealedData = await aesEncryptAsync(plaintext, encryptionKey);
    const combined = await sealedData.combined("base64");

    return JSON.stringify({ salt, data: combined } satisfies EncryptedBackup);
  },

  async decrypt(data: string, password: string): Promise<string> {
    const encryptedBackup: EncryptedBackup = JSON.parse(data);

    const encryptionKey = await deriveKey(password, encryptedBackup.salt, PBKDF2_ITERATIONS);

    const sealedData = AESSealedData.fromCombined(encryptedBackup.data);

    try {
      const decryptedBase64 = await aesDecryptAsync(sealedData, encryptionKey, {
        output: "base64",
      });

      return atob(decryptedBase64);
    } catch {
      throw new Error("Senha incorreta ou backup inválido");
    }
  },
};
