import type { ImageStorage } from "@domain/storage/image.storage";

/**
 * Mock centralizado de ImageStorage (@domain/services/imageStorage), usado pelos testes de caso de uso que dependem dessa interface:
 *
 * ```ts
 * import { createImageStorageMock } from '@mocks/services/imageStorage';
 * const storage = createImageStorageMock();
 * storage.saveImage.mockResolvedValue('path/to/image');
 * ```
 *
 * Cada teste sobrescreve só o método que precisa de comportamento específico.
 */
export function createImageStorageMock(): jest.Mocked<ImageStorage> {
  return {
    saveImage: jest.fn(),
    deleteImage: jest.fn(),
    readImage: jest.fn(),
    saveBase64: jest.fn(),
  };
}
