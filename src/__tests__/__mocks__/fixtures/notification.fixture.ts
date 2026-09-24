import type { Notification } from "@domain/entities/notification.entity";

/**
 * Fixture centralizada de Notification, usada por praticamente todo teste que precisa de uma notificação de exemplo:
 *
 * ```ts
 * const notification = createNotification();
 * const notification2 = createNotification({ id: 2, title: 'Hora de podar' });
 * ```
 */
export function createNotification(overrides: Partial<Notification> = {}): Notification {
  return {
    id: 1,
    plantId: 1,
    careScheduleId: 1,
    title: "Hora de regar",
    body: "A planta Jiboia precisa de água!",
    type: "water",
    read: false,
    scheduledFor: "2023-01-08T06:00:00Z",
    expoNotificationId: "expo-notification-123",
    createdAt: "2023-01-01T00:00:00Z",
    ...overrides,
  };
}
