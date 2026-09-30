import { Typography } from "@presentation/components/common";
import { Menu } from "@presentation/components/common/menu";
import { Header, ScreenWrapper } from "@presentation/components/layout";
import { Icons } from "@presentation/components/svgs";
import { useTheme } from "@presentation/hooks/use-theme";
import { getPlatformBottomSpacing } from "@shared/utils/platform";
import { getIconTextColor } from "@shared/utils/theme";
import { ScrollView } from "react-native-gesture-handler";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CareSection } from "./components/care-section.component";
import { HistorySection } from "./components/history-section.component";
import { PlantCard } from "./components/plant-card.component";
import { PlantInfo } from "./components/plant-info.component";
import { useMyPlant } from "./hooks/use-my-plant";
import { createStyles } from "./styles";

export function MyPlantScreen() {
  const { theme, dark } = useTheme();
  const styles = createStyles(theme);
  const { bottom: paddingBottom } = useSafeAreaInsets();

  const { plant, cares, history, handleEditPlant, handleUpdateCares, handleDeletePlant } = useMyPlant();

  return (
    <ScreenWrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.container,
          { paddingBottom: getPlatformBottomSpacing(paddingBottom, theme.spacings[18], false) },
        ]}
      >
        <Header
          title="Minha Planta"
          rightContent={
            <Menu>
              <Menu.Trigger>
                <Icons.Ellipsis color={getIconTextColor(dark)} />
              </Menu.Trigger>

              <Menu.Content>
                <Menu.Item onPress={handleEditPlant}>
                  <Icons.Pencil color={getIconTextColor(dark)} />
                  <Typography style={{ flex: 1 }}>Editar</Typography>
                </Menu.Item>

                <Menu.Item onPress={handleDeletePlant}>
                  <Icons.Trash color="red500" />
                  <Typography style={{ flex: 1 }} color="red500">
                    Excluir
                  </Typography>
                </Menu.Item>
              </Menu.Content>
            </Menu>
          }
        />

        {plant && (
          <>
            <Animated.View entering={FadeInDown.delay(40)}>
              <PlantCard plant={plant} />
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(80)}>
              <PlantInfo plant={plant} />
            </Animated.View>

            <CareSection cares={cares} onUpdate={handleUpdateCares} />
            <HistorySection plantId={plant.id} history={history} />
          </>
        )}
      </ScrollView>
    </ScreenWrapper>
  );
}
