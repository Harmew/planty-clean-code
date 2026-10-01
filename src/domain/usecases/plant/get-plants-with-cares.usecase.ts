import type { PlantWithCares } from "@domain/models/plant-with-cares.model";
import type { PlantRepository } from "@domain/repositories/plant.repository";

export type GetPlantsWithCares = () => Promise<PlantWithCares[]>;

export const GetPlantsWithCares = (repository: PlantRepository): GetPlantsWithCares => () =>
  repository.getAllWithCares();