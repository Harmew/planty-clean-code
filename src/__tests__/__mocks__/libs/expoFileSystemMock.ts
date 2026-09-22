export function createExpoFileSystemMock() {
  const file = {
    copy: jest.fn(),
    delete: jest.fn(),
    base64Sync: jest.fn(),
    write: jest.fn(),
    exists: false,
    uri: "file:///mock-file",
  };

  return {
    File: jest.fn(() => file),
    Paths: {
      document: "file:///Documents",
    },
    file,
  };
}
