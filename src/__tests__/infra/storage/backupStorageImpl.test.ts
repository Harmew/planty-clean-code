jest.mock("@infra/crypto/backupCrypto", () => {
  const { backupCryptoMock } = require("@mocks/storage/backupStorageMock");

  return {
    backupCrypto: backupCryptoMock,
  };
});

jest.mock("expo-document-picker", () => {
  const { documentPickerMock } = require("@mocks/storage/backupStorageMock");

  return documentPickerMock;
});

jest.mock("expo-sharing", () => {
  const { sharingMock } = require("@mocks/storage/backupStorageMock");

  return sharingMock;
});

jest.mock("expo-file-system", () => {
  const { createFileMock } = require("@mocks/storage/backupStorageMock");

  return {
    File: jest.fn((...parts: string[]) => createFileMock(parts.join("/"))),
    Paths: {
      cache: "file:///cache",
    },
  };
});

import { backupCryptoMock, documentPickerMock, fileMock, sharingMock } from "@mocks/storage/backupStorageMock";

import { backupStorage } from "@infra/storage/backupStorageImpl";

import type { Backup } from "@domain/entities/backup";

const backup: Backup = {
  schemaVersion: 1,
  exportedAt: "2023-01-01T00:00:00Z",
  data: {
    plants: [],
    cares: [],
    history: [],
    notifications: [],
  },
  images: {},
};

describe("backupStorage", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    backupCryptoMock.encrypt.mockResolvedValue("encrypted-backup");

    backupCryptoMock.decrypt.mockResolvedValue(JSON.stringify(backup));

    sharingMock.isAvailableAsync.mockResolvedValue(true);

    sharingMock.shareAsync.mockResolvedValue(undefined);

    fileMock.write.mockResolvedValue(undefined);

    fileMock.text.mockResolvedValue("encrypted-backup");

    documentPickerMock.getDocumentAsync.mockResolvedValue({
      canceled: false,
      assets: [
        {
          uri: "file:///mock-backup.json",
        },
      ],
    });
  });

  describe("export", () => {
    it("exporta o backup criptografado", async () => {
      const password = "minha-senha";

      await backupStorage.export(backup, password);

      expect(backupCryptoMock.encrypt).toHaveBeenCalledWith(JSON.stringify(backup), password);

      expect(fileMock.write).toHaveBeenCalledWith("encrypted-backup");

      expect(sharingMock.isAvailableAsync).toHaveBeenCalled();

      expect(sharingMock.shareAsync).toHaveBeenCalledWith(
        expect.stringMatching(/^file:\/\/\/cache\/planty-backup-\d+\.json$/),
        {
          mimeType: "application/json",
          dialogTitle: "Exportar backup",
          UTI: "public.json",
        },
      );
    });

    it("não compartilha quando o compartilhamento não está disponível", async () => {
      sharingMock.isAvailableAsync.mockResolvedValue(false);

      await backupStorage.export(backup, "minha-senha");

      expect(backupCryptoMock.encrypt).toHaveBeenCalled();

      expect(fileMock.write).toHaveBeenCalledWith("encrypted-backup");

      expect(sharingMock.shareAsync).not.toHaveBeenCalled();
    });
  });

  describe("import", () => {
    it("importa e descriptografa o backup", async () => {
      const password = "minha-senha";

      const result = await backupStorage.import(password);

      expect(documentPickerMock.getDocumentAsync).toHaveBeenCalledWith({
        type: "application/json",
        copyToCacheDirectory: true,
      });

      expect(fileMock.text).toHaveBeenCalled();

      expect(backupCryptoMock.decrypt).toHaveBeenCalledWith("encrypted-backup", password);

      expect(result).toEqual(backup);
    });

    it("retorna null quando o usuário cancela a seleção", async () => {
      documentPickerMock.getDocumentAsync.mockResolvedValue({
        canceled: true,
        assets: [],
      });

      const result = await backupStorage.import("minha-senha");

      expect(result).toBeNull();

      expect(fileMock.text).not.toHaveBeenCalled();

      expect(backupCryptoMock.decrypt).not.toHaveBeenCalled();
    });
  });
});
