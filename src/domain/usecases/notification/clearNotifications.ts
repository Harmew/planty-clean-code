import type { NotificationRepository } from "@domain/repositories/notificationRepository";
import type { NotificationService } from "@domain/services/notificationService";

export const ClearNotifications = (repository: NotificationRepository, service: NotificationService) => async () => {
  await service.cancelAll();
  await repository.deleteAll();
};
