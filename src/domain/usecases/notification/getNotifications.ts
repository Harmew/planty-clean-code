import type { NotificationRepository } from "@domain/repositories/notificationRepository";

export const GetNotifications = (repository: NotificationRepository) => () => repository.getAll();
