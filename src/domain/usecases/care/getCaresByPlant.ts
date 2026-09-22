import type { CareRepository } from "@domain/repositories/careRepository";

export const GetCaresByPlant = (repository: CareRepository) => (plantId: number) => repository.getByPlantId(plantId);
