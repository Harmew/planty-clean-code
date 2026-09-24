import type { BackupStorage } from "@domain/storage/backup.storage";

export function createBackupStorageMock(): jest.Mocked<BackupStorage> {
  return {
    export: jest.fn(),
    import: jest.fn(),
  };
}

export const backupCryptoMock = {
  encrypt: jest.fn(),
  decrypt: jest.fn(),
};

export const documentPickerMock = {
  getDocumentAsync: jest.fn(),
};

export const sharingMock = {
  isAvailableAsync: jest.fn(),
  shareAsync: jest.fn(),
};

export const fileMock = {
  write: jest.fn(),
  text: jest.fn(),
};
