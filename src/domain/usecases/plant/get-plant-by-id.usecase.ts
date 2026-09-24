import type { Plant } from "@domain/entities/plant.entity";
import type { PlantRepository } from "@domain/repositories/plant.repository";

export type GetPlantById = (id: number) => Promise<Plant | null>;

export const GetPlantById = (repository: PlantRepository) => (id: number) => repository.getById(id);
