import type { NotificationRepository } from "@domain/repositories/notificationRepository";

export const MarkNotificationAsRead = (repository: NotificationRepository) => (id: number) => repository.markAsRead(id);
