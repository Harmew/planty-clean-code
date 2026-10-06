import React from "react";
import { FlatList } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Domain
import type { Plant } from "@domain/entities/plant.entity";

// Presentation
import { ScreenWrapper } from "@presentation/components/layout";
import { TAB_BAR_HEIGHT } from "@presentation/components/layout/tab-bar";
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import { getPlatformBottomSpacing } from "@shared/utils/platform";

import { PlantItem } from "./components/plant-item.component";
import { PlantsEmpty } from "./components/plants-empty.component";
import { PlantsFooter } from "./components/plants-footer.component";
import { PlantsHeader } from "./components/plants-header.component";

import { useMyPlants } from "./hooks/use-my-plants";
import { createStyles } from "./styles";

const MAX_ANIMATED_ITEMS = 10;
const INITIAL_DELAY_MS = 160;
const ITEM_DELAY_MS = 40;

const keyExtractor = (plant: Plant) => String(plant.id);

export function MyPlantsScreen() {
  const { bottom: paddingBottom } = useSafeAreaInsets();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const { plants, handleAddPlant, handleOpenNotifications, handleOpenDetails } = useMyPlants();

  const renderItem = React.useCallback(
    ({ item, index }: { item: Plant; index: number }) => {
      const content = <PlantItem item={item} index={index} onPress={handleOpenDetails} />;
      if (index >= MAX_ANIMATED_ITEMS) return content;
      return (
        <Animated.View entering={FadeInDown.delay(INITIAL_DELAY_MS + index * ITEM_DELAY_MS)}>{content}</Animated.View>
      );
    },
    [handleOpenDetails],
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
        removeClippedSubviews={false}
        ListHeaderComponent={<PlantsHeader onNotificationsPress={handleOpenNotifications} />}
        ListEmptyComponent={<PlantsEmpty onAddPlantPress={handleAddPlant} />}
        ListFooterComponent={plants.length > 0 ? <PlantsFooter onAddPlantPress={handleAddPlant} /> : null}
      />
    </ScreenWrapper>
  );
}
