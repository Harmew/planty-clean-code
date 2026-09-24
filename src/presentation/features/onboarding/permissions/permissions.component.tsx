import { View } from "react-native";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Presentation
import { Button, ProgressLine, Row, Surface, Typography } from "@presentation/components/common";
import { Switch } from "@presentation/components/form";
import { ScreenWrapper } from "@presentation/components/layout";
import { Icons } from "@presentation/components/svgs";
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import { getPlatformBottomSpacing } from "@shared/utils/platform";
import { getIconTextColor } from "@shared/utils/theme";

import { usePermissions } from "./hooks/use-permissions";
import { createStyles } from "./styles";

export function PermissionsScreen() {
  const { theme, dark } = useTheme();
  const styles = createStyles(theme);
  const { bottom: marginBottom } = useSafeAreaInsets();

  const { permissions, requestPermission, handleContinue } = usePermissions();

  return (
    <ScreenWrapper
      style={[styles.container, { marginBottom: getPlatformBottomSpacing(marginBottom, theme.spacings[18]) }]}
    >
      <ProgressLine maxWidth={150} percentage={66} />

      <View style={styles.content}>
        <Animated.View entering={FadeInDown.delay(40)}>
          <Typography size={48} color="green500">
            Precisamos da{"\n"}sua permissão
          </Typography>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(80)}>
          <Typography>
            Para que o app funcione corretamente, precisamos acessar algumas funcionalidades do seu dispositivo, como
            notificações e armazenamento
          </Typography>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(120)}>
          <Typography>Não se preocupe, só vamos usar o que for realmente necessário</Typography>
        </Animated.View>

        {/* Notificações */}
        <Animated.View entering={FadeInDown.delay(160)}>
          <Surface>
            <Row justify="space-between">
              <Row flex={1}>
                <Icons.Bell color={getIconTextColor(dark)} />
                <Typography style={{ flex: 1 }} numberOfLines={1}>
                  Notificacoes
                </Typography>
              </Row>
              <Switch
                isSelected={permissions.notifications === "granted"}
                onSelectedChange={() => requestPermission("notifications")}
              />
            </Row>
          </Surface>
        </Animated.View>

        {/* Câmera */}
        <Animated.View entering={FadeInDown.delay(160)}>
          <Surface>
            <Row justify="space-between">
              <Row flex={1}>
                <Icons.CameraMinimalistic color={getIconTextColor(dark)} />
                <Typography style={{ flex: 1 }} numberOfLines={1}>
                  Câmera
                </Typography>
              </Row>
              <Switch
                isSelected={permissions.camera === "granted"}
                onSelectedChange={() => requestPermission("camera")}
              />
            </Row>
          </Surface>
        </Animated.View>

        {/* Galeria */}
        <Animated.View entering={FadeInDown.delay(160)}>
          <Surface>
            <Row justify="space-between">
              <Row flex={1}>
                <Icons.Gallery color={getIconTextColor(dark)} />
                <Typography style={{ flex: 1 }} numberOfLines={1}>
                  Galeria
                </Typography>
              </Row>
              <Switch
                isSelected={permissions.gallery === "granted"}
                onSelectedChange={() => requestPermission("gallery")}
              />
            </Row>
          </Surface>
        </Animated.View>
      </View>

      <Animated.View entering={FadeInRight.delay(280)}>
        <Button onPress={handleContinue} style={{ alignSelf: "flex-end" }}>
          <Typography color="white">Continuar</Typography>
          <Icons.ArrowRight color="white" size={20} />
        </Button>
      </Animated.View>
    </ScreenWrapper>
  );
}
