import type { PlantRepository } from "@domain/repositories/plantRepository";

export const GetPlants = (repository: PlantRepository) => () => repository.getAll();
