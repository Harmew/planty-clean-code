import type { CareRepository } from "@domain/repositories/careRepository";

/**
 * Mock centralizado de CareRepository (@domain/repositories/careRepository), usado pelos testes de caso de uso que dependem dessa interface:
 *
 * ```ts
 * import { createCareRepositoryMock } from '@mocks/repositories/careRepository';
 * const repository = createCareRepositoryMock();
 * repository.getAll.mockReturnValue([]);
 * ```
 *
 * Cada teste sobrescreve só o método que precisa de comportamento específico.
 */
export function createCareRepositoryMock(): jest.Mocked<CareRepository> {
  return {
    getAll: jest.fn(),
    create: jest.fn(),
    getByPlantId: jest.fn(),
    getByPlantAndType: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    deleteByPlantId: jest.fn(),
  };
}
