import { notificationMapper } from "@data/mapper/notificationMapper";

describe("notificationMapper", () => {
  it("mapeia uma notificação completa para a entidade Notification", () => {
    const notification = notificationMapper({
      id: 1,
      plant_id: 1,
      care_schedule_id: 10,
      title: "Hora de regar",
      body: "A planta Jiboia precisa de água!",
      type: "water",
      read: 1,
      scheduled_for: "2023-01-08T06:00:00Z",
      expo_notification_id: "expo-notification-123",
      created_at: "2023-01-01T00:00:00Z",
    });

    expect(notification).toEqual({
      id: 1,
      plantId: 1,
      careScheduleId: 10,
      title: "Hora de regar",
      body: "A planta Jiboia precisa de água!",
      type: "water",
      read: true,
      scheduledFor: "2023-01-08T06:00:00Z",
      expoNotificationId: "expo-notification-123",
      createdAt: "2023-01-01T00:00:00Z",
    });
  });

  it("converte read de 0 para false", () => {
    const notification = notificationMapper({
      id: 2,
      plant_id: null,
      care_schedule_id: null,
      title: "Teste",
      body: "Notificação de teste",
      type: "fertilizer",
      read: 0,
      scheduled_for: "2023-01-08T06:00:00Z",
      expo_notification_id: null,
      created_at: "2023-01-01T00:00:00Z",
    });

    expect(notification).toEqual({
      id: 2,
      plantId: null,
      careScheduleId: null,
      title: "Teste",
      body: "Notificação de teste",
      type: "fertilizer",
      read: false,
      scheduledFor: "2023-01-08T06:00:00Z",
      expoNotificationId: null,
      createdAt: "2023-01-01T00:00:00Z",
    });
  });
});
