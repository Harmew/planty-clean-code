import React from "react";
import { FlatList } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Domain
import type { CareHistory } from "@domain/entities/care-history.entity";

// Presentation
import { Header, ScreenWrapper } from "@presentation/components/layout";
import { TAB_BAR_HEIGHT } from "@presentation/components/layout/tab-bar";
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import { getPlatformBottomSpacing } from "@shared/utils/platform";

import { CareHistoryItem } from "./components/care-history-item.component";
import { PlantHistoryEmpty } from "./components/plant-history-empty.component";

import { usePlantHistory } from "./hooks/use-plant-history";
import { createStyles } from "./styles";

const MAX_ANIMATED_ITEMS = 10;
const ITEM_DELAY_MS = 40;

const keyExtractor = (history: CareHistory) => String(history.id);

export function PlantHistoryScreen() {
  const { bottom: paddingBottom } = useSafeAreaInsets();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const { history, isLoading } = usePlantHistory();

  const renderItem = React.useCallback(
    ({ item, index }: { item: CareHistory; index: number }) => {
      const content = <CareHistoryItem item={item} />;
      if (index >= MAX_ANIMATED_ITEMS) return content;
      return <Animated.View entering={FadeInDown.delay(index * ITEM_DELAY_MS)}>{content}</Animated.View>;
    },

    [],
  );

  return (
    <ScreenWrapper>
      <FlatList
        contentContainerStyle={[
          styles.container,
          { paddingBottom: getPlatformBottomSpacing(paddingBottom, TAB_BAR_HEIGHT + theme.spacings[18], true) },
        ]}
        showsVerticalScrollIndicator={false}
        data={history}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        removeClippedSubviews={false}
        ListHeaderComponent={<Header title="Histórico de Cuidados" />}
        ListEmptyComponent={isLoading ? null : <PlantHistoryEmpty />}
      />
    </ScreenWrapper>
  );
}
