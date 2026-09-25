import Animated, { FadeInDown } from "react-native-reanimated";

// Presentation
import { Button, Row, Typography } from "@presentation/components/common";
import { Icons } from "@presentation/components/svgs";
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import { getIconTextColor, getSurfaceColor } from "@shared/utils/theme";

type PlantsHeaderProps = {
  onNotificationsPress: () => void;
};

export function PlantsHeader({ onNotificationsPress }: Readonly<PlantsHeaderProps>) {
  const { dark } = useTheme();

  return (
    <Animated.View entering={FadeInDown.delay(40)}>
      <Row align="center" flex={1} justify="space-between">
        <Typography size={28} weight={600} accessibilityRole="header">
          Minhas Plantas
        </Typography>

        <Button
          isIconOnly
          color={getSurfaceColor(dark)}
          size="sm"
          onPress={onNotificationsPress}
          accessibilityRole="button"
          accessibilityLabel="Notificações"
        >
          <Icons.Bell color={getIconTextColor(dark)} />
        </Button>
      </Row>
    </Animated.View>
  );
}
