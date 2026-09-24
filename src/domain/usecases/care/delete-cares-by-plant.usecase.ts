import type { CareRepository } from "@domain/repositories/care.repository";

import type { CancelNotificationsByCare } from "@domain/usecases/notification/cancel-notifications-by-care.usecase";

export const DeleteCaresByPlant =
  (repository: CareRepository, cancelNotificationsByCare: CancelNotificationsByCare) => async (plantId: number) => {
    const cares = await repository.getByPlantId(plantId);

    for (const care of cares) {
      await cancelNotificationsByCare(care.id);
    }

    await repository.deleteByPlantId(plantId);
  };
