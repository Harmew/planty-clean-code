import Animated, { FadeInDown } from "react-native-reanimated";

// Presentation
import { Button, Typography } from "@presentation/components/common";
import { Icons } from "@presentation/components/svgs";
import { useTheme } from "@presentation/hooks/use-theme";

// Domain
import { getIconTextColor, getSurfaceColor } from "@shared/utils/theme";

interface HistoryButtonProps {
  hasCare: boolean;
  onPress: () => void;
}

export function HistoryButton({ hasCare, onPress }: Readonly<HistoryButtonProps>) {
  const { dark } = useTheme();

  if (!hasCare) return null;
  return (
    <Animated.View entering={FadeInDown.delay(220)}>
      <Button size="sm" color={getSurfaceColor(dark)} onPress={onPress}>
        <Icons.Clock size={20} color={getIconTextColor(dark)} />
        <Typography>Ver histórico de cuidados</Typography>
      </Button>
    </Animated.View>
  );
}
