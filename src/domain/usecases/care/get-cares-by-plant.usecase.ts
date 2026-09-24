import type { CareRepository } from "@domain/repositories/care.repository";

export const GetCaresByPlant = (repository: CareRepository) => (plantId: number) => repository.getByPlantId(plantId);
