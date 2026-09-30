import type { AIService } from "@domain/services/ai.service";

/**
 * Mock centralizado de AIService (@domain/services/ai.service),
 * usado pelos testes de casos de uso que dependem dessa interface.
 *
 * Exemplo:
 *
 * ```ts
 * import { createAIServiceMock } from "@mocks/services/ai-service.mock";
 *
 * const service = createAIServiceMock();
 * service.generatePlantData.mockResolvedValue(data);
 * ```
 *
 * Cada teste sobrescreve somente o método que precisa
 * de um comportamento específico.
 */
export function createAIServiceMock(): jest.Mocked<AIService> {
  return {
    downloadAI: jest.fn(),
    generatePlantData: jest.fn(),
  };
}
