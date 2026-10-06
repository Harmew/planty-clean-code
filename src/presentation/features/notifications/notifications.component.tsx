import React from "react";
import { FlatList } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Domain
import type { Notification } from "@domain/entities/notification.entity";

// Presentation
import { ScreenWrapper } from "@presentation/components/layout";
import { TAB_BAR_HEIGHT } from "@presentation/components/layout/tab-bar";
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import { getPlatformBottomSpacing } from "@shared/utils/platform";

import { NotificationItem } from "./components/notification-item.component";
import { NotificationsEmpty } from "./components/notifications-empty.component";
import { NotificationsHeader } from "./components/notifications-header.components";

import { useNotifications } from "./hooks/use-notifications";
import { createStyles } from "./styles";

const MAX_ANIMATED_ITEMS = 10;
const ITEM_DELAY_MS = 40;

const keyExtractor = (notification: Notification) => String(notification.id);

export function NotificationsScreen() {
  const { bottom: paddingBottom } = useSafeAreaInsets();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const { notifications, isLoading, handleMarkAsRead } = useNotifications();

  const renderItem = React.useCallback(
    ({ item, index }: { item: Notification; index: number }) => {
      const content = <NotificationItem notification={item} onPress={handleMarkAsRead} />;
      if (index >= MAX_ANIMATED_ITEMS) return content;
      return <Animated.View entering={FadeInDown.delay(index * ITEM_DELAY_MS)}>{content}</Animated.View>;
    },

    [handleMarkAsRead],
  );

  return (
    <ScreenWrapper>
      <FlatList
        contentContainerStyle={[
          styles.container,
          { paddingBottom: getPlatformBottomSpacing(paddingBottom, TAB_BAR_HEIGHT + theme.spacings[18], true) },
        ]}
        showsVerticalScrollIndicator={false}
        data={notifications}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        removeClippedSubviews={false}
        ListHeaderComponent={<NotificationsHeader />}
        ListEmptyComponent={isLoading ? null : <NotificationsEmpty />}
      />
    </ScreenWrapper>
  );
}
