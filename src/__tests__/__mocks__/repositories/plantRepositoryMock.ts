import type { PlantRepository } from "@domain/repositories/plantRepository";

/**
 * Mock centralizado de PlantRepository (@domain/repositories/plantRepository), usado pelos testes de caso de uso que dependem dessa interface:
 *
 * ```ts
 * import { createPlantRepositoryMock } from '@mocks/repositories/plantRepository';
 * const repository = createPlantRepositoryMock();
 * repository.getAll.mockReturnValue([]);
 * ```
 *
 * Cada teste sobrescreve só o método que precisa de comportamento específico.
 */
export function createPlantRepositoryMock(): jest.Mocked<PlantRepository> {
  return {
    getAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    deleteAll: jest.fn(),
  };
}
