import React from "react";
import { FlatList, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Presentation
import { Typography } from "@presentation/components/common";
import { ScreenWrapper } from "@presentation/components/layout";
import { TAB_BAR_HEIGHT } from "@presentation/components/layout/tab-bar";
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import { getPlatformBottomSpacing } from "@shared/utils/platform";
import type { PlantWithCares } from "./types";

import { CalendarCard } from "./components/calendar-card.component";
import { EmptyPlants } from "./components/empty-plants.component";
import { PendingCares } from "./components/pending-cares.component";
import { PlantCareCard } from "./components/plant-care-card.component";

import { useMyCares } from "./hooks/use-my-cares";
import { createStyles } from "./styles";

const keyExtractor = (plant: PlantWithCares) => `plant-${plant.id}`;

export function MyCaresScreen() {
  const { plants, pendingCares, markAsDone, handleAddPlant } = useMyCares();

  const { bottom: paddingBottom } = useSafeAreaInsets();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const hasPlants = plants.length > 0;

  const renderItem = React.useCallback(
    ({ item, index }: { item: (typeof plants)[number]; index: number }) => (
      <Animated.View entering={FadeInDown.delay(Math.min(140 + index * 40, 500))}>
        <PlantCareCard plant={item} />
      </Animated.View>
    ),
    [],
  );

  const listHeader = React.useMemo(
    () => (
      <View style={{ gap: theme.spacings[16] }}>
        <Animated.View entering={FadeInDown.delay(40)}>
          <CalendarCard />
        </Animated.View>

        {hasPlants && (
          <>
            <Animated.View entering={FadeInDown.delay(80)}>
              <PendingCares pendingCares={pendingCares} onMarkAsDone={markAsDone} />
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(120)}>
              <Typography size={18} weight={500}>
                Meus Cuidados
              </Typography>
            </Animated.View>
          </>
        )}
      </View>
    ),
    [hasPlants, markAsDone, pendingCares, theme.spacings],
  );

  const emptyComponent = React.useMemo(
    () => (
      <Animated.View entering={FadeInDown.delay(120)}>
        <EmptyPlants onAdd={handleAddPlant} />
      </Animated.View>
    ),
    [handleAddPlant],
  );

  return (
    <ScreenWrapper>
      <FlatList
        contentContainerStyle={[
          styles.container,
          { paddingBottom: getPlatformBottomSpacing(paddingBottom, TAB_BAR_HEIGHT + theme.spacings[18], true) },
        ]}
        showsVerticalScrollIndicator={false}
        data={plants}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={listHeader}
        ListEmptyComponent={emptyComponent}
        removeClippedSubviews={false}
      />
    </ScreenWrapper>
  );
}
