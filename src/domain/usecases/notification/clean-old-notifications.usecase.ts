import type { NotificationRepository } from "@domain/repositories/notification.repository";
import type { NotificationService } from "@domain/services/notification.service";

const RETENTION_MONTHS = 3;

export const CleanOldNotifications = (repository: NotificationRepository, service: NotificationService) => async () => {
  const limitDate = new Date();
  limitDate.setMonth(limitDate.getMonth() - RETENTION_MONTHS);

  const limitISO = limitDate.toISOString();

  const notifications = await repository.getOlderThan(limitISO);

  const expoIds = notifications
    .map((notification) => notification.expoNotificationId)
    .filter((expoId): expoId is string => !!expoId);

  await Promise.all(expoIds.map((expoId) => service.cancel(expoId)));

  await repository.deleteOlderThan(limitISO);
};
