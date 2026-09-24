import type { OnboardingStorage } from "@domain/storage/onboarding.storage";

/**
 * Mock centralizado de OnboardingStorage (@domain/storage/onboarding.storage), usado pelos testes de caso de uso que dependem dessa interface:
 *
 * ```ts
 * import { createOnboardingStorageMock } from '@mocks/storage/OnboardingStorageMock';
 * const service = createOnboardingStorageMock();
 * service.export.mockReturnValue(undefined);
 * ```
 *
 * Cada teste sobrescreve só o método que precisa de comportamento específico.
 */
export function createOnboardingStorageMock(): jest.Mocked<OnboardingStorage> {
  return {
    isCompleted: jest.fn(),
    complete: jest.fn(),
  };
}
