import Animated, { FadeInDown } from "react-native-reanimated";

// Presentation
import { Surface, Typography } from "@presentation/components/common";
import { Icons } from "@presentation/components/svgs";
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import { getIconTextColor } from "@shared/utils/theme";

export function PlantHistoryEmpty() {
  const { dark } = useTheme();

  return (
    <Animated.View entering={FadeInDown.delay(120)}>
      <Surface style={{ flex: 1 }}>
        <Icons.Clock color={getIconTextColor(dark)} style={{ alignSelf: "center" }} />
        <Typography align="center">Nenhum histórico encontrado</Typography>
      </Surface>
    </Animated.View>
  );
}
