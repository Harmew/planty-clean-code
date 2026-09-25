import { View } from "react-native";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Presentation
import { Button, ProgressLine, Typography } from "@presentation/components/common";
import { ScreenWrapper } from "@presentation/components/layout";
import { Icons } from "@presentation/components/svgs";
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import { getPlatformBottomSpacing } from "@shared/utils/platform";

import { useAllRight } from "./hooks/use-all-right";
import { createStyles } from "./styles";

export function AllRightScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { bottom: marginBottom } = useSafeAreaInsets();

  const { handleFinishOnboarding } = useAllRight();

  return (
    <ScreenWrapper
      style={[styles.container, { marginBottom: getPlatformBottomSpacing(marginBottom, theme.spacings[18], false) }]}
    >
      <ProgressLine maxWidth={150} percentage={100} />

      <View style={styles.content}>
        <Animated.View entering={FadeInDown.delay(40)}>
          <Typography size={48} color="green500">
            Tudo certo!
          </Typography>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(80)}>
          <Icons.UndrawRelaxedReading style={{ alignSelf: "center" }} />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(120)}>
          <Typography>Seu aplicativo está configurado e pronto para uso</Typography>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(160)}>
          <Typography>Aproveite todas as funcionalidades e mantenha suas plantas sempre saudáveis!</Typography>
        </Animated.View>
      </View>

      <Animated.View entering={FadeInRight.delay(200)}>
        <Button onPress={handleFinishOnboarding} style={{ alignSelf: "flex-end" }}>
          <Typography color="white">Vamos lá</Typography>
          <Icons.ArrowRight color="white" size={20} />
        </Button>
      </Animated.View>
    </ScreenWrapper>
  );
}
