import type { NotificationRepository } from "@domain/repositories/notification.repository";
import type { NotificationService } from "@domain/services/notification.service";

export const ClearNotifications = (repository: NotificationRepository, service: NotificationService) => async () => {
  await service.cancelAll();
  await repository.deleteAll();
};
