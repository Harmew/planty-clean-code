import type { NotificationRepository } from "@domain/repositories/notification.repository";
import type { NotificationService } from "@domain/services/notification.service";

export type CancelNotificationsByPlant = (plantId: number) => Promise<void>;

export const CancelNotificationsByPlant =
  (repository: NotificationRepository, service: NotificationService) => async (plantId: number) => {
    const notifications = await repository.getByPlantId(plantId);

    const expoIds = notifications
      .map((notification) => notification.expoNotificationId)
      .filter((expoId): expoId is string => !!expoId);

    await Promise.all(expoIds.map((expoId) => service.cancel(expoId)));

    await repository.deleteByPlantId(plantId);
  };
