import type { NotificationRepository } from "@domain/repositories/notificationRepository";
import type { NotificationService } from "@domain/services/notificationService";

export type CancelNotificationsByPlant = (plantId: number) => Promise<void>;

export const CancelNotificationsByPlant =
  (repository: NotificationRepository, service: NotificationService) => async (plantId: number) => {
    const notifications = await repository.getByPlantId(plantId);

    for (const notification of notifications) {
      if (notification.expoNotificationId) {
        await service.cancel(notification.expoNotificationId);
      }
    }

    await repository.deleteByPlantId(plantId);
  };
