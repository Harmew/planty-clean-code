import { AESEncryptionKey, AESSealedData, aesDecryptAsync, aesEncryptAsync } from "expo-crypto";

import Aes from "react-native-aes-crypto";

const KEY_SIZE = 256;
const PBKDF2_ITERATIONS = 600_000;
const PBKDF2_ALGORITHM = "sha256";

type EncryptedBackup = {
  version: 1;
  algorithm: "AES-256-GCM";
  kdf: "PBKDF2-SHA256";
  iterations: number;
  salt: string;
  data: string;
};

const uint8ArrayToBase64 = (bytes: Uint8Array): string => {
  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCodePoint(byte);
  }

  return btoa(binary);
};

const base64ToUint8Array = (base64: string): Uint8Array => {
  const binary = atob(base64);

  return Uint8Array.from(binary, (char) => char.codePointAt(0) as number);
};

const stringToBase64 = (value: string): string => {
  const bytes = new TextEncoder().encode(value);

  return uint8ArrayToBase64(bytes);
};

const base64ToString = (value: string): string => {
  const bytes = base64ToUint8Array(value);

  return new TextDecoder().decode(bytes);
};

const generateSalt = async (): Promise<string> => {
  return Aes.randomKey(16);
};

const deriveKey = async (password: string, salt: string): Promise<AESEncryptionKey> => {
  const key = await Aes.pbkdf2(password, salt, PBKDF2_ITERATIONS, KEY_SIZE, PBKDF2_ALGORITHM);

  return AESEncryptionKey.import(key, "base64");
};

export const backupCrypto = {
  async encrypt(data: string, password: string): Promise<string> {
    const salt = await generateSalt();

    const encryptionKey = await deriveKey(password, salt);

    const plaintext = stringToBase64(data);

    const sealedData = await aesEncryptAsync(plaintext, encryptionKey);

    const encryptedBackup: EncryptedBackup = {
      version: 1,
      algorithm: "AES-256-GCM",
      kdf: "PBKDF2-SHA256",
      iterations: PBKDF2_ITERATIONS,
      salt,
      data: await sealedData.combined("base64"),
    };

    return JSON.stringify(encryptedBackup);
  },

  async decrypt(data: string, password: string): Promise<string> {
    const encryptedBackup: EncryptedBackup = JSON.parse(data);

    if (encryptedBackup.version !== 1) {
      throw new Error("Versão do backup não suportada");
    }

    if (encryptedBackup.algorithm !== "AES-256-GCM") {
      throw new Error("Algoritmo de criptografia não suportado");
    }

    if (encryptedBackup.kdf !== "PBKDF2-SHA256") {
      throw new Error("KDF não suportado");
    }

    const encryptionKey = await deriveKey(password, encryptedBackup.salt);

    const sealedData = AESSealedData.fromCombined(encryptedBackup.data);

    const decryptedBase64 = await aesDecryptAsync(sealedData, encryptionKey, {
      output: "base64",
    });

    return base64ToString(decryptedBase64);
  },
};
