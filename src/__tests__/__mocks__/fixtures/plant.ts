import { Plant } from "@domain/entities/plant";

/**
 * Fixture centralizada de Plant, usada por praticamente todo teste que precisa de uma planta de exemplo:
 *
 * ```ts
 * const plant = createPlant();
 * const plant2 = createPlant({ id: 2, name: 'Jiboia' });
 * ```
 */
export function createPlant(overrides: Partial<Plant> = {}): Plant {
  return {
    id: 1,
    name: "Jiboia",
    image: null,
    location: "Sala",
    sunlight: "medium",
    temperatureMin: "18",
    temperatureMax: "30",
    humidity: "60",
    createdAt: "2023-01-01T00:00:00Z",
    ...overrides,
  };
}
