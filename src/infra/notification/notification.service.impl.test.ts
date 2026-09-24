import * as ExpoNotifications from "expo-notifications";

import { notificationService } from "@infra/notification/notification.service.impl";

describe("notification-service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("initialize", () => {
    it("configura o handler de notificações", () => {
      notificationService.initialize();

      expect(ExpoNotifications.setNotificationHandler).toHaveBeenCalledTimes(1);

      const [{ handleNotification }] = (ExpoNotifications.setNotificationHandler as jest.Mock).mock.calls[0];

      expect(handleNotification).toEqual(expect.any(Function));
    });

    it("configura as opções corretas do handler", async () => {
      notificationService.initialize();

      const [{ handleNotification }] = (ExpoNotifications.setNotificationHandler as jest.Mock).mock.calls[0];

      await expect(handleNotification()).resolves.toEqual({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
        priority: ExpoNotifications.AndroidNotificationPriority.HIGH,
      });
    });
  });

  describe("schedule", () => {
    it("agenda uma notificação", async () => {
      (ExpoNotifications.scheduleNotificationAsync as jest.Mock).mockResolvedValue("notification-id");

      const date = new Date("2026-09-21T06:00:00Z");

      const result = await notificationService.schedule({
        title: "Hora de regar",
        body: "A planta Jiboia precisa de água!",
        date,
      });

      expect(ExpoNotifications.scheduleNotificationAsync).toHaveBeenCalledWith({
        content: {
          title: "Hora de regar",
          body: "A planta Jiboia precisa de água!",
        },
        trigger: {
          type: ExpoNotifications.SchedulableTriggerInputTypes.DATE,
          date,
        },
      });

      expect(result).toBe("notification-id");
    });
  });

  describe("cancel", () => {
    it("cancela uma notificação pelo ID", async () => {
      await notificationService.cancel("notification-123");

      expect(ExpoNotifications.cancelScheduledNotificationAsync).toHaveBeenCalledWith("notification-123");
    });
  });

  describe("cancelAll", () => {
    it("cancela todas as notificações agendadas", async () => {
      await notificationService.cancelAll();

      expect(ExpoNotifications.cancelAllScheduledNotificationsAsync).toHaveBeenCalledTimes(1);
    });
  });
});
