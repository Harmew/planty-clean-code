import { Text } from "react-native";

import { useTheme } from "@presentation/hooks/use-theme";
import { getThemeColors } from "@shared/utils/theme";

import { transformChildren } from "./functions";
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
  const { theme, dark } = useTheme();

  const styles = createStyles(theme, size, weight, align);
  const { text } = getThemeColors(dark);

  const textColor = color === "text" ? text : theme.colors[color];

  return (
    <Text {...props} style={[styles.text, { color: textColor }, style]}>
      {transformChildren(children, transform)}
    </Text>
  );
}
