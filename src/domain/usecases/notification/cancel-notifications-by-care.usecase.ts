import type { NotificationRepository } from "@domain/repositories/notification.repository";
import type { NotificationService } from "@domain/services/notification.service";

export type CancelNotificationsByCare = (careId: number) => Promise<void>;

export const CancelNotificationsByCare =
  (repository: NotificationRepository, service: NotificationService) => async (careId: number) => {
    const notifications = await repository.getAllByCareId(careId);

    await Promise.all(
      notifications
        .filter((notification) => notification.expoNotificationId)
        .map((notification) => service.cancel(notification.expoNotificationId as string)),
    );

    await repository.deleteAllByCareId(careId);
  };
