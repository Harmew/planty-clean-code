import Animated, { FadeInDown } from "react-native-reanimated";

// Presentation
import { Button, Typography } from "@presentation/components/common";
import { Icons } from "@presentation/components/svgs";
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import { getIconTextColor, getSurfaceColor } from "@shared/utils/theme";

type PlantsFooterProps = {
  onAddPlantPress: () => void;
};

export function PlantsFooter({ onAddPlantPress }: Readonly<PlantsFooterProps>) {
  const { dark } = useTheme();

  return (
    <Animated.View entering={FadeInDown.delay(80)}>
      <Button size="sm" color={getSurfaceColor(dark)} onPress={onAddPlantPress}>
        <Icons.Plus size={20} color={getIconTextColor(dark)} />
        <Typography>Adicionar planta</Typography>
      </Button>
    </Animated.View>
  );
}
