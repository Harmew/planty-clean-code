import type { CareHistoryRepository } from "@domain/repositories/care-history.repository";

/**
 * Mock centralizado de CareHistoryRepository (@domain/repositories/careHistoryRepository), usado pelos testes de caso de uso que dependem dessa interface:
 *
 * ```ts
 * import { createCareHistoryRepositoryMock } from '@mocks/repositories/careHistoryRepository';
 * const repository = createCareHistoryRepositoryMock();
 * repository.getAll.mockReturnValue([]);
 * ```
 *
 * Cada teste sobrescreve só o método que precisa de comportamento específico.
 */
export function createCareHistoryRepositoryMock(): jest.Mocked<CareHistoryRepository> {
  return {
    getAll: jest.fn(),
    create: jest.fn(),
    getByPlantId: jest.fn(),
  };
}
