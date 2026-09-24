import type { NotificationRepository } from "@domain/repositories/notification.repository";

export const MarkNotificationAsRead = (repository: NotificationRepository) => (id: number) => repository.markAsRead(id);
