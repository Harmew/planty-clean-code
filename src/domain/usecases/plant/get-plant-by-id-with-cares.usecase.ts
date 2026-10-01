import type { PlantWithCares } from "@domain/models/plant-with-cares.model";
import type { PlantRepository } from "@domain/repositories/plant.repository";

export type GetPlantByIdWithCares = (id: number) => Promise<PlantWithCares | null>;

export const GetPlantByIdWithCares =
  (repository: PlantRepository): GetPlantByIdWithCares =>
  (id) =>
    repository.getByIdWithCares(id);
