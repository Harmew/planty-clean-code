import { View, ViewStyle } from "react-native";

import { useTheme } from "@presentation/hooks/use-theme";

import type { RowProps } from "./types";

export function Row({
  flex = 0,
  gap = 12,
  align = "center",
  justify = "flex-start",
  children,
  style,
  ...props
}: Readonly<RowProps>) {
  const { theme } = useTheme();

  const rowStyle: ViewStyle = {
    flex,
    flexDirection: "row",
    alignItems: align,
    justifyContent: justify,
    gap: theme.spacings[gap],
  };

  return (
    <View {...props} style={[rowStyle, style]}>
      {children}
    </View>
  );
}
