import type { NotificationRepository } from "@domain/repositories/notification.repository";
import type { NotificationService } from "@domain/services/notification.service";

export const CleanOldNotifications = (repository: NotificationRepository, service: NotificationService) => async () => {
  const limitDate = new Date();
  limitDate.setMonth(limitDate.getMonth() - 3);

  const limitISO = limitDate.toISOString();

  const notifications = await repository.getOlderThan(limitISO);

  for (const notification of notifications) {
    if (notification.expoNotificationId) {
      await service.cancel(notification.expoNotificationId);
    }
  }

  await repository.deleteOlderThan(limitISO);
};
