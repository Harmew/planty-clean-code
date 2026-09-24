jest.mock("@infra/crypto/backup-crypto", () => {
  const { backupCryptoMock } = require("@mocks/storage/backup.storage.mock");

  return {
    backupCrypto: backupCryptoMock,
  };
});

jest.mock("expo-document-picker", () => {
  const { documentPickerMock } = require("@mocks/storage/backup.storage.mock");

  return documentPickerMock;
});

jest.mock("expo-sharing", () => {
  const { sharingMock } = require("@mocks/storage/backup.storage.mock");

  return sharingMock;
});

jest.mock("expo-file-system", () => {
  const { fileMock } = require("@mocks/storage/backup.storage.mock");

  return {
    File: jest.fn((...parts: string[]) => ({
      ...fileMock,
      uri: parts.join("/"),
    })),
    Paths: {
      cache: "file:///cache",
    },
  };
});

import { backupCryptoMock, documentPickerMock, fileMock, sharingMock } from "@mocks/storage/backup.storage.mock";

import { backupStorage } from "@infra/storage/backup.storage.impl";

import type { Backup } from "@domain/entities/backup.entity";

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

describe("backup-storage", () => {
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
