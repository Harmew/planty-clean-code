import Animated, { FadeInDown } from "react-native-reanimated";

// Presentation
import { Button, Typography } from "@presentation/components/common";
import { Icons } from "@presentation/components/svgs";
import { useTheme } from "@presentation/hooks/use-theme";

// Domain
import { getIconTextColor, getSurfaceColor } from "@shared/utils/theme";

interface HistoryButtonProps {
  onPress: () => void;
}

export function HistoryButton({ onPress }: Readonly<HistoryButtonProps>) {
  const { dark } = useTheme();

  return (
    <Animated.View entering={FadeInDown.delay(220)}>
      <Button size="sm" color={getSurfaceColor(dark)} onPress={onPress}>
        <Icons.Clock size={20} color={getIconTextColor(dark)} />
        <Typography>Ver histórico de cuidados</Typography>
      </Button>
    </Animated.View>
  );
}
