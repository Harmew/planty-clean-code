import type { CareHistory } from "@domain/entities/careHistory";

/**
 * Fixture centralizada de CareHistory, usada por praticamente todo teste que precisa de um histórico de cuidado de exemplo:
 *
 * ```ts
 * const careHistory = createCareHistory();
 * const careHistory2 = createCareHistory({ id: 2, type: 'fertilize' });
 * ```
 */
export function createCareHistory(overrides: Partial<CareHistory> = {}): CareHistory {
  return {
    id: 1,
    plantId: 1,
    careScheduleId: 1,
    type: "water",
    intervalDays: 7,
    doneAt: "2023-01-01T00:00:00Z",
    ...overrides,
  };
}
