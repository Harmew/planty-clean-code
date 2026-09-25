import React from "react";
import { FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Domain
import type { Plant } from "@domain/entities/plant.entity";

// Presentation
import { ScreenWrapper } from "@presentation/components/layout";
import { TAB_BAR_HEIGHT } from "@presentation/components/layout/tab-bar";
import { usePlants } from "@presentation/hooks/use-plants";
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import { getPlatformBottomSpacing } from "@shared/utils/platform";

import { PlantItem } from "./components/plant-item.component";
import { PlantsEmpty } from "./components/plants-empty.component";
import { PlantsFooter } from "./components/plants-footer.component";
import { PlantsHeader } from "./components/plants-header.component";
import { useMyPlants } from "./hooks/use-my-plants";
import { createStyles } from "./styles";

export function MyPlantsScreen() {
  const { plants } = usePlants();
  const { bottom: paddingBottom } = useSafeAreaInsets();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const { openAddPlant, openNotifications, openDetails } = useMyPlants();

  const renderItem = React.useCallback(
    ({ item, index }: { item: Plant; index: number }) => <PlantItem item={item} index={index} onPress={openDetails} />,
    [openDetails],
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
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        removeClippedSubviews={false}
        ListHeaderComponent={<PlantsHeader onNotificationsPress={openNotifications} />}
        ListEmptyComponent={<PlantsEmpty onAddPlantPress={openAddPlant} />}
        ListFooterComponent={plants.length > 0 ? <PlantsFooter onAddPlantPress={openAddPlant} /> : null}
      />
    </ScreenWrapper>
  );
}
