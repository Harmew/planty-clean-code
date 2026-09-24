import type { CareHistoryRepository } from "@domain/repositories/care-history.repository";

export const GetCareHistoryByPlant = (repository: CareHistoryRepository) => (plantId: number) =>
  repository.getByPlantId(plantId);
