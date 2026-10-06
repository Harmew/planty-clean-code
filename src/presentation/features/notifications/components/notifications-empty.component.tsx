import Animated, { FadeInDown } from "react-native-reanimated";

// Presentation
import { Surface, Typography } from "@presentation/components/common";
import { Icons } from "@presentation/components/svgs";
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import { getIconTextColor } from "@shared/utils/theme";

export function NotificationsEmpty() {
  const { dark } = useTheme();

  return (
    <Animated.View entering={FadeInDown.delay(120)}>
      <Surface>
        <Icons.Bell color={getIconTextColor(dark)} style={{ alignSelf: "center" }} />
        <Typography align="center">Nenhuma notificação no momento</Typography>
      </Surface>
    </Animated.View>
  );
}
