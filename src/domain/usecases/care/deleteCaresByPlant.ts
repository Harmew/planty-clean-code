import type { CareRepository } from "@domain/repositories/careRepository";

import type { CancelNotificationsByCare } from "@domain/usecases/notification/cancelNotificationsByCare";

export const DeleteCaresByPlant =
  (repository: CareRepository, cancelNotificationsByCare: CancelNotificationsByCare) => async (plantId: number) => {
    const cares = await repository.getByPlantId(plantId);

    for (const care of cares) {
      await cancelNotificationsByCare(care.id);
    }

    await repository.deleteByPlantId(plantId);
  };
