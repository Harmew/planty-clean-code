import type { Plant } from "@domain/entities/plant";
import type { PlantRepository } from "@domain/repositories/plantRepository";

export type GetPlantById = (id: number) => Promise<Plant | null>;

export const GetPlantById = (repository: PlantRepository) => (id: number) => repository.getById(id);
