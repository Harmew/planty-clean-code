import type { CareHistoryRepository } from "@domain/repositories/careHistoryRepository";

export const GetCareHistoryByPlant = (repository: CareHistoryRepository) => (plantId: number) =>
  repository.getByPlantId(plantId);
