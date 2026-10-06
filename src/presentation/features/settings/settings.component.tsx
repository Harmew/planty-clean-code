import * as Application from "expo-application";
import { ScrollView } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Presentation
import { Typography } from "@presentation/components/common";
import { ScreenWrapper } from "@presentation/components/layout";
import { TAB_BAR_HEIGHT } from "@presentation/components/layout/tab-bar";
import { Icons } from "@presentation/components/svgs";
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import { getPlatformBottomSpacing } from "@shared/utils/platform";
import { getIconTextColor } from "@shared/utils/theme";

import { SettingsGroup } from "./components/settings-group.component";
import { SettingsItem } from "./components/settings-item.component";

import { useSettings } from "./hooks/use-settings";
import { createStyles } from "./styles";

const APP_VERSION = Application.nativeApplicationVersion || "??";
const BUILD_NUMBER = Application.nativeBuildVersion || "??";

export function SettingsScreen() {
  const { bottom: paddingBottom } = useSafeAreaInsets();
  const { theme, dark } = useTheme();
  const styles = createStyles(theme);

  const { isExporting, isImporting, handleExportData, handleImportData, handleOpenAppSettings } = useSettings();

  return (
    <ScreenWrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.container,
          { paddingBottom: getPlatformBottomSpacing(paddingBottom, TAB_BAR_HEIGHT + theme.spacings[18], true) },
        ]}
      >
        <Animated.View entering={FadeInDown.delay(40)}>
          <Typography size={28} weight={600}>
            Ajustes
          </Typography>
        </Animated.View>

        <SettingsGroup delay={80}>
          <SettingsItem
            icon={<Icons.Bell color={getIconTextColor(dark)} />}
            label="Notificações"
            onPress={handleOpenAppSettings}
          />
          <SettingsItem
            icon={<Icons.CameraMinimalistic color={getIconTextColor(dark)} />}
            label="Câmera"
            onPress={handleOpenAppSettings}
          />
          <SettingsItem
            icon={<Icons.Gallery color={getIconTextColor(dark)} />}
            label="Galeria"
            onPress={handleOpenAppSettings}
          />
        </SettingsGroup>

        <SettingsGroup delay={120}>
          <SettingsItem
            icon={<Icons.SquareTopUp color={getIconTextColor(dark)} />}
            label="Importar Dados"
            isLoading={isImporting}
            onPress={handleImportData}
          />
          <SettingsItem
            icon={<Icons.SquareTopDown color={getIconTextColor(dark)} />}
            label="Exportar Dados"
            isLoading={isExporting}
            onPress={handleExportData}
          />
        </SettingsGroup>

        <SettingsGroup delay={160}>
          <SettingsItem
            icon={/* NOSONAR */ <Icons.CPU color={getIconTextColor(dark)} />}
            label={`Versão do Aplicativo ${APP_VERSION} - ${BUILD_NUMBER}`}
          />
        </SettingsGroup>
      </ScrollView>
    </ScreenWrapper>
  );
}
