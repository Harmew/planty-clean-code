import type { Care } from "@domain/entities/care";

/**
 * Fixture centralizada de Care, usada por praticamente todo teste que precisa de uma tarefa de cuidado de exemplo:
 *
 * ```ts
 * const care = createCare();
 * const care2 = createCare({ id: 2, type: 'fertilize' });
 * ```
 */
export function createCare(overrides: Partial<Care> = {}): Care {
  return {
    id: 1,
    plantId: 1,
    type: "water",
    intervalDays: 7,
    lastDone: null,
    nextDue: "2023-01-08T00:00:00Z",
    createdAt: "2023-01-01T00:00:00Z",
    ...overrides,
  };
}
