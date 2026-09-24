import { Link } from "expo-router";
import { Platform, View } from "react-native";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Presentation
import { Button, ProgressLine, Typography } from "@presentation/components/common";
import { ScreenWrapper } from "@presentation/components/layout";
import { Icons } from "@presentation/components/svgs";
import { useAppTheme } from "@presentation/hooks/useAppTheme";

import { createStyles } from "./styles";

export function BemVindoScreen() {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);
  const { bottom: marginBottom } = useSafeAreaInsets();

  return (
    <ScreenWrapper
      style={[
        styles.container,
        { marginBottom: Platform.OS === "ios" ? marginBottom : marginBottom + theme.spacings[18] },
      ]}
    >
      <ProgressLine maxWidth={150} percentage={33} />

      <View style={styles.content}>
        <Animated.View entering={FadeInDown.delay(40)}>
          <Typography size={48} color="green500">
            Bem-vindo ao{"\n"}Planty
          </Typography>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(80)}>
          <Icons.UndrawWelcoming style={{ alignSelf: "center" }} />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(120)}>
          <Typography>
            Descubra uma forma simples e divertida de cuidar das suas plantas e acompanhar suas tarefas diárias. Vamos
            começar essa jornada juntos!
          </Typography>
        </Animated.View>
      </View>

      <Animated.View entering={FadeInRight.delay(160)}>
        <Link replace href="/(onboarding)/permissoes" asChild style={{ alignSelf: "flex-end" }}>
          <Button>
            <Typography color="white">Continuar</Typography>
            <Icons.ArrowRight color="white" size={20} />
          </Button>
        </Link>
      </Animated.View>
    </ScreenWrapper>
  );
}
