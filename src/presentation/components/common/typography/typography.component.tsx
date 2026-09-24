import { Text } from "react-native";

import { useTheme } from "@presentation/hooks/use-theme";

import { getTextColor, transformChildren } from "./functions";
import { createStyles } from "./styles";
import type { TypographyProps } from "./types";

export function Typography({
  size = 16,
  weight = 400,
  color = "text",
  align = "left",
  transform = "none",
  style,
  children,
  ...props
}: Readonly<TypographyProps>) {
  const { theme } = useTheme();

  const styles = createStyles(theme, size, weight, align);

  return (
    <Text {...props} style={[styles.text, { color: getTextColor(theme, color) }, style]}>
      {transformChildren(children, transform)}
    </Text>
  );
}
