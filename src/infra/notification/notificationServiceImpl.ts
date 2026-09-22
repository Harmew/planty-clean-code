import * as ExpoNotifications from "expo-notifications";

import type { NotificationService } from "@domain/services/notificationService";

export const notificationService: NotificationService = {
  initialize() {
    ExpoNotifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
        priority: ExpoNotifications.AndroidNotificationPriority.HIGH,
      }),
    });
  },

  async schedule(input) {
    return ExpoNotifications.scheduleNotificationAsync({
      content: {
        title: input.title,
        body: input.body,
      },
      trigger: {
        type: ExpoNotifications.SchedulableTriggerInputTypes.DATE,
        date: input.date,
      },
    });
  },

  async cancel(notificationId: string) {
    await ExpoNotifications.cancelScheduledNotificationAsync(notificationId);
  },

  async cancelAll() {
    await ExpoNotifications.cancelAllScheduledNotificationsAsync();
  },
};
