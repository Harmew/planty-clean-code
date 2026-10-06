import { Pressable, View } from "react-native";

// Presentation
import { Row, Surface, Typography } from "@presentation/components/common";
import { Icons } from "@presentation/components/svgs";
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import { CARE_MAP } from "@shared/constants/care";
import { formatNotificationDate } from "@shared/utils/notification";
import { getThemeColors } from "@shared/utils/theme";

// Domain
import type { Notification } from "@domain/entities/notification.entity";

interface NotificationItemProps {
  notification: Notification;
  onPress: (notification: Notification) => void;
}

export function NotificationItem({ notification, onPress }: Readonly<NotificationItemProps>) {
  const { theme, dark } = useTheme();
  const { surfaceDisabled } = getThemeColors(dark);

  const isRead = Boolean(notification.read);
  const { relative } = formatNotificationDate(notification.scheduledFor);

  const Icon = Icons[CARE_MAP[notification.type].icon];
  const iconBackground = isRead ? surfaceDisabled : theme.colors.green500 + "20";

  return (
    <Pressable disabled={isRead} onPress={() => onPress(notification)}>
      <Surface style={{ opacity: isRead ? 0.8 : 1 }}>
        <Row align="center">
          <Surface
            style={{ padding: theme.spacings[8], borderRadius: theme.radius[18], backgroundColor: iconBackground }}
          >
            <Icon color={isRead ? "gray500" : "green500"} />
          </Surface>

          <View style={{ flex: 1, gap: theme.spacings[4] }}>
            <Row align="center" justify="space-between" gap={8}>
              <Typography numberOfLines={1} style={{ flex: 1 }}>
                {notification.title}
              </Typography>
              <Typography size={14} color="gray500">
                {relative}
              </Typography>
            </Row>

            <Typography style={{ flex: 1 }} size={14} color="gray500">
              {notification.body}
            </Typography>
          </View>
        </Row>
      </Surface>
    </Pressable>
  );
}
