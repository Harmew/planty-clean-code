import type { PlantRepository } from "@domain/repositories/plant.repository";

export const GetPlants = (repository: PlantRepository) => () => repository.getAll();
