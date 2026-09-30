// Presentation
import { PressableFeedback, Row } from "@presentation/components/common";
import { useTheme } from "@presentation/hooks/use-theme";

import { useMenu } from "../menu.context";
import { MenuItemProps } from "../types";

export const MenuItem = ({ children, onPress }: Readonly<MenuItemProps>) => {
  const { setOpen } = useMenu();
  const { theme } = useTheme();

  function handlePress() {
    onPress?.();
    setOpen(false);
  }

  return (
    <PressableFeedback
      testID="menu-item"
      onPress={handlePress}
      style={{ padding: theme.spacings[12], borderRadius: theme.radius[16], borderCurve: "continuous" }}
    >
      <Row align="center">{children}</Row>
    </PressableFeedback>
  );
};
