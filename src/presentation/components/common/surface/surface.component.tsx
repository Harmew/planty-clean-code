import { StyleSheet, View } from "react-native";

import { useTheme } from "@presentation/hooks/use-theme";

import { getThemeColors } from "@shared/utils/theme";
import { createStyles } from "./styles";
import type { SurfaceProps } from "./types";

export function Surface({ children, style, wrapperStyle, ...props }: Readonly<SurfaceProps>) {
  const { theme, dark } = useTheme();
  const styles = createStyles(theme);

  const { surface } = getThemeColors(dark);

  return (
    <View style={StyleSheet.compose(styles.wrapper, wrapperStyle)}>
      <View {...props} style={[styles.base, { backgroundColor: surface }, style]}>
        {children}
      </View>
    </View>
  );
}
