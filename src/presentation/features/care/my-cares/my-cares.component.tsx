import { FlatList, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Presentation
import { ScreenWrapper } from "@presentation/components/layout";
import { TAB_BAR_HEIGHT } from "@presentation/components/layout/tab-bar";
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import { getPlatformBottomSpacing } from "@shared/utils/platform";

import { Typography } from "@presentation/components/common";
import Animated, { FadeInDown } from "react-native-reanimated";
import { PlantCareCard } from "./components/plant-care-card.component";
import { useMyCares } from "./hooks/use-my-cares";
import { createStyles } from "./styles";
import type { PlantWithCares } from "./types";

const keyExtractor = (plant: PlantWithCares) => `plant-${plant.id}`;

export function MyCaresScreen() {
  const { plants, pendingCares, markAsDone, addPlant } = useMyCares();

  const { bottom: paddingBottom } = useSafeAreaInsets();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const hasPlants = plants.length > 0;

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
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInDown.delay(Math.min(140 + index * 40, 500))}>
            <PlantCareCard plant={item} />
          </Animated.View>
        )}
        ListHeaderComponent={
          <View style={{ gap: theme.spacings[16] }}>
            <Animated.View entering={FadeInDown.delay(40)}>{/* <CalendarCard /> */}</Animated.View>

            {hasPlants && (
              <>
                <Animated.View entering={FadeInDown.delay(80)}>
                  {/* <PendingCares pendingCares={pendingCares} onMarkAsDone={markAsDone} /> */}
                </Animated.View>

                <Animated.View entering={FadeInDown.delay(120)}>
                  <Typography variant="h3">Meus Cuidados</Typography>
                </Animated.View>
              </>
            )}
          </View>
        }
        ListEmptyComponent={
          <Animated.View entering={FadeInDown.delay(120)}>{/* <EmptyPlants onAdd={addPlant} /> */}</Animated.View>
        }
        removeClippedSubviews={false}
      />
    </ScreenWrapper>
  );
}
