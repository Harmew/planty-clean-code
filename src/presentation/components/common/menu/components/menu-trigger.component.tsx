import { Button } from "@presentation/components/common/button";
import { useTheme } from "@presentation/hooks/use-theme";

// Shared
import { getSurfaceColor } from "@shared/utils/theme";

import { useMenu } from "../menu.context";
import { MenuTriggerProps } from "../types";

export function MenuTrigger({ children }: Readonly<MenuTriggerProps>) {
  const { setOpen } = useMenu();
  const { dark } = useTheme();

  return (
    <Button isIconOnly color={getSurfaceColor(dark)} size="sm" onPress={() => setOpen(true)}>
      {children}
    </Button>
  );
}
