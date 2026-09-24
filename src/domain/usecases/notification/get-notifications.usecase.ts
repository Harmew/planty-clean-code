import type { NotificationRepository } from "@domain/repositories/notification.repository";

export const GetNotifications = (repository: NotificationRepository) => () => repository.getAll();
