import React from "react";
import { Alert } from "react-native";

// DI
import { container } from "@di/container";

// Presentation
import { useLiveQuery } from "@presentation/hooks/use-live-query";
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import { getAlertOptions } from "@shared/utils/alert";

// Domain
import type { Notification } from "@domain/entities/notification.entity";

export function useNotifications() {
  const { dark } = useTheme();

  const query = React.useCallback(() => container.getNotifications(), []);
  const { data: notifications, isLoading } = useLiveQuery<Notification[]>(["notifications"], query, []);

  /**
   * Só mostra as notificações que já venceram.
   * As futuras ficam guardadas apenas para agendamento e exportação.
   */
  const visibleNotifications = React.useMemo(() => {
    const now = Date.now();
    return notifications.filter((notification) => new Date(notification.scheduledFor).getTime() <= now);
  }, [notifications]);

  const handleMarkAsRead = React.useCallback(
    async (notification: Notification) => {
      if (notification.read) return;

      try {
        await container.markNotificationAsRead(notification.id);
      } catch (error) {
        Alert.alert(
          "Algo deu errado",
          (error as Error).message ?? "Ocorreu um erro inesperado",
          [{ text: "Entendi" }],
          getAlertOptions(dark),
        );
      }
    },
    [dark],
  );

  return { notifications: visibleNotifications, isLoading, handleMarkAsRead };
}
