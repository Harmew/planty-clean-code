import type { NotificationRepository } from "@domain/repositories/notification.repository";
import type { NotificationService } from "@domain/services/notification.service";

export type CancelNotificationsByCare = (careScheduleId: number) => Promise<void>;

export const CancelNotificationsByCare =
  (repository: NotificationRepository, service: NotificationService) => async (careScheduleId: number) => {
    const notifications = await repository.getByCareId(careScheduleId);

    for (const notification of notifications) {
      if (notification.expoNotificationId) {
        await service.cancel(notification.expoNotificationId);
      }
    }

    await repository.deleteByCareId(careScheduleId);
  };
