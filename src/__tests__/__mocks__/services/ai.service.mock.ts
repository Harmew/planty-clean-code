import type { AIService } from "@domain/services/ai.service";

/**
 * Mock centralizado de AIService (@domain/services/ai.service), usado pelos testes de caso de uso que dependem dessa interface:
 *
 * ```ts
 * import { createAIServiceMock } from '@mocks/services/aiServiceMock';
 * const service = createAIServiceMock();
 * service.generatePlantData.mockReturnValue(undefined);
 * ```
 *
 * Cada teste sobrescreve só o método que precisa de comportamento específico.
 */
export function createAIServiceMock(): jest.Mocked<AIService> {
  return {
    generatePlantData: jest.fn(),
  };
}
