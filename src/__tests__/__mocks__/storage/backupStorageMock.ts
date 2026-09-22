import type { BackupStorage } from "@domain/services/backupStorage";

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

export function createFileMock(uri = "file:///mock-backup.json") {
  return {
    ...fileMock,
    uri,
  };
}
